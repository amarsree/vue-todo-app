import {createWebHistory, createRouter} from "vue-router";

import Home from '../pages/Home';
import About from '../pages/About';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import Todos from '../components/Todos';
import AddTodo from '../components/AddTodo';
import EditTodo from '../components/EditTodo'; 

export const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'about',
        path: '/about',
        component: About
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'todos',
        path: '/todos',
        component: Todos
    },
    {
        name: 'addtodo',
        path: '/todos/add',
        component: AddTodo
    },
    {
        name: 'edittodo',
        path: '/todos/edit/:id',
        component: EditTodo
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
