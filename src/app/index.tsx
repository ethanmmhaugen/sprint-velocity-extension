import React from "react";
import { createRoot } from "react-dom/client";
import RootLayout from "./layout";
import SprintDashboard from "./page";
import { DataProvider } from "./context/DataContext";
import "./globals.css";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container);
root.render(
	<React.StrictMode>
		<RootLayout>
			<DataProvider>
				<SprintDashboard />
			</DataProvider>
		</RootLayout>
	</React.StrictMode>
);
