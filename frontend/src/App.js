import React from 'react';
import {indexRoutes} from './routes/';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import Users from './views/Users/User';
import Login from './views/Users/login';
import Register from './views/Users/register';
import Adminuser from './views/Users/Adminuser';
import AddTodo from './views/Users/add_todo';

const App = () => (
    <Provider store={configureStore()}>
        <Router>
            <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/user" component={Users} />           
            <Route exact path="/register" component={Register}/>
            <Route exact path ="/adminuser" component ={Adminuser}/>
            <Route exact path= "/todo/userid/:id" component= {AddTodo}/>
            {/* <Route exact path="/Editclass/:param1" component={Editclass} /> */}
            </div>
        </Router>
    </Provider>
);
// const App = () => (
//     <Provider store={configureStore()}>
//         <Router basename="/">
//             <Switch>
//                 {
//                     indexRoutes.map((prop, key) => {
//                         return <Route path={prop.path} key={key} component={prop.component} />;
//                     })
//                 }
//             </Switch>
//         </Router>
//     </Provider>
// );


export default App;