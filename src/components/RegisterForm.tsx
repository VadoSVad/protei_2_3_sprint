import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button, ModalTitle, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authStore from '../stores/AuthStore';

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [gender, setGender] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');

    const handleRegister = () => {
        if (!username || !password) {
            console.log('Заполните все поля');
            return;
        }

        if (authStore.userExists(username)) {
            console.log('Данный логин занят');
            setErrorMessage('Данный логин занят');
            return;
        }

        authStore.register(username, password, gender, displayName);
        navigate('/home');
    };

    return (
        <Form>
            <ModalTitle>Регистрация</ModalTitle>
            <br></br>
            <Form.Group controlId="formUsername">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите ваше имя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Введите ваш пороль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formGender">
                <Form.Label>Гендер</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите ваш гендер"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
            </Form.Group>
            <br></br>
            <Form.Group controlId="formDisplayName">
                <Form.Label>Отображаемое имя</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите отображаемое имя"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
            </Form.Group>
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
            <br></br>
            <Button variant="primary" onClick={handleRegister}>
                Регистрация
            </Button>

            <div className="mt-3">
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </div>

        </Form>

    );
};

export default RegisterForm;
