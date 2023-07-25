import React, { useState } from "react";

function QuestionForm(onAddQuestion) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name.startsWith("answer")) {
      const index = parseInt(name.replace("answer", ""), 10);
      setFormData({
        ...formData,
        answers: formData.answers.map((answer, i) => (i === index ? value : answer)),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  const handleAddQuestion = () => {
    const { prompt, answers, correctIndex } = formData;
    const newQuestion = {
      prompt,
      answers,
      correctIndex: parseInt(correctIndex, 10),
    };

    // Send new question to the server
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        // Call the onAddQuestion prop to update the state in QuestionList
        onAddQuestion(data);

        // Clear the form after successful addition
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      })
      .catch((error) => console.error("Error adding question:", error));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit" onClick={handleAddQuestion}>Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;


// // QuestionForm.js
// import React, { useState } from "react";

// function QuestionForm({ onAddQuestion }) {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     answers: ["", "", "", ""],
//     correctIndex: 0,
//   });

//   const handleChange = (event) => {
    // const { name, value } = event.target;
    // if (name.startsWith("answer")) {
    //   const index = parseInt(name.replace("answer", ""), 10);
    //   setFormData({
    //     ...formData,
    //     answers: formData.answers.map((answer, i) => (i === index ? value : answer)),
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // }
//   };

//   const handleAddQuestion = () => {
//     const { prompt, answers, correctIndex } = formData;
//     const newQuestion = {
//       prompt,
//       answers,
//       correctIndex: parseInt(correctIndex, 10),
//     };

//     // Send new question to the server
//     fetch("http://localhost:4000/questions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newQuestion),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Call the onAddQuestion prop to update the state in QuestionList
//         onAddQuestion(data);

//         // Clear the form after successful addition
//         setFormData({
//           prompt: "",
//           answers: ["", "", "", ""],
//           correctIndex: 0,
//         });
//       })
//       .catch((error) => console.error("Error adding question:", error));
//   };

//   return (
//     <section>
//       <h1>New Question</h1>
//       <form onSubmit={(event) => event.preventDefault()}>
//         <label>
//           Prompt:
//           <input
//             type="text"
//             name="prompt"
//             value={formData.prompt}
//             onChange={handleChange}
//           />
//         </label>
//         {[1, 2, 3, 4].map((index) => (
//           <label key={index}>
//             Answer {index}:
//             <input
//               type="text"
//               name={`answer${index}`}
//               value={formData.answers[index - 1]}
//               onChange={handleChange}
//             />
//           </label>
//         ))}
//         <label>
//           Correct Answer:
//           <select
//             name="correctIndex"
//             value={formData.correctIndex}
//             onChange={handleChange}
//           >
//             {formData.answers.map((answer, index) => (
//               <option key={index} value={index}>
//                 {answer}
//               </option>
//             ))}
//           </select>
//         </label>
//         <button type="button" onClick={handleAddQuestion}>
//           Add Question
//         </button>
//       </form>
//     </section>
//   );
// }

// export default QuestionForm;
