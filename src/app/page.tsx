import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { BarChart2, Table, Trophy } from "lucide-react";
import Header from "@components/header";
import SummaryCards from "@components/summary-cards";
import DashboardCharts from "@components/dashboard-charts";
import DataTableView from "@components/data-table-view";
import RulesView from "@components/rules-view";
import React from "react";

export default function SprintDashboard() {
	return (
		<div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
			<Header />

			<main className="flex-1 p-4 sm:p-6">
				<div className="grid gap-6">
					{/* Summary Cards */}
					<SummaryCards />

					{/* Tabs for different views */}
					<Tabs defaultValue="dashboard" className="space-y-4">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="dashboard">
								<BarChart2 className="h-4 w-4 mr-2" />
								Dashboard
							</TabsTrigger>
							<TabsTrigger value="data">
								<Table className="h-4 w-4 mr-2" />
								Data Table
							</TabsTrigger>
							<TabsTrigger value="rules">
								<Trophy className="h-4 w-4 mr-2" />
								Rules
							</TabsTrigger>
						</TabsList>

						{/* Dashboard Tab */}
						<TabsContent value="dashboard" className="space-y-4">
							<DashboardCharts />
						</TabsContent>

						{/* Data Table Tab */}
						<TabsContent value="data" className="space-y-4">
							<DataTableView />
						</TabsContent>

						{/* Rules Tab */}
						<TabsContent value="rules">
							<RulesView />
						</TabsContent>
					</Tabs>
				</div>
			</main>
		</div>
	);
}
