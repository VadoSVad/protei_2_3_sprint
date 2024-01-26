import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import authStore from '../stores/AuthStore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home: React.FC = observer(() => {
    const [gender, setGender] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [chatNumber, setChatNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setGender(authStore.gender);
        setDisplayName(authStore.displayName);
    }, []);

    const handleConnectToChat = () => {
        console.log('Подключиться к чату', { gender, displayName, chatNumber });
    };

    const handleLogout = () => {
        console.log('Вход...');
        authStore.logout();
        navigate('/login');
    };

    return (
        <div>
            <h2>Добро пожаловать, {authStore.username}!</h2>

            <Form>
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
                        placeholder="Введите пароль"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </Form.Group>
                <br></br>
                <Form.Group controlId="formChatNumber">
                    <Form.Label>Номер чата</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Введите номер чата"
                        value={chatNumber}
                        onChange={(e) => setChatNumber(e.target.value)}
                    />
                </Form.Group>

                <br></br>

                <Link to="/chat"><Button variant="primary" onClick={handleConnectToChat}>
                    Подключиться к чату
                </Button>
                </Link>

                <Button variant="danger" className="ml-2" onClick={handleLogout}>
                    Выйти
                </Button>
            </Form>
        </div>
    );
});

export default Home;
