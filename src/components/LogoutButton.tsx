// src/components/LogoutButton.tsx
import React from 'react';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import authStore from '../stores/AuthStore';

const LogoutButton: React.FC = observer(() => {
    const handleLogout = () => {
        authStore.logout();
    };

    return (
        <Button variant="danger" onClick={handleLogout}>
            Logout
        </Button>
    );
});

export default LogoutButton;
