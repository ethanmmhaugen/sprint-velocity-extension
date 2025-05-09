import React from "react";
import { Button } from "@components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import {
	Trophy,
	CheckCircle,
	Bug,
	MessageSquare,
	Paintbrush,
} from "lucide-react";

export default function RulesView() {
	return (
		<Card>
			<CardHeader className="text-center">
				<div className="mx-auto mb-2">
					<Trophy className="h-12 w-12 text-amber-500" />
				</div>
				<CardTitle className="text-2xl">Sprint Scoring Rules</CardTitle>
				<CardDescription>
					Welcome to the Sprint Velocity Game! Here's how you score points and
					rise to the top 🚀 💪
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid gap-6 md:grid-cols-2">
					<Card className="border-emerald-100 dark:border-emerald-900">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg flex items-center">
								<CheckCircle className="h-5 w-5 mr-2 text-emerald-500" />
								+100 points
							</CardTitle>
							<CardDescription>
								for every Story Point completed.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-red-100 dark:border-red-900">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg flex items-center">
								<Bug className="h-5 w-5 mr-2 text-red-500" />
								-100 points
							</CardTitle>
							<CardDescription>
								for each story that comes back from QA with a bug.
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-violet-100 dark:border-violet-900">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg flex items-center">
								<MessageSquare className="h-5 w-5 mr-2 text-violet-500" />
								-25 points
							</CardTitle>
							<CardDescription>
								for each PR comment received. Keep it clean!
							</CardDescription>
						</CardHeader>
					</Card>

					<Card className="border-amber-100 dark:border-amber-900">
						<CardHeader className="pb-2">
							<CardTitle className="text-lg flex items-center">
								<Paintbrush className="h-5 w-5 mr-2 text-amber-500" />
								-50 points
							</CardTitle>
							<CardDescription>
								for every Design Error. Pixel perfect matters!
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
}
