import { StoryEntry } from "./models";
import { supabase } from "./supabase";

const TABLE_NAME = "story_entries";

// Convert camelCase to snake_case
const toSnakeCase = (str: string) =>
	str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

// Convert snake_case to camelCase
const toCamelCase = (str: string) =>
	str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

// Convert object keys from camelCase to snake_case
const toSnakeCaseObject = (obj: any) => {
	const result: any = {};
	for (const key in obj) {
		result[toSnakeCase(key)] = obj[key];
	}
	return result;
};

// Convert object keys from snake_case to camelCase
const toCamelCaseObject = (obj: any) => {
	const result: any = {};
	for (const key in obj) {
		result[toCamelCase(key)] = obj[key];
	}
	return result;
};

export const Storage = {
	async getAll(): Promise<StoryEntry[]> {
		const { data, error } = await supabase
			.from(TABLE_NAME)
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			console.error("Error fetching entries:", error);
			return [];
		}

		// Convert snake_case to camelCase
		return (data || []).map(toCamelCaseObject);
	},

	async save(entry: StoryEntry): Promise<void> {
		// Convert camelCase to snake_case and add created_at
		const snakeCaseEntry = {
			...toSnakeCaseObject(entry),
			created_at: new Date().toISOString(),
		};

		const { error } = await supabase.from(TABLE_NAME).insert([snakeCaseEntry]);

		if (error) {
			console.error("Error saving entry:", error);
			throw error;
		}
	},

	async setAll(entries: StoryEntry[]): Promise<void> {
		// Convert camelCase to snake_case and add created_at for new entries
		const snakeCaseEntries = entries.map((entry) => ({
			...toSnakeCaseObject(entry),
			created_at: entry.created_at || new Date().toISOString(),
		}));

		// Insert all entries
		if (snakeCaseEntries.length > 0) {
			const { error: insertError } = await supabase
				.from(TABLE_NAME)
				.upsert(snakeCaseEntries, { onConflict: "id" });

			if (insertError) {
				console.error("Error inserting entries:", insertError);
				throw insertError;
			}
		}
	},

	async clearAll(): Promise<void> {
		const { error } = await supabase
			.from(TABLE_NAME)
			.delete()
			.neq("id", "dummy"); // This will delete all rows

		if (error) {
			console.error("Error clearing entries:", error);
			throw error;
		}
	},
};
