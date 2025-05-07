import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";

export default function SummaryCards() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">
						Total Game Points
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">800</div>
					<p className="text-xs text-muted-foreground">
						+100% from last sprint
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">Story Points</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">16</div>
					<p className="text-xs text-muted-foreground">
						+100% from last sprint
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">Efficiency</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">10 pts/hr</div>
					<p className="text-xs text-muted-foreground">
						+100% from last sprint
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">
						Issues Completed
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">7</div>
					<p className="text-xs text-muted-foreground">+1 from last sprint</p>
				</CardContent>
			</Card>
		</div>
	);
}
