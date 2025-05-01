import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDataContext } from "./DataContext";
import { StoryEntry } from "../shared/models";
import { calculateGamePoints } from "../shared/util";

export const Table: React.FC = () => {
	const {
		entries,
		selectedIds,
		toggleSelectionBulk,
		handleDeleteSelected,
		setEntries,
		sprintDevHours,
		setSprintDevHours,
		handleImport,
		isUploading,
	} = useDataContext();

	const columns: GridColDef[] = [
		{ field: "issueKey", headerName: "Issue Key", width: 130, editable: true },
		{ field: "issueId", headerName: "Issue ID", width: 120, editable: true },
		{ field: "summary", headerName: "Summary", width: 200, editable: true },
		{ field: "sprint", headerName: "Sprint", width: 100, editable: true },
		{
			field: "storyPoints",
			headerName: "Story Points",
			type: "number",
			width: 110,
			editable: true,
		},
		{
			field: "prComments",
			headerName: "PR Comments",
			type: "number",
			width: 110,
			editable: true,
		},
		{
			field: "qaBugs",
			headerName: "QA Bugs",
			type: "number",
			width: 100,
			editable: true,
		},
		{
			field: "designErrors",
			headerName: "Design Errors",
			type: "number",
			width: 120,
			editable: true,
		},
		{
			field: "devHours",
			headerName: "Dev Hours",
			type: "number",
			width: 100,
			editable: true,
			valueGetter: (params: { row?: StoryEntry }) =>
				params.row?.sprint ? sprintDevHours[params.row.sprint] ?? 0 : 0,
		},
		{
			field: "gamePoints",
			headerName: "Game Points",
			type: "number",
			width: 110,
			editable: false,
		},
		{
			field: "notes",
			headerName: "Notes",
			type: "string",
			width: 110,
			editable: true,
		},
	];

	const handleRowUpdate = (updatedRow: StoryEntry) => {
		debugger;
		const updatedGamePoints = calculateGamePoints(
			Number(updatedRow.storyPoints || 0),
			Number(updatedRow.prComments || 0),
			Number(updatedRow.qaBugs || 0),
			Number(updatedRow.designErrors || 0)
		);

		const updatedWithPoints = {
			...updatedRow,
			gamePoints: updatedGamePoints,
		};

		// Update devHours globally if changed
		const existing = entries.find((e) => e.sprint === updatedRow.sprint);
		if (
			existing?.sprint &&
			updatedRow.devHours !== undefined &&
			updatedRow.devHours !== sprintDevHours[existing.sprint]
		) {
			setSprintDevHours({
				...sprintDevHours,
				[existing.sprint]: updatedRow.devHours,
			});
		}

		const updated = entries.map((entry) =>
			entry.id === updatedRow.id ? updatedWithPoints : entry
		);
		setEntries(updated);
		return updatedWithPoints;
	};

	const handleAddEntry = () => {
		const newEntry: StoryEntry = {
			id: crypto.randomUUID(), // or use Date.now().toString() for fallback
			issueKey: "",
			issueId: "",
			summary: "",
			sprint: "",
			storyPoints: 0,
			prComments: 0,
			qaBugs: 0,
			designErrors: 0,
			gamePoints: 0,
			devHours: 80,
			notes: "",
		};

		const updated = [newEntry, ...entries];
		setEntries(updated);
	};

	return (
		<div style={{ height: 600, width: "100%" }}>
			<div className="buttons-container">
				<button
					onClick={handleDeleteSelected}
					disabled={selectedIds.size === 0}
					style={{ marginBottom: 10 }}>
					Delete Selected
				</button>
				<button
					onClick={handleImport}
					disabled={isUploading}
					style={{ marginBottom: 10 }}>
					Import from CSV
				</button>
				<button onClick={handleAddEntry} style={{ marginBottom: 10 }}>
					Add Entry
				</button>
			</div>
			<DataGrid
				rows={entries}
				columns={columns}
				checkboxSelection
				disableRowSelectionOnClick
				getRowId={(row) => row.id}
				processRowUpdate={handleRowUpdate}
				onRowSelectionModelChange={(newSelection) => {
					const ids = (newSelection.ids ?? []) as unknown as string[];
					toggleSelectionBulk(new Set(ids));
				}}
			/>
		</div>
	);
};
