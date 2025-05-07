import React from "react";
import { Button } from "@components/ui/button";

export default function Header() {
	return (
		<header className="sticky top-0 z-10 border-b bg-white dark:bg-slate-900 px-4 py-3 sm:px-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-slate-900 dark:text-white">
					Sprint Game Dashboard
				</h1>
				<div className="flex items-center space-x-2">
					<Button>Login / Sign Up</Button>
				</div>
			</div>
		</header>
	);
}
