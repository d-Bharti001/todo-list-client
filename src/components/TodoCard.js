import { useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { useTodo } from "../contexts/Todo";

export default function TodoCard({ todo }) {

    const { deleteTodo, updateTodo } = useTodo();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(todo.description);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await deleteTodo(todo._id);
        } catch (err) {
            console.error(err.message);
            setLoading(false);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            await updateTodo(todo._id, content);
            setEditing(false);
            setLoading(false);
        } catch (err) {
            console.error(err.message);
            setLoading(false);
        }
    };

    return (
        <Card className="mt-4 mb-4">
            {editing ?
                <>
                    <Card.Body>
                        <Form id={`form-${todo._id}`} onSubmit={handleUpdate}>
                            <Form.Control
                                required
                                as="textarea"
                                style={{ height: 120 }}
                                defaultValue={content}
                                disabled={loading}
                                onChange={(event) => {
                                    setContent(event.target.value);
                                }}
                            />
                        </Form>
                    </Card.Body>
                    <Card.Footer>
                        <Stack direction="horizontal">
                            <Button variant="secondary" size="sm"
                                className="ms-auto"
                                disabled={loading}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setContent(todo.description);
                                    setEditing(false);
                                }}
                            >
                                <i className="bi bi-x-lg" />
                            </Button>
                            <Button
                                variant="success"
                                size="sm"
                                className="ms-2"
                                type="submit"
                                disabled={loading}
                                form={`form-${todo._id}`}
                            >
                                <i className="bi bi-check-lg" />
                            </Button>
                        </Stack>
                    </Card.Footer>
                </> :
                <>
                    <Card.Body>
                        <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                            {content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Stack direction="horizontal">
                            <Button variant="danger" size="sm"
                                disabled={loading}
                                onClick={handleDelete}
                            >
                                <i className="bi bi-trash" />
                            </Button>
                            <Button variant="secondary" size="sm"
                                className="ms-auto"
                                disabled={loading}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setEditing(true);
                                }}
                            >
                                <i className="bi bi-pencil-square" />
                            </Button>
                        </Stack>
                    </Card.Footer>
                </>
            }
        </Card>
    );
}
