import React from "react";

function QuestionItem({ question, deleteQuestion, changeCorrectIndex }) {
	const { id, prompt, answers, correctIndex } = question;

	const options = answers.map((answer, index) => (
		<option key={index} value={index}>
			{answer}
		</option>
	));

	return (
		<li>
			<h4>Question {id}</h4>
			<h5>Prompt: {prompt}</h5>
			<label>
				Correct Answer:
				<select
					defaultValue={correctIndex}
					onChange={(event) => changeCorrectIndex(event.target.value, question)}
				>
					{options}
				</select>
			</label>
			<button onClick={() => deleteQuestion(id)}>Delete Question</button>
		</li>
	);
}

export default QuestionItem;
