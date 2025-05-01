// index.tsx or dashboard.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DataProvider } from "../components/DataContext";

const root = document.getElementById("root");
if (root) {
	createRoot(root).render(
		<DataProvider>
			<App />
		</DataProvider>
	);
}
