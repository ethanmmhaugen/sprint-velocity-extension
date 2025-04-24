import { StoryEntry } from "./models";

const STORAGE_KEY = "entries";

export const Storage = {
	getAll(): Promise<StoryEntry[]> {
		return new Promise((resolve) => {
			chrome.storage.local.get(STORAGE_KEY, (result) => {
				resolve((result[STORAGE_KEY] as StoryEntry[]) || []);
			});
		});
	},

	save(entry: StoryEntry): Promise<void> {
		return Storage.getAll().then((entries) => {
			entries.push(entry);
			return new Promise((resolve) => {
				chrome.storage.local.set({ [STORAGE_KEY]: entries }, () => resolve());
			});
		});
	},

	setAll(entries: StoryEntry[]): Promise<void> {
		return new Promise((resolve) => {
			chrome.storage.local.set({ [STORAGE_KEY]: entries }, () => resolve());
		});
	},

	clearAll(): Promise<void> {
		return new Promise((resolve) => {
			chrome.storage.local.remove(STORAGE_KEY, () => resolve());
		});
	},
};
