import { useEffect } from "react";
import { useTodo } from "../contexts/Todo";
import TodoCard from "./TodoCard";

export default function TodoList() {

    const { todos } = useTodo();

    useEffect(() => {console.log(todos);}, [todos]);

    return (
        <>
            {Object.values(todos).sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }).map(todo => (
                <TodoCard todo={todo} key={todo._id} />
            ))}
        </>
    );
}
