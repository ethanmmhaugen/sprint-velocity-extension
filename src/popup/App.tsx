import React, { useState } from "react";
import { Storage } from "../shared/storage";
import { StoryEntry } from "../shared/models";

export const App: React.FC = () => {
	const [points, setPoints] = useState<string>("");
	const [sprint, setSprint] = useState<string>("");
	const [qaBugs, setQaBugs] = useState<string>("");
	const [designErrors, setDesignErrors] = useState<string>("");
	const [prComments, setPrComments] = useState<string>("");
	const [link, setLink] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const pts = parseInt(points, 10) || 0;
		const bugs = parseInt(qaBugs, 10) || 0;
		const errs = parseInt(designErrors, 10) || 0;
		const comments = parseInt(prComments, 10) || 0;

		const gamePoints = pts * 100 + bugs * -100 + errs * -50 + comments * -25;

		const entry: StoryEntry = {
			id: Date.now().toString(),
			date: Date.now(),
			points: pts,
			qaBugs: bugs,
			designErrors: errs,
			prComments: comments,
			gamePoints,
			sprint: sprint,
			link: link,
		};

		await Storage.save(entry);
		alert(`Saved! Game points: ${gamePoints}`);

		setPoints("");
		setQaBugs("");
		setDesignErrors("");
		setPrComments("");
		setLink("");
		setSprint("");
	};

	return (
		<form onSubmit={handleSubmit} style={{ padding: 10, width: 300 }}>
			<div>
				<label>
					Story Number:
					<input
						type="number"
						value={sprint}
						onChange={(e) => setSprint(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Story pts:
					<input
						type="number"
						value={points}
						onChange={(e) => setPoints(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					QA bugs:
					<input
						type="number"
						value={qaBugs}
						onChange={(e) => setQaBugs(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Design errs:
					<input
						type="number"
						value={designErrors}
						onChange={(e) => setDesignErrors(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					PR comments:
					<input
						type="number"
						value={prComments}
						onChange={(e) => setPrComments(e.target.value)}
					/>
				</label>
			</div>
			<div>
				<label>
					Jira Link:
					<input
						type="string"
						value={prComments}
						onChange={(e) => setLink(e.target.value)}
					/>
				</label>
			</div>
			<button type="submit" style={{ marginTop: 10 }}>
				Save Entry
			</button>
			<button
				type="button"
				onClick={() => chrome.runtime.openOptionsPage()}
				style={{ marginTop: 10, marginLeft: 8 }}>
				Open Dashboard
			</button>
		</form>
	);
};
