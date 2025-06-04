import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { CreateConsent } from "./CreateConsent.view";

function RenderWrapper({ children }: PropsWithChildren) {
	return <MemoryRouter>{children}</MemoryRouter>;
}

describe("Create consent", () => {
	it("should render form and fill it out and submit", async () => {
		const user = userEvent.setup();

		render(<CreateConsent />, { wrapper: RenderWrapper });

		const submitButton = await screen.findByRole("button", {
			name: /give consent/i,
		});
		expect(submitButton).toBeDisabled();

		await user.type(
			await screen.findByRole("textbox", { name: /name/i }),
			"Jure",
		);
		await user.type(
			await screen.findByRole("textbox", { name: /email/i }),
			"thisIsNotAValidEmail",
		);

		await user.click(
			await screen.findByRole("checkbox", { name: /newsletter/i }),
		);
		expect(submitButton).toBeDisabled();

		await user.clear(await screen.findByRole("textbox", { name: /email/i }));
		await user.type(
			await screen.findByRole("textbox", { name: /email/i }),
			"thisIsAValid@email.com",
		);

		expect(submitButton).not.toBeDisabled();
		await user.click(
			await screen.findByRole("checkbox", { name: /targeted/i }),
		);
		expect(submitButton).not.toBeDisabled();

		await user.click(
			await screen.findByRole("checkbox", { name: /targeted/i }),
		);
		await user.click(
			await screen.findByRole("checkbox", { name: /newsletter/i }),
		);

		expect(submitButton).toBeDisabled();

		await user.click(
			await screen.findByRole("checkbox", { name: /statistics/i }),
		);

		await user.click(submitButton);
	});
});
