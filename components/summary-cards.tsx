import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { useDataContext } from "@/app/context/DataContext";

export default function SummaryCards() {
	const { entries } = useDataContext();
	debugger;
	// Get the last two sprints' data
	const sprintData = entries
		.reduce(
			(acc, entry) => {
				const sprintName = entry.sprint.toString();
				const existingSprint = acc.find((item) => item.name === sprintName);

				if (existingSprint) {
					existingSprint.gamePoints += entry.gamePoints;
					existingSprint.storyPoints += entry.storyPoints;
					existingSprint.issuesCompleted += 1;
					existingSprint.totalDevHours += entry.devHours || 0;
				} else {
					acc.push({
						name: sprintName,
						gamePoints: entry.gamePoints,
						storyPoints: entry.storyPoints,
						issuesCompleted: 1,
						totalDevHours: entry.devHours || 0,
					});
				}
				return acc;
			},
			[] as {
				name: string;
				gamePoints: number;
				storyPoints: number;
				issuesCompleted: number;
				totalDevHours: number;
			}[]
		)
		.sort((a, b) => a.name.localeCompare(b.name));

	// Get the last two sprints
	const lastTwoSprints = sprintData.slice(-2);
	const currentSprint = lastTwoSprints[1] || lastTwoSprints[0];
	const previousSprint = lastTwoSprints[0];

	// Calculate metrics
	const totalGamePoints = currentSprint?.gamePoints || 0;
	const totalStoryPoints = currentSprint?.storyPoints || 0;
	const issuesCompleted = currentSprint?.issuesCompleted || 0;
	const efficiency = currentSprint?.totalDevHours
		? (currentSprint.gamePoints / currentSprint.totalDevHours).toFixed(1)
		: "0.0";

	// Calculate changes from previous sprint
	const gamePointsChange = previousSprint
		? ((totalGamePoints - previousSprint.gamePoints) /
				previousSprint.gamePoints) *
		  100
		: 0;
	const storyPointsChange = previousSprint
		? ((totalStoryPoints - previousSprint.storyPoints) /
				previousSprint.storyPoints) *
		  100
		: 0;
	const efficiencyChange = previousSprint
		? ((Number(efficiency) -
				previousSprint.gamePoints / (previousSprint.totalDevHours || 1)) /
				(previousSprint.gamePoints / (previousSprint.totalDevHours || 1))) *
		  100
		: 0;
	const issuesChange = previousSprint
		? issuesCompleted - previousSprint.issuesCompleted
		: 0;

	// Format change text
	const formatChange = (change: number, isCount = false) => {
		if (change === 0) return "No change";
		if (isCount) {
			return `${change > 0 ? "+" : ""}${change} from last sprint`;
		}
		return `${change > 0 ? "+" : ""}${change.toFixed(0)}% from last sprint`;
	};

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">
						Total Game Points
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalGamePoints}</div>
					<p className="text-xs text-muted-foreground">
						{formatChange(gamePointsChange)}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">Story Points</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalStoryPoints}</div>
					<p className="text-xs text-muted-foreground">
						{formatChange(storyPointsChange)}
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-sm font-medium">Efficiency</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{efficiency} pts/hr</div>
					<p className="text-xs text-muted-foreground">
						{formatChange(efficiencyChange)}
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
					<div className="text-2xl font-bold">{issuesCompleted}</div>
					<p className="text-xs text-muted-foreground">
						{formatChange(issuesChange, true)}
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
