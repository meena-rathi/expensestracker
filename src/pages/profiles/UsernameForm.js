import React, { useEffect, useState } from 'react';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosRes } from '../../api/axiosDefaults';
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css"; // Ensure this path is correct
import styles from '../../styles/UsernamePasswordForm.module.css';
import { useRedirect } from '../../Hooks/useRedirect';

function UsernameForm() {
    useRedirect('loggedOut');
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(""); // For success message
    const history = useHistory();
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    useEffect(() => {
        if (currentUser) {
            setUsername(currentUser.username);
        } else {
            history.push("/");
        }
    }, [currentUser, history]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.put("/dj-rest-auth/user/", { username });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            setSuccess("Username updated successfully!"); // Set success message
            setTimeout(() => history.push('/profiles'), 2000); // Redirect after 2 seconds
        } catch(err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit} className="my-2">
                        <Form.Group>
                            <Form.Label>Change username</Form.Label>
                            <Form.Control
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {errors?.username?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        {success && (
                            <Alert variant="success">
                                {success}
                            </Alert>
                        )}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Blue} ${styles.SaveBtn}`}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
}

export default UsernameForm;
