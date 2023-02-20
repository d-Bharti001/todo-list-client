import { useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";
import { useTodo } from "../contexts/Todo";

export default function Homepage() {

    const { getAllTodos } = useTodo();

    useEffect(() => {
        getAllTodos().catch(err => {
            console.error(err.message);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
                <Container>
                    <Navbar.Brand>Simple Todo App</Navbar.Brand>
                </Container>
            </Navbar>
            <div style={{ height: 128 }}></div>
            <Container style={{ maxWidth: 500 }}>
                <TodoCreator />
                <br />
                <TodoList />
            </Container>
        </>
    );
}
