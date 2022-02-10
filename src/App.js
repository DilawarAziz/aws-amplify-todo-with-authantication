import { React, useState, useEffect } from "react";
import "./App.css";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo, deleteTodo, updateTodo } from "./graphql/mutations";

import { listTodos } from "./graphql/queries";
Amplify.configure(awsconfig);
function App() {
  let [todoslist, settodos] = useState();
  let [updateid, setupdate] = useState();
  let [tod, settod] = useState({
    name: updateid?.name,
  });
  let name, value;

  let handleinput = (e) => {
    name = e.target.name;
    value = e.target.value;
    settod({ ...tod, [name]: value });
  };

  const addTodo = async (e) => {
    e.preventDefault();

    try {
      return await API.graphql(graphqlOperation(createTodo, { input: tod }));
    } catch (error) {
      console.log(error);
    }
  };

  const Todos = async () => {
    try {
      let todos = await API.graphql(graphqlOperation(listTodos));
      settodos(todos);
    } catch (error) {
      console.log(error);
    }
  };

  const delTodo = async (items) => {
    const todoDetails = {
      id: items.id,
    };
    try {
      await API.graphql({
        query: deleteTodo,
        variables: { input: todoDetails },
      });
    } catch (error) {
      console.log(error);
    }
  };

  let todos = todoslist?.data.listTodos.items;

  useEffect(() => {
    Todos();
  }, []);

  useEffect(() => {
    settod({ name: updateid?.name });
  }, [updateid]);

  const update = async (e) => {
    e.preventDefault();

    const todoDetails = {
      id: updateid?.id,
      name: tod?.name,
    };
    try {
      const updatedTodo = await API.graphql({
        query: updateTodo,
        variables: { input: todoDetails },
      });
      console.log(updatedTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ul id="book-list">
        <h1>Todo List</h1>
        {todos?.map((items, index) => (
          <li key={index}>
            <p style={{ margin: "0px", width: "20%" }}>{items.name}</p>

            <p
              onClick={() => {
                setupdate(items);
              }}
              style={{ margin: "0px" }}
            >
              Update
            </p>
            <p onClick={() => delTodo(items)} style={{ margin: "0px" }}>
              Delete
            </p>
          </li>
        ))}
      </ul>
      <div className="add-book-pt">
        <form id="add-book">
          <div className="field">
            <label>Add Todo:</label>
            <input
              onChange={handleinput}
              value={tod.name}
              name="name"
              type="text"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button onClick={addTodo} type="submit">
              +
            </button>
            <button onClick={update}>U</button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <br />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
