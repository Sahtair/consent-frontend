import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import { ConsentDataContextProvider } from "./contexts/ConsentDataContext.tsx";
import { ConsentList } from "./views/Consents.view.tsx";
import { CreateConsent } from "./views/CreateConsent.view.tsx";

export const router = createBrowserRouter([
	{
		path: "/",
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
]);
console.log(import.meta.env)
if (import.meta.env.DEV) {
	const { setupWorker } = await import('msw/browser')
	
	const { handlers } = await import("./api");
	const worker = setupWorker(...handlers);

	await worker.start();
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ConsentDataContextProvider>
			<RouterProvider router={router} />
		</ConsentDataContextProvider>
	</StrictMode>,
);
