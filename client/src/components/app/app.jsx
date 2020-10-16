import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from '../../helpers/privateRoute';
import AdminRoute from '../../helpers/adminRoute';
import Admin from '../admin';
import Homepage from '../homepage';
import Shop from '../shop';
import Cart from '../cart';
import Dashboard from '../dashboard';
import Detail from '../detail';
import SignUp from '../user/signup';
import SignIn from '../user/signin';
import CategoryCreate from '../admin/category/create';
import ProductCreate from '../admin/product/create';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/shop' component={Shop} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/product/:productId' component={Detail} />
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
