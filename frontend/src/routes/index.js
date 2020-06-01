
import react,{useReducer} from 'react';
import Users from '../views/Users/User';
import Login from '../views/Users/login';
import Register from '../views/Users/register';
import AddTodo from '../views/Users/add_todo';

export const indexRoutes = [
    { path: "/", exact:true, name: "login", component: Login },
    { path: "/user", name: "users", component: Users },    
    { path: "/register", name: "register", component: Register },
    { path: "/todo/userid/:id", name: "ToDo",component: AddTodo}
   

];


