import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@components/ui/chart";
import { TrendingUp, BarChart2, Clock } from "lucide-react";
import {
	BarChart,
	LineChart,
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

// Chart data
const gamePointsData = [
	{ name: "TITANS 25-05", gamePoints: 400 },
	{ name: "TITANS 25-06", gamePoints: 400 },
	{ name: "TITANS 25-07", gamePoints: 800 },
];

const sprintBreakdownData = [
	{
		name: "TITANS 25-05",
		storyPoints: 4,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
	},
	{
		name: "TITANS 25-06",
		storyPoints: 4,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
	},
	{
		name: "TITANS 25-07",
		storyPoints: 8,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
	},
];

const sprintEfficiencyData = [
	{ name: "TITANS 25-05", storyPoints: 4, pointsPerHour: 5 },
	{ name: "TITANS 25-06", storyPoints: 4, pointsPerHour: 5 },
	{ name: "TITANS 25-07", storyPoints: 8, pointsPerHour: 10 },
];

export default function DashboardCharts() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
			{/* Game Points Chart */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<TrendingUp className="h-5 w-5 mr-2 text-emerald-500" />
						Game Points by Sprint
					</CardTitle>
					<CardDescription>Track your progress over time</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ChartContainer
						config={{
							gamePoints: {
								label: "Game Points",
								color: "hsl(var(--chart-1))",
							},
						}}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={gamePointsData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip content={<ChartTooltipContent />} />
								<Legend />
								<Line
									type="monotone"
									dataKey="gamePoints"
									stroke="hsl(var(--chart-1))"
									strokeWidth={2}
									dot={{ r: 4 }}
									activeDot={{ r: 6 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Sprint Breakdown Chart */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<BarChart2 className="h-5 w-5 mr-2 text-violet-500" />
						Sprint Breakdown by Category
					</CardTitle>
					<CardDescription>Story points and issues by sprint</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ChartContainer
						config={{
							storyPoints: {
								label: "Story Points",
								color: "hsl(var(--chart-1))",
							},
							prComments: {
								label: "PR Comments",
								color: "hsl(var(--chart-2))",
							},
							qaBugs: {
								label: "QA Bugs",
								color: "hsl(var(--chart-3))",
							},
							designErrors: {
								label: "Design Errors",
								color: "hsl(var(--chart-4))",
							},
						}}>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={sprintBreakdownData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip content={<ChartTooltipContent />} />
								<Legend />
								<Bar dataKey="storyPoints" fill="hsl(var(--chart-1))" />
								<Bar dataKey="prComments" fill="hsl(var(--chart-2))" />
								<Bar dataKey="qaBugs" fill="hsl(var(--chart-3))" />
								<Bar dataKey="designErrors" fill="hsl(var(--chart-4))" />
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Sprint Efficiency Chart */}
			<Card className="md:col-span-2">
				<CardHeader>
					<CardTitle className="flex items-center">
						<Clock className="h-5 w-5 mr-2 text-amber-500" />
						Sprint Efficiency
					</CardTitle>
					<CardDescription>
						Story points and points per dev hour
					</CardDescription>
				</CardHeader>
				<CardContent className="h-80">
					<ChartContainer
						config={{
							storyPoints: {
								label: "Story Points",
								color: "hsl(var(--chart-1))",
							},
							pointsPerHour: {
								label: "Points Per Hour",
								color: "hsl(var(--chart-5))",
							},
						}}>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={sprintEfficiencyData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip content={<ChartTooltipContent />} />
								<Legend />
								<Line
									type="monotone"
									dataKey="storyPoints"
									stroke="hsl(var(--chart-1))"
									strokeWidth={2}
									dot={{ r: 4 }}
								/>
								<Line
									type="monotone"
									dataKey="pointsPerHour"
									stroke="hsl(var(--chart-5))"
									strokeWidth={2}
									dot={{ r: 4 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
