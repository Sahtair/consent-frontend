import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
} from "@mui/material";
import type { Consents } from "../api";
import { Navigation } from "../components/Navigation";
import { useConsentData } from "../contexts/ConsentDataContext";
import styled from "@emotion/styled";

function createConsentText(
	consents: Pick<Consents, "newsletter" | "statistics" | "targetedAds">,
) {
	const consentString = [];

	if (consents.newsletter) {
		consentString.push("Recieve newsletter");
	}
	if (consents.targetedAds) {
		consentString.push("Be shown targeted ads");
	}
	if (consents.statistics) {
		consentString.push("Statistics");
	}

	return consentString.join(", ");
}

export function ConsentList() {
	const { data, isLoading, pagination, setPagination } = useConsentData();

	return (
		<Navigation>
			<Container>
				{isLoading && <span>Loading...</span>}
				{!data && <span>No data</span>}
				{!isLoading && data && (
					<TableContainer component={Paper}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Consent given for</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data.map(({ id, name, email, ...consents }) => {
									return (
										<TableRow key={id}>
											<TableCell>{name}</TableCell>
											<TableCell>{email}</TableCell>
											<TableCell>{createConsentText(consents)}</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										colSpan={3}
										count={-1}
										rowsPerPageOptions={[2, 5, 10]}
										rowsPerPage={pagination.offset}
										page={pagination.page}
										onPageChange={(_event, page) => {
											setPagination((prevPagination) => ({
												...prevPagination,
												page,
											}));
										}}
										onRowsPerPageChange={(event) => {
											setPagination((prevPagination) => ({
												...prevPagination,
												offset: Number(event.target.value),
											}));
										}}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				)}
			</Container>
		</Navigation>
	);
}

const Container = styled.div`
	align-content: center;
	width: 80%;
	min-width: 650px;
`;
