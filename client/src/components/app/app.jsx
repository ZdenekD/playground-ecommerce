import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from '../../helpers/privateRoute';
import AdminRoute from '../../helpers/adminRoute';
import Admin from '../admin';
import Homepage from '../homepage';
import Shop from '../shop';
import Dashboard from '../dashboard';
import SignUp from '../user/signup';
import SignIn from '../user/signin';
import CategoryCreate from '../admin/category/create';
import ProductCreate from '../admin/product/create';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/'>
                <Homepage />
            </Route>
            <Route exact path='/shop'>
                <Shop />
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
            <AdminRoute exact path='/create/category'>
                <CategoryCreate />
            </AdminRoute>
            <AdminRoute exact path='/create/product'>
                <ProductCreate />
            </AdminRoute>
        </Switch>
    </BrowserRouter>
);

export default App;
