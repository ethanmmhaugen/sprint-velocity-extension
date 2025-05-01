import React, { createContext, useContext, useEffect, useState } from "react";
import { StoryEntry } from "../shared/models";
import { Storage } from "../shared/storage";

interface DataContextType {
	entries: StoryEntry[];
	selectedIds: Set<string>;
	setEntries: (entries: StoryEntry[]) => void;
	toggleSelection: (id: string) => void;
	toggleSelectionBulk: (ids: Set<string>) => void;
	handleDeleteSelected: () => void;
	isUploading: boolean;
	handleImport: () => void;
	sprintDevHours: { [sprint: string]: number };
	setSprintDevHours: (hours: { [sprint: string]: number }) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [entries, setEntriesInternal] = useState<StoryEntry[]>([]);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [isUploading, setIsUploading] = useState(false);
	const [sprintDevHours, setSprintDevHoursInternal] = useState<{
		[sprint: string]: number;
	}>({});

	useEffect(() => {
		Storage.getAll().then((stored) => {
			setEntriesInternal(stored);

			// Initialize sprint dev hours map from existing entries if any
			const sprintMap: { [sprint: string]: number } = {};
			for (const entry of stored) {
				if (entry.sprint && entry.devHours && !sprintMap[entry.sprint]) {
					sprintMap[entry.sprint] = entry.devHours;
				}
			}
			setSprintDevHoursInternal(sprintMap);
		});
	}, []);

	const setEntries = (updated: StoryEntry[]) => {
		setEntriesInternal(updated);
		chrome.storage.local.set({ entries: updated });
	};

	const setSprintDevHours = (hours: { [sprint: string]: number }) => {
		setSprintDevHoursInternal(hours);

		// Also update entries that share that sprint
		const updatedEntries = entries.map((entry) => {
			if (entry.sprint && hours[entry.sprint] !== undefined) {
				return { ...entry, devHours: hours[entry.sprint] };
			}
			return entry;
		});
		setEntries(updatedEntries);
	};

	const toggleSelection = (id: string) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return new Set(next);
		});
	};

	const toggleSelectionBulk = (ids: Set<string>) => {
		console.log(ids);
		setSelectedIds(new Set(ids));
	};

	console.log(selectedIds);

	const handleDeleteSelected = async () => {
		const updated = entries.filter((e) => !selectedIds.has(e.id));
		await Storage.setAll(updated);
		setEntriesInternal(updated);
		setSelectedIds(new Set());
	};

	const handleImport = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".csv";

		input.onchange = async (e: any) => {
			const file = e.target.files[0];
			if (!file) return;

			setIsUploading(true);

			try {
				const text = await file.text();
				const newEntries: StoryEntry[] = await processCSV(text);

				const existingIds = new Set(entries.map((e) => e.issueId));
				const filteredNewEntries = newEntries.filter(
					(e) => !existingIds.has(e.issueId)
				);

				const updatedEntries = [...entries, ...filteredNewEntries];
				setEntries(updatedEntries);
			} catch (err) {
				console.error("Error importing CSV:", err);
			} finally {
				setIsUploading(false);
			}
		};

		input.click();
	};

	const processCSV = async (csvText: string): Promise<StoryEntry[]> => {
		const lines = csvText.trim().split(/\r?\n/);
		const headers = lines[0].split(",").map((h) => h.trim());

		const sprintColumns = headers
			.map((h, i) => ({ h, i }))
			.filter(({ h }) => h === "Sprint");

		const storyPointColumns = headers
			.map((h, i) => ({ h, i }))
			.filter(({ h }) => /story points/i.test(h));

		const entries: StoryEntry[] = [];

		for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
			const row = lines[rowIndex].split(",").map((c) => c.trim());
			const issueKey = row[headers.indexOf("Issue key")] || "";
			const issueId = row[headers.indexOf("Issue id")] || "";
			const summary = row[headers.indexOf("Summary")] || "";

			let sprint = "";
			for (let i = sprintColumns.length - 1; i >= 0; i--) {
				const val = row[sprintColumns[i].i];
				if (val) {
					sprint = val;
					break;
				}
			}

			let storyPoints = 0;
			for (let i = storyPointColumns.length - 1; i >= 0; i--) {
				const val = row[storyPointColumns[i].i];
				if (val) {
					const parsed = parseFloat(val);
					if (!isNaN(parsed)) {
						storyPoints = parsed;
						break;
					}
				}
			}

			const newEntry: StoryEntry = {
				id: `${issueKey}-${issueId}` || Math.random().toString(),
				issueKey,
				issueId,
				summary,
				sprint,
				storyPoints,
				prComments: 0,
				qaBugs: 0,
				designErrors: 0,
				gamePoints: 0,
				devHours: 0,
				notes: "",
			};

			entries.push(newEntry);
		}

		return entries;
	};

	return (
		<DataContext.Provider
			value={{
				entries,
				selectedIds,
				setEntries,
				toggleSelection,
				toggleSelectionBulk,
				handleDeleteSelected,
				isUploading,
				handleImport,
				sprintDevHours,
				setSprintDevHours,
			}}>
			{children}
		</DataContext.Provider>
	);
};

export const useDataContext = (): DataContextType => {
	const context = useContext(DataContext);
	if (!context)
		throw new Error("useDataContext must be used within a DataProvider");
	return context;
};
