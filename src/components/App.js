// // App.js
// import React, { useState } from "react";
// import AdminNavBar from "./AdminNavBar";
// import QuestionForm from "./QuestionForm";
// import QuestionList from "./QuestionList";

// function App() {
//   const [page, setPage] = useState("List");

//   return (
//     <main>
//       <AdminNavBar onChangePage={setPage} />
//       {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList />}
//     </main>
//   );
// }

// export default App;


// App.js
import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");

  const handleAddQuestion = (newQuestion) => {
    // This function will be defined later in the QuestionList component
    // to add a new question to the list.
    console.log(newQuestion);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion} /> : <QuestionList />}
    </main>
  );
}

export default App;

