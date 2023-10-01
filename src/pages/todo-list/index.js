import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  addTodo,
  deleteAllTodo,
  editTodo,
  toggleTodo,
} from "../../data/action/actions";
import { useState } from "react";
import * as IoIcons from "react-icons/io";
import * as AiIcons from "react-icons/ai";
import "./style.css";
function TodoList() {
  const { todos } = useSelector((s) => s.todo);
  const { theme } = useSelector((s) => s.theme);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };
  const handleEditClick = (todo) => {
    setEditableTodoId(todo.id);
    setEditedTodoText(todo.text);
  };

  const handleSaveEdit = () => {
    if (editableTodoId !== null) {
      dispatch(editTodo(editableTodoId, editedTodoText));
      setEditableTodoId(null);
      setEditedTodoText("");
    }
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllTodo());
  };

  return (
    <div className={`${theme === "dark" ? "dark-theme todo-div" : "todo-div"}`}>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div id="checklist" className="todoss">
        {todos &&
          todos.map((todo, index) => (
            <div key={index} className="todo-list-1">
              <div
                key={todo.id}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                className="texts-new"
              >
                {editableTodoId === todo.id ? (
                  <p className="texts-new">
                    <input
                      type="text"
                      value={editedTodoText}
                      onChange={(e) => setEditedTodoText(e.target.value)}
                    />
                    <AiIcons.AiFillSave onClick={handleSaveEdit} />
                  </p>
                ) : (
                  <>
                    <p className="texts-new">
                      {todo.text}
                      <AiIcons.AiFillEdit
                        className="iconss"
                        onClick={() => handleEditClick(todo)}
                      />
                    </p>
                  </>
                )}
                {editableTodoId === todo.id ? (
                  <></>
                ) : (
                  <p onClick={() => dispatch(toggleTodo(todo.id))}>
                    <IoIcons.IoMdTrash className="iconss-1" fill="red" />
                  </p>
                )}
              </div>
            </div>
          ))}
        {todos.length >= 2 && (
          <button className="button" type="button" onClick={handleDeleteAll}>
            <span className="button__text">Delete All</span>
            <span className="button__icon">
              <IoIcons.IoMdTrash />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoList;
