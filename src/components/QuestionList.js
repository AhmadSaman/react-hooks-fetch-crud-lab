import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		fetch("http://localhost:4000/questions")
			.then((r) => r.json())
			.then((data) => setQuestions(data));
	}, []);

	function deleteQuestion(id) {
		fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
			.then((r) => r.json())
			.then((data) => {
				console.log(data);
				const newQuestions = questions.filter((question) => id !== question.id);
				setQuestions(newQuestions);
			});
	}

	function changeCorrectIndex(correctIndex, question) {
		fetch(`http://localhost:4000/questions/${question.id}`, {
			method: "PATCH",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({ correctIndex: parseInt(correctIndex) }),
		})
			.then((r) => r.json())
			.then((updatedQuestion) => {
				console.log(updatedQuestion);
				const newQuestion = questions.map((q) => {
					if (q.id === question.id) {
						return updatedQuestion;
					}
					return { ...q };
				});
				setQuestions(newQuestion);
			});
	}
	return (
		<section>
			<h1>Quiz Questions</h1>
			<ul>
				{questions.map((question) => (
					<QuestionItem
						key={question.id}
						question={question}
						deleteQuestion={deleteQuestion}
						changeCorrectIndex={changeCorrectIndex}
					/>
				))}
			</ul>
		</section>
	);
}

export default QuestionList;
