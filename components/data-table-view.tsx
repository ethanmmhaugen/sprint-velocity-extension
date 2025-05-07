"use client";

import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Checkbox } from "@components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@components/ui/table";
import { ScrollArea } from "@components/ui/scroll-area";
import { Trash2, Upload, Plus } from "lucide-react";

// Sample data
const sprintData = [
	{
		id: 1,
		issueKey: "TITANS-1843",
		issueId: "80901",
		summary: "HR Web routing rules",
		sprint: "TITANS 25-05",
		storyPoints: 2,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
		devHours: 4,
	},
	{
		id: 2,
		issueKey: "TITANS-1747",
		issueId: "79921",
		summary: "Top Nav | Manage Role",
		sprint: "TITANS 25-05",
		storyPoints: 3,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
		devHours: 6,
	},
	{
		id: 3,
		issueKey: "TITANS-1743",
		issueId: "79917",
		summary: "Top Nav | Open Secure Menu",
		sprint: "TITANS 25-05",
		storyPoints: 1,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
		devHours: 2,
	},
	{
		id: 4,
		issueKey: "TITANS-1737",
		issueId: "79911",
		summary: "Immigration Status | US Info",
		sprint: "TITANS 25-06",
		storyPoints: 2,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
		devHours: 4,
	},
	{
		id: 5,
		issueKey: "TITANS-1735",
		issueId: "79909",
		summary: "Case Info | Questionnaires",
		sprint: "TITANS 25-06",
		storyPoints: 3,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
		devHours: 5,
	},
	{
		id: 6,
		issueKey: "TITANS-1734",
		issueId: "79908",
		summary: "Case Information Page",
		sprint: "TITANS 25-06",
		storyPoints: 3,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
		devHours: 6,
	},
	{
		id: 7,
		issueKey: "TITANS-1845",
		issueId: "80903",
		summary: "FN Web routing rules",
		sprint: "TITANS 25-07",
		storyPoints: 2,
		prComments: 0,
		qaBugs: 0,
		designErrors: 0,
		devHours: 3,
	},
];

export default function DataTableView() {
	const [selectedRows, setSelectedRows] = useState<number[]>([]);

	const toggleRowSelection = (id: number) => {
		if (selectedRows.includes(id)) {
			setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
		} else {
			setSelectedRows([...selectedRows, id]);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sprint Data</CardTitle>
				<CardDescription>Manage your sprint issues and metrics</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center space-x-2">
						<Button
							variant="destructive"
							size="sm"
							disabled={selectedRows.length === 0}>
							<Trash2 className="h-4 w-4 mr-2" />
							Delete Selected
						</Button>
						<Button variant="outline" size="sm">
							<Upload className="h-4 w-4 mr-2" />
							Import from CSV
						</Button>
					</div>
					<Button size="sm">
						<Plus className="h-4 w-4 mr-2" />
						Add Entry
					</Button>
				</div>
				<ScrollArea className="h-[500px]">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[50px]"></TableHead>
								<TableHead>Issue Key</TableHead>
								<TableHead>Issue ID</TableHead>
								<TableHead>Summary</TableHead>
								<TableHead>Sprint</TableHead>
								<TableHead>Story Points</TableHead>
								<TableHead>PR Comments</TableHead>
								<TableHead>QA Bugs</TableHead>
								<TableHead>Design Errors</TableHead>
								<TableHead>Dev Hours</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sprintData.map((row) => (
								<TableRow
									key={row.id}
									className={
										selectedRows.includes(row.id)
											? "bg-slate-100 dark:bg-slate-800"
											: ""
									}>
									<TableCell>
										<Checkbox
											checked={selectedRows.includes(row.id)}
											onCheckedChange={() => toggleRowSelection(row.id)}
										/>
									</TableCell>
									<TableCell className="font-medium">{row.issueKey}</TableCell>
									<TableCell>{row.issueId}</TableCell>
									<TableCell>{row.summary}</TableCell>
									<TableCell>
										<Badge variant="outline">{row.sprint}</Badge>
									</TableCell>
									<TableCell>{row.storyPoints}</TableCell>
									<TableCell>{row.prComments}</TableCell>
									<TableCell>{row.qaBugs}</TableCell>
									<TableCell>{row.designErrors}</TableCell>
									<TableCell>{row.devHours}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
