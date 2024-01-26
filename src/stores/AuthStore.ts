import { makeAutoObservable } from 'mobx';

class AuthStore {
    isLoggedIn = false;
    username = '';
    gender = '';
    displayName = '';
    isRegisterMode = false;

    constructor() {
        makeAutoObservable(this);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            this.isLoggedIn = true;
            this.username = parsedUser.username;
            this.gender = parsedUser.gender || '';
            this.displayName = parsedUser.displayName || '';
        }
    }

    login(username: string, password: string) {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            const users = JSON.parse(storedUsers);

            const foundUser = users.find(
                (user: { username: string; password: string }) =>
                    user.username === username && user.password === password
            );

            if (foundUser) {
                this.isLoggedIn = true;
                this.username = username;
                this.gender = foundUser.gender || '';
                this.displayName = foundUser.displayName || '';
                console.log('Пользователь вошел:', { username, password });
                return true;
            }
        }

        console.log('Пользователь не найден. Зарегистрируйтесь');
        return false;
    }

    register(username: string, password: string, gender: string, displayName: string) {
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const userExists = users.some((user: { username: string }) => user.username === username);

        if (userExists) {
            console.log('Такой пользователь существует. Выберите другой никнейм');
            return;
        }

        const newUser = { username, password, gender, displayName };
        users.push(newUser);

        localStorage.setItem('users', JSON.stringify(users));

        this.isLoggedIn = true;
        this.username = username;
        this.gender = gender;
        this.displayName = displayName;

        console.log('Пользователь', { username, password, gender, displayName });
    }

    logout() {
        this.isLoggedIn = false;
        this.username = '';
        this.gender = '';
        this.displayName = '';
        this.isRegisterMode = false;

        console.log('Пользователь вышел');
    }

    toggleRegisterMode() {
        this.isRegisterMode = !this.isRegisterMode;
    }

    userExists(username: string) {
        const storedUser = localStorage.getItem('user');
        return storedUser && JSON.parse(storedUser).username === username;
    }
}

const authStore = new AuthStore();
export default authStore;
