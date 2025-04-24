// src/shared/models.ts

/** One logged “story” entry */
export interface StoryEntry {
	id: string; // uuid or timestamp-based
	date: number; // Date.now()
	points: number; // story points completed
	qaBugs: number; // number of QA bugs
	designErrors: number;
	prComments: number;
	gamePoints: number;
	sprint: string;
	link: string;
}
