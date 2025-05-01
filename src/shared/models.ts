// src/shared/models.ts

/** One logged “story” entry */
export interface StoryEntry {
	id: string; // Unique internal ID
	issueKey: string; // e.g., TITANS-1234
	issueId: string; // Jira ID (optional for linking)
	summary: string;
	sprint: string | number;
	storyPoints: number;
	prComments: number;
	qaBugs: number;
	designErrors: number;
	gamePoints: number;
	devHours: number;
	notes: string;
}
