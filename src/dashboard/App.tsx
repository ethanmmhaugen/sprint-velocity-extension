import React, { useEffect, useState } from "react";
import { Storage } from "../shared/storage";
import { StoryEntry } from "../shared/models";

import {
	Chart,
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Title,
	Tooltip,
	Legend,
	Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
	LineController,
	LineElement,
	PointElement,
	LinearScale,
	CategoryScale,
	Title,
	Tooltip,
	Legend
);

export const App: React.FC = () => {
	const [entries, setEntries] = useState<StoryEntry[]>([]);
	const [activeTab, setActiveTab] = useState<"chart" | "list">("chart");
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	useEffect(() => {
		Storage.getAll().then(setEntries);
	}, []);

	const sprintMap = new Map<number, number>();
	for (const entry of entries) {
		const sprint = Number(entry.sprint);
		if (!isNaN(sprint)) {
			sprintMap.set(sprint, (sprintMap.get(sprint) || 0) + entry.gamePoints);
		}
	}

	// Sort sprint numbers
	const sortedSprints = Array.from(sprintMap.keys()).sort((a, b) => a - b);
	const labels = sortedSprints.map((s) => `Sprint ${s}`);
	const dataPoints = sortedSprints.map((s) => sprintMap.get(s) || 0);

	// Chart.js data object
	const data = {
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

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					color: "#333",
				},
			},
			title: {
				display: true,
				text: "Game Points by Sprint",
				color: "#111",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					color: "#333",
				},
			},
			x: {
				ticks: {
					color: "#333",
				},
			},
		},
	};

	const toggleSelection = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const handleDeleteSelected = async () => {
		const updated = entries.filter((e) => !selectedIds.has(e.id));
		await Storage.setAll(updated);
		setEntries(updated);
		setSelectedIds(new Set());
	};

	return (
		<div style={{ padding: 10, width: 800 }}>
			<h2>Your Sprint Dashboard</h2>

			<div style={{ marginBottom: 16 }}>
				<button
					onClick={() => setActiveTab("chart")}
					disabled={activeTab === "chart"}>
					Chart
				</button>
				<button
					onClick={() => setActiveTab("list")}
					disabled={activeTab === "list"}
					style={{ marginLeft: 8 }}>
					Entry List
				</button>
			</div>

			{activeTab === "chart" && entries.length > 0 && (
				<div style={{ marginBottom: 20 }}>
					<Line options={options} data={data} />
				</div>
			)}

			{activeTab === "list" && (
				<div>
					{entries.length === 0 ? (
						<p>No entries yet—use the popup to add one!</p>
					) : (
						<>
							<button
								onClick={handleDeleteSelected}
								disabled={selectedIds.size === 0}
								style={{ marginBottom: 10 }}>
								Delete Selected
							</button>
							<table
								border={1}
								cellPadding={6}
								style={{ borderCollapse: "collapse", width: "100%" }}>
								<thead>
									<tr>
										<th>Select</th>
										<th>Sprint</th>
										<th>Date</th>
										<th>Points</th>
										<th>QA Bugs</th>
										<th>Design Errors</th>
										<th>PR Comments</th>
										<th>Game Points</th>
										<th>Jira Link</th>
									</tr>
								</thead>
								<tbody>
									{entries.map((e) => (
										<tr key={e.id}>
											<td>
												<input
													type="checkbox"
													checked={selectedIds.has(e.id)}
													onChange={() => toggleSelection(e.id)}
												/>
											</td>
											<td>{e.sprint ?? "—"}</td>
											<td>{new Date(e.date).toLocaleDateString()}</td>
											<td>{e.points}</td>
											<td>{e.qaBugs}</td>
											<td>{e.designErrors}</td>
											<td>{e.prComments}</td>
											<td>{e.gamePoints}</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					)}
				</div>
			)}
		</div>
	);
};
