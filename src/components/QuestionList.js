// QuestionList.js
import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleDeleteQuestion = (questionId) => {
    // Delete question from the server
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update state after successful deletion
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const handleUpdateQuestion = (questionId, newCorrectIndex) => {
    // Update question on the server
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    })
      .then(() => {
        // Update state after successful update
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === questionId ? { ...question, correctIndex: newCorrectIndex } : question
          )
        );
      })
      .catch((error) => console.error("Error updating question:", error));
  };

  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
