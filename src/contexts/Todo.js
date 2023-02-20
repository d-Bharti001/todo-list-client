import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const TodoContext = createContext();

const URL = process.env.REACT_APP_BACKEND_URL;

export function useTodo() {
    return useContext(TodoContext);
}

export default function TodoProvider(props) {
    const [todos, setTodos] = useState({});

    const getAllTodos = () => {
        return axios.get(`${URL}/todo`).then(res => {
            const todos = res.data.result;
            const todosObject = todos.reduce((acc, todo) => {
                acc[todo._id] = todo;
                return acc;
            }, {});
            setTodos(todosObject);
        });
    };

    const getTodo = (id) => {
        return axios.get(`${URL}/todo/${id}`).then(res => {
            const todo = res.data.result;
            setTodos(prevTodos => ({ ...prevTodos, [todo._id]: todo }));
        });
    };

    const createTodo = (description) => {
        return axios.post(`${URL}/todo`, { description }).then(res => {
            const todo = res.data.result;
            setTodos(prevTodos => ({ ...prevTodos, [todo._id]: todo }));
        });
    };

    const updateTodo = (id, description) => {
        return axios.patch(`${URL}/todo/${id}`, { description }).then(res => {
            const todo = res.data.result;
            setTodos(prevTodos => ({ ...prevTodos, [todo._id]: todo }));
        });
    };

    const deleteTodo = (id) => {
        return axios.delete(`${URL}/todo/${id}`).then(res => {
            const todo = res.data.result;
            setTodos(prevTodos => {
                delete prevTodos[todo._id];
                return { ...prevTodos };
            });
        });
    };

    return (
        <TodoContext.Provider value={{
            todos,
            getAllTodos,
            getTodo,
            createTodo,
            updateTodo,
            deleteTodo,
        }}>
            {props.children}
        </TodoContext.Provider>
    );
}
