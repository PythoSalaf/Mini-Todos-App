import React, { useState, useEffect } from "react";
import { useGetTodosQuery } from "./Feature/API/apiSlice";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const { data: todos, isLoading, isError, error } = useGetTodosQuery();
  // console.log("Todos", todos);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      setTodo("");
    }
  };

  useEffect(() => {
    if (!isLoading && !error && todos) {
      console.log("Todos:", todos);
    }
  }, [todos, error, isLoading]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="App">
      <h1 className="app-title">My todo lists</h1>
      <div className="app-container">
        <form onSubmit={handleSubmit}>
          <div className="app-container-top">
            <div className="container-input">
              <input type="text" placeholder="Enter your tasks......" />
            </div>
            <div className="container-btn">
              <button type="submit">Add task</button>
            </div>
          </div>
        </form>
        <div className="todos-content-container">
          {error ? (
            <>
              <h4>Oh there is an error</h4>
            </>
          ) : isLoading ? (
            <>Loading.....</>
          ) : todos ? (
            <div>
              {todos.map((data) => (
                <div key={data.id} className="todos-content">
                  <div className="todos-list">
                    <p>{data.title}</p>
                    <div>
                      <MdDelete />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
