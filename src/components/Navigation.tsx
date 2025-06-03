import styled from "@emotion/styled";
import { InputLabel } from "@mui/material";
import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

export function Navigation({ children }: PropsWithChildren) {
	return (
		<ViewContainer>
			<NavigationContainer>
				<NavLink to="/give-consent">
					<InputLabel>Give consent</InputLabel>
				</NavLink>
				<NavLink to="/consents">
					<InputLabel>Collected consents</InputLabel>
				</NavLink>
			</NavigationContainer>
			<MainContainer>{children}</MainContainer>
		</ViewContainer>
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

const NavigationContainer = styled.nav`
	padding-top: 3rem;
 display: flex;
 flex-direction: column;
 gap: 1rem;
 width: 15%;
 height: 100vh;
	box-sizing: border-box;
 background-color: lightgray;
	border-right: 1px solid gray;

	& a {
		padding: 1rem;
		border-top: 1px solid black;
		border-bottom: 1px solid black;
		text-decoration: none;
		color: black;
	}

	& a.active {
		background-color: lightblue;
		font-weight: 700;
	}
`;
