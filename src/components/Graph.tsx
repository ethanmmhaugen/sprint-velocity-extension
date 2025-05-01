import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useDataContext } from "./DataContext";
import {
	Chart,
	LineElement,
	PointElement,
	BarElement,
	LineController,
	BarController,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	Title,
} from "chart.js";

Chart.register(
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	LineController,
	LineElement,
	PointElement,
	BarController,
	BarElement
);

export const Graph: React.FC = () => {
	const { entries } = useDataContext();

	const sprintMap = new Map<string, number>();
	const devHourMap = new Map<string, number>();
	for (const entry of entries) {
		const sprint = String(entry.sprint);
		if (sprint) {
			sprintMap.set(sprint, (sprintMap.get(sprint) || 0) + entry.gamePoints);
			devHourMap.set(
				sprint,
				(devHourMap.get(sprint) || 0) + (entry.devHours || 0)
			);
		}
	}

	const sortedSprints = Array.from(sprintMap.keys()).sort();
	const labels = sortedSprints.map((s) => `Sprint ${s}`);
	const dataPoints = sortedSprints.map((s) => sprintMap.get(s) || 0);

	const lineData = {
		labels,
		datasets: [
			{
				label: "Game Points",
				data: dataPoints,
				fill: false,
				tension: 0.1,
				borderColor: "#4bc0c0",
				backgroundColor: "rgba(75, 192, 192, 0.4)",
				pointBackgroundColor: "#4bc0c0",
			},
		],
	};

	const lineOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
				labels: { color: "#333" },
			},
			title: {
				display: true,
				text: "Game Points by Sprint",
				color: "#111",
			},
		},
		scales: {
			y: { beginAtZero: true, ticks: { color: "#333" } },
			x: { ticks: { color: "#333" } },
		},
	};

	const sprintStats = new Map<
		string,
		{
			storyPoints: number;
			prComments: number;
			qaBugs: number;
			designErrors: number;
			devHours: number;
			gamePoints: number;
		}
	>();
	for (const entry of entries) {
		const sprint = String(entry.sprint);
		if (!sprint) continue;
		const stat = sprintStats.get(sprint) || {
			storyPoints: 0,
			prComments: 0,
			qaBugs: 0,
			designErrors: 0,
			devHours: 0,
			gamePoints: 0,
		};
		stat.storyPoints += entry.storyPoints;
		stat.prComments += entry.prComments;
		stat.qaBugs += entry.qaBugs;
		stat.designErrors += entry.designErrors;
		stat.devHours += entry.devHours || 0;
		stat.gamePoints += entry.gamePoints;
		sprintStats.set(sprint, stat);
	}

	const sprintLabels = Array.from(sprintStats.keys()).sort();
	const pointsData = sprintLabels.map(
		(s) => sprintStats.get(s)?.storyPoints ?? 0
	);
	const prData = sprintLabels.map((s) => sprintStats.get(s)?.prComments ?? 0);
	const bugsData = sprintLabels.map((s) => sprintStats.get(s)?.qaBugs ?? 0);
	const designData = sprintLabels.map(
		(s) => sprintStats.get(s)?.designErrors ?? 0
	);
	const devEfficiency = sprintLabels.map((s) => {
		const stat = sprintStats.get(s);
		return stat && stat.devHours > 0
			? Number((stat.gamePoints / stat.devHours).toFixed(2))
			: 0;
	});

	const barData = {
		labels: sprintLabels.map((s) => `Sprint ${s}`),
		datasets: [
			{ label: "Story Points", data: pointsData, backgroundColor: "#4bc0c0" },
			{ label: "PR Comments", data: prData, backgroundColor: "#9966ff" },
			{ label: "QA Bugs", data: bugsData, backgroundColor: "#ff6384" },
			{ label: "Design Errors", data: designData, backgroundColor: "#ff9f40" },
		],
	};

	const barOptions = {
		responsive: true,
		plugins: {
			legend: { position: "top" as const },
			title: { display: true, text: "Sprint Breakdown by Category" },
		},
		scales: {
			y: { beginAtZero: true },
		},
	};

	const efficiencyData = {
		labels: sprintLabels.map((s) => `Sprint ${s}`),
		datasets: [
			{
				label: "Story Points",
				data: pointsData,
				borderColor: "#4bc0c0",
				backgroundColor: "#4bc0c0",
				fill: false,
				tension: 0.2,
			},
			{
				label: "Game Points per Dev Hour",
				data: devEfficiency,
				borderColor: "#ffa726",
				backgroundColor: "#ffe0b2",
				fill: false,
				tension: 0.2,
			},
		],
	};

	const efficiencyOptions = {
		responsive: true,
		plugins: {
			legend: { position: "top" as const },
			title: { display: true, text: "Sprint Efficiency" },
		},
		scales: {
			y: { beginAtZero: true },
		},
	};

	return (
		<div style={{ marginBottom: 20 }}>
			<Line options={lineOptions} data={lineData} />
			<div style={{ marginTop: 40 }}>
				<Bar options={barOptions} data={barData} />
			</div>
			<div style={{ marginTop: 40 }}>
				<Line options={efficiencyOptions} data={efficiencyData} />
			</div>
		</div>
	);
};
