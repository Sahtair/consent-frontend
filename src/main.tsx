import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";
import { Navigate } from "react-router";
import { Layout } from "./components/Layout.tsx";
import { ConsentList } from "./views/Consents.view.tsx";
import { CreateConsent } from "./views/CreateConsent.view.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Navigate to="/consents" replace />,
			},
			{
				path: "/consents",
				Component: ConsentList,
			},
			{
				path: "/give-consent",
				Component: CreateConsent,
			},
		],
	},
]);

if (import.meta.env.DEV) {
	const { setupWorker } = await import("msw/browser");

	const { handlers } = await import("./api");
	const worker = setupWorker(...handlers);

	await worker.start();
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
