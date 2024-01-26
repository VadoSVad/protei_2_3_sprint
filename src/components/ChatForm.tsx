import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import authStore from "../stores/AuthStore";
import { Link } from 'react-router-dom';

const ChatForm: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, message]);
            setMessage('');
        }
    };
    const handleLogout = () => {
        console.log('Вход...');
        authStore.logout();
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <div className="mb-3">
                        <h3>История</h3>
                        {messages.map((msg, index) => (
                            <div key={index}>{msg}</div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formMessage">
                            <Form.Control
                                type="text"
                                placeholder="Напишите ваше сообщение..."
                                value={message}
                                onChange={handleMessageChange}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSendMessage}>
                            Отправить
                        </Button>
                        <Link to="/login"><Button variant="danger" className="ml-2" onClick={handleLogout}>
                            Выйти
                        </Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ChatForm;
