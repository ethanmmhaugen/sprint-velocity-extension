export function calculateGamePoints(
	storyPoints: number,
	prComments: number,
	qaBugs: number,
	designErrors: number
): number {
	return storyPoints * 100 - prComments * 25 - qaBugs * 100 - designErrors * 50;
}
