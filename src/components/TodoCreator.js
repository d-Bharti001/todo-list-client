import { useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useTodo } from "../contexts/Todo";

export default function TodoCreator() {

    const { createTodo } = useTodo();
    const [loading, setLoading] = useState(false);
    const desc = useRef();

    const handleCreateTodo = async (event) => {
        event.preventDefault();
        const description = desc.current.value;
        try {
            setLoading(true);
            await createTodo(description);
            desc.current.value = "";
            setLoading(false);
        } catch (err) {
            console.error(err.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleCreateTodo} className="mt-2 mb-2">
                <FloatingLabel label="Add new todo...">
                    <Form.Control
                        required
                        onSubmit={handleCreateTodo}
                        as="textarea"
                        style={{ height: 100 }}
                        placeholder="Enter description..."
                        ref={desc}
                        disabled={loading}
                    />
                </FloatingLabel>
                <div className="d-grid gap-2 mt-3">
                    <Button type="submit" variant="primary" disabled={loading}>
                        Create
                    </Button>
                </div>
            </Form>
        </>
    );
}
