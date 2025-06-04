import styled from "@emotion/styled";
import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	TextField,
} from "@mui/material";
import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Navigation } from "../components/Navigation";

export function CreateConsent() {
	const navigate = useNavigate();
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		newsletter: false,
		targetedAds: false,
		statistics: false,
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const response = await fetch("/consents", {
			method: "POST",
			body: JSON.stringify(formState),
		});

		if (response.ok) {
			navigate("/consents");
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value =
			event.target.type === "text" ? event.target.value : event.target.checked;
		setFormState({
			...formState,
			[event.target.name]: value,
		});
	};

	const { name, email, newsletter, targetedAds, statistics } = formState;
	const consentError = ![newsletter, targetedAds, statistics].some(Boolean);
	const invalidForm = !name || !email || !email.includes("@") || consentError;

	return (
		<Navigation>
			<Form onSubmit={handleSubmit}>
				<TextField
					id="name"
					name="name"
					label="Name"
					variant="outlined"
					required
					onChange={handleChange}
				/>
				<TextField
					id="email"
					name="email"
					label="Email"
					variant="outlined"
					required
					onChange={handleChange}
				/>
				<FormGroup style={{ border: "1px solid lightgray", padding: "1rem" }}>
					<FormLabel>I agree to:</FormLabel>
					{consentError && <FormHelperText>Select at least one</FormHelperText>}
					<FormControlLabel
						control={
							<Checkbox
								id="newsletter"
								name="newsletter"
								onChange={handleChange}
							/>
						}
						label={"Recieve newsletter"}
					/>
					<FormControlLabel
						control={
							<Checkbox
								id="targetedAds"
								name="targetedAds"
								onChange={handleChange}
							/>
						}
						label={"Be shown targeted ads"}
					/>
					<FormControlLabel
						control={
							<Checkbox
								id="statistics"
								name="statistics"
								onChange={handleChange}
							/>
						}
						label={"Contribute to anonymous visit statistics"}
					/>
				</FormGroup>
				<Button
					disabled={invalidForm}
					type="submit"
					variant="contained"
				>
					Give consent
				</Button>
			</Form>
		</Navigation>
	);
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
		min-width: 400px;
		width: 50%;
		justify-content: center;
`;
