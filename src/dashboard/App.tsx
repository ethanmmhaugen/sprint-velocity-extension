import React, { useState } from "react";
import { Graph } from "../components/Graph";
import { Table } from "../components/Table";
import "./App.css";
import { Rules } from "../components/Rules";

export const App: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"chart" | "list" | "rules">(
		"rules"
	);

	return (
		<div className="container">
			<h2 className="header">My Sprint Game Dashboard</h2>
			<a
				className="rules"
				onClick={() => {
					setActiveTab("rules");
				}}>
				Rules
			</a>
			{activeTab === "rules" && <Rules />}
			<div className="tabs">
				<button
					className="tabButton"
					onClick={() => setActiveTab("list")}
					disabled={activeTab === "list"}>
					Conquered Stories
				</button>
				<button
					className="tabButton"
					onClick={() => setActiveTab("chart")}
					disabled={activeTab === "chart"}>
					Line Go Up and to the Right
				</button>
			</div>
			<div className="tab-container">
				{activeTab === "chart" && <Graph />}
				{activeTab === "list" && <Table />}
			</div>
		</div>
	);
};
