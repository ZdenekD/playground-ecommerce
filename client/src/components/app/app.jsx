import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from '../../helpers/privateRoute';
import AdminRoute from '../../helpers/adminRoute';
import Admin from '../admin';
import Homepage from '../homepage';
import Dashboard from '../dashboard';
import SignUp from '../user/signup';
import SignIn from '../user/signin';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route exact path='/signin'>
                <SignIn />
            </Route>
            <Route exact path='/signup'>
                <SignUp />
            </Route>
            <PrivateRoute exact path='/user/dashboard'>
                <Dashboard />
            </PrivateRoute>
            <AdminRoute exact path='/admin/dashboard'>
                <Admin />
            </AdminRoute>
        </Switch>
    </BrowserRouter>
);

export default App;
