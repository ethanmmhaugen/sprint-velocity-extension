import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { TrendingUp, BarChart2, Clock } from "lucide-react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
	ChartOptions,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useDataContext } from "@/app/context/DataContext";

// Register ChartJS components
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function DashboardCharts() {
	const { entries } = useDataContext();

	// Transform entries data for charts
	const gamePointsData = entries
		.reduce((acc, entry) => {
			const sprintName = entry.sprint.toString();
			const existingSprint = acc.find((item) => item.name === sprintName);

			if (existingSprint) {
				existingSprint.gamePoints += entry.gamePoints;
			} else {
				acc.push({
					name: sprintName,
					gamePoints: entry.gamePoints,
				});
			}
			return acc;
		}, [] as { name: string; gamePoints: number }[])
		.sort((a, b) => a.name.localeCompare(b.name));

	const sprintBreakdownData = entries
		.reduce(
			(acc, entry) => {
				const sprintName = entry.sprint.toString();
				const existingSprint = acc.find((item) => item.name === sprintName);

				if (existingSprint) {
					existingSprint.storyPoints += entry.storyPoints;
					existingSprint.prComments += entry.prComments;
					existingSprint.qaBugs += entry.qaBugs;
					existingSprint.designErrors += entry.designErrors;
				} else {
					acc.push({
						name: sprintName,
						storyPoints: entry.storyPoints,
						prComments: entry.prComments,
						qaBugs: entry.qaBugs,
						designErrors: entry.designErrors,
					});
				}
				return acc;
			},
			[] as {
				name: string;
				storyPoints: number;
				prComments: number;
				qaBugs: number;
				designErrors: number;
			}[]
		)
		.sort((a, b) => a.name.localeCompare(b.name));

	const sprintEfficiencyData = entries
		.reduce((acc, entry) => {
			const sprintName = entry.sprint.toString();
			const existingSprint = acc.find((item) => item.name === sprintName);

			if (existingSprint) {
				existingSprint.storyPoints += entry.storyPoints;
				existingSprint.pointsPerHour +=
					entry.storyPoints / (entry.devHours || 1);
			} else {
				acc.push({
					name: sprintName,
					storyPoints: entry.storyPoints,
					pointsPerHour: entry.storyPoints / (entry.devHours || 1),
				});
			}
			return acc;
		}, [] as { name: string; storyPoints: number; pointsPerHour: number }[])
		.sort((a, b) => a.name.localeCompare(b.name));

	// Chart data and options
	const gamePointsChartData: ChartData<"line"> = {
		labels: gamePointsData.map((d) => d.name),
		datasets: [
			{
				label: "Game Points",
				data: gamePointsData.map((d) => d.gamePoints),
				borderColor: "hsl(var(--chart-1))",
				backgroundColor: "hsl(var(--chart-1))",
				tension: 0.4,
			},
		],
	};

	const sprintBreakdownChartData: ChartData<"bar"> = {
		labels: sprintBreakdownData.map((d) => d.name),
		datasets: [
			{
				label: "Story Points",
				data: sprintBreakdownData.map((d) => d.storyPoints),
				backgroundColor: "hsl(var(--chart-1))",
			},
			{
				label: "PR Comments",
				data: sprintBreakdownData.map((d) => d.prComments),
				backgroundColor: "hsl(var(--chart-2))",
			},
			{
				label: "QA Bugs",
				data: sprintBreakdownData.map((d) => d.qaBugs),
				backgroundColor: "hsl(var(--chart-3))",
			},
			{
				label: "Design Errors",
				data: sprintBreakdownData.map((d) => d.designErrors),
				backgroundColor: "hsl(var(--chart-4))",
			},
		],
	};

	const sprintEfficiencyChartData: ChartData<"line"> = {
		labels: sprintEfficiencyData.map((d) => d.name),
		datasets: [
			{
				label: "Story Points",
				data: sprintEfficiencyData.map((d) => d.storyPoints),
				borderColor: "hsl(var(--chart-1))",
				backgroundColor: "hsl(var(--chart-1))",
				tension: 0.4,
			},
			{
				label: "Points Per Hour",
				data: sprintEfficiencyData.map((d) => d.pointsPerHour),
				borderColor: "hsl(var(--chart-5))",
				backgroundColor: "hsl(var(--chart-5))",
				tension: 0.4,
			},
		],
	};

	const chartOptions: ChartOptions<"line" | "bar"> = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

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
					<Line data={gamePointsChartData} options={chartOptions} />
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
					<Bar data={sprintBreakdownChartData} options={chartOptions} />
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
					<Line data={sprintEfficiencyChartData} options={chartOptions} />
				</CardContent>
			</Card>
		</div>
	);
}
