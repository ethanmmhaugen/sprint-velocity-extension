import React from "react";
import "./Rules.css";

export const Rules: React.FC = () => {
	return (
		<div className="rules-container">
			<h2>🏆 Sprint Scoring Rules</h2>
			<p>
				Welcome to the <strong>Sprint Velocity Game</strong>! Here's how you
				score points and rise to the top 🧠💪
			</p>

			<ul className="rules-list">
				<li>
					✅ <strong>+100 points</strong> for every <em>Story Point</em>{" "}
					completed.
				</li>
				<li>
					🐞 <strong>-100 points</strong> for each story that comes back from{" "}
					<em>QA with a bug</em>.
				</li>
				<li>
					💬 <strong>-25 points</strong> for each <em>PR comment</em> received.
					Keep it clean!
				</li>
				<li>
					🎨 <strong>-50 points</strong> for every <em>Design Error</em>. Pixel
					perfect matters!
				</li>
			</ul>

			<p className="strategy">
				Strategize wisely, and watch your game score soar across sprints! 🚀
			</p>
		</div>
	);
};
