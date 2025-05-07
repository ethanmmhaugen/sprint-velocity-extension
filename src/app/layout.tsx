import React from "react";
import "@/app/globals.css";

export const metadata = {
	title: "Sprint Game Dashboard",
	description:
		"A modern dashboard for tracking sprint performance and game points",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>{children}</body>
		</html>
	);
}
