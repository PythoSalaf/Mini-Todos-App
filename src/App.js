import React, { useState, useEffect } from "react";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./Feature/API/apiSlice";
import { MdDelete } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";

function App() {
  const [todo, setTodo] = useState("");
  const { data: todos, isLoading, error } = useGetTodosQuery();
  // console.log("Todos", todos);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      addTodo({ title: todo, completed: false });
      setTodo("");
    }
  };

  useEffect(() => {
    if (!isLoading && !error && todos) {
      console.log("Todos:", todos);
    }
  }, [todos, error, isLoading]);

  return (
    <div className="App">
      <h1 className="app-title">My todo lists</h1>
      <div className="app-container">
        <form onSubmit={handleSubmit}>
          <div className="app-container-top">
            <div className="container-input">
              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Enter your tasks......"
              />
            </div>
            <div className="container-btn">
              <button type="submit">Add task</button>
            </div>
          </div>
        </form>
      </div>
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
              <div
                key={data.id}
                className={
                  data.completed ? "todos-content-completed" : "todos-content"
                }
              >
                <div
                  className="todos-list"
                  onClick={() =>
                    updateTodo({ ...data, completed: !data.completed })
                  }
                >
                  {data.completed && <IoCheckmark size={28} color="white" />}
                  <h4 className={!data.completed ? "todos" : "todos-completed"}>
                    {data.title}
                  </h4>
                  <div>
                    <MdDelete
                      size={25}
                      color={data.completed ? "white" : "black"}
                      onClick={() => deleteTodo({ id: data.id })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
