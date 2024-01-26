import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, ModalTitle } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authStore from '../stores/AuthStore';

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        if (!username || !password) {
            setErrorMessage('Заполните и пароль и логин');
            return;
        }

        if (authStore.login(username, password)) {
            navigate('/home');
        } else {
            setErrorMessage('Пользователь не найден');
        }
    };

    return (
        <Form>
            <ModalTitle>Войти</ModalTitle>
            <br></br>
            <Form.Group className="mb-3">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите ваше логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Введите ваш пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Button variant="primary" onClick={handleLogin}>
                Вход
            </Button>

            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}

            <div className="mt-3">
                Нет аккаунта? <Link to="/register">Регистрация</Link>
            </div>
        </Form>
    );
};

export default LoginForm;
