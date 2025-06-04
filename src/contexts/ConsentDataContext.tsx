import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useLocation, useNavigate } from "react-router";
import type { Consents } from "../api";

interface Pagination {
	page: number;
	offset: number;
}

interface ConsentDataContext {
	data: Consents[];
	isLoading: boolean;
	isError: boolean;
	pagination: Pagination;
	setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
}

const ConsentDataContext = createContext<ConsentDataContext>({
	data: [],
	isLoading: false,
	isError: false,
	pagination: {
		page: 0,
		offset: 2,
	},
	setPagination: () => {},
});

export const useConsentData = () => useContext(ConsentDataContext);

export function ConsentDataContextProvider({ children }: PropsWithChildren) {
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState<Consents[]>([]);
	const [pagination, setPagination] = useState<Pagination>({
		page: 0,
		offset: 2,
	});

	useEffect(() => {
		setIsLoading(true);
		async function fetchData() {
			const queryParams = new URLSearchParams();

			for (const [parameter, value] of Object.entries(pagination)) {
				queryParams.set(parameter, value.toString());
			}
			const response = await fetch(`/consents?${queryParams.toString()}`);
			if (!response.ok) {
				setIsError(true);
				setIsLoading(false);
				return;
			}

			const { data } = await response.json();
			setData(data);
			setIsLoading(false);
			if (location.state?.refetch) {
				navigate(location.pathname, { replace: true });
			}
		}

		fetchData();
	}, [pagination, location.state?.refetch, location.pathname, navigate]);

	return (
		<ConsentDataContext.Provider
			value={{ data, isLoading, isError, pagination, setPagination }}
		>
			{children}
		</ConsentDataContext.Provider>
	);
}
