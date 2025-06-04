import styled from "@emotion/styled";
import { Outlet } from "react-router";
import { ConsentDataContextProvider } from "../contexts/ConsentDataContext";
import { Navigation } from "./Navigation";

export function Layout() {
	return (
		<ConsentDataContextProvider>
			<ViewContainer>
				<Navigation />
				<MainContainer>
					<Outlet />
				</MainContainer>
			</ViewContainer>
		</ConsentDataContextProvider>
	);
}

const ViewContainer = styled.div`
 display: flex;
`;

const MainContainer = styled.div`
	width: 100%;
	padding: 1rem;
	display: flex;
	justify-content: center;
`;
