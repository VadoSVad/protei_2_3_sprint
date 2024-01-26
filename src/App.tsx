import React from 'react';
import './App.css';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import { observer } from 'mobx-react-lite';
import ChatForm from "./components/ChatForm";


const App: React.FC = observer(() => {

        const [isDarkTheme, setIsDarkTheme] = useState(false);

        const toggleTheme = () => {
            setIsDarkTheme(!isDarkTheme);
        };

    return (
        <div className={isDarkTheme ? 'darkly-theme' : ''}>
        <Router>
            <Container className="mt-5">
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/chat" element={<ChatForm />} />
                </Routes>
            </Container>
        </Router>
        </div>
    );
});

export default App;
