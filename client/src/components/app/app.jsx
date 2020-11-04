import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateRoute from '../../helpers/privateRoute';
import AdminRoute from '../../helpers/adminRoute';
import Admin from '../admin';
import Homepage from '../homepage';
import Shop from '../shop';
import Cart from '../cart';
import Dashboard from '../dashboard';
import Profile from '../profile';
import Detail from '../detail';
import SignUp from '../user/signup';
import SignIn from '../user/signin';
import Orders from '../admin/orders';
import CategoryCreate from '../admin/category/create';
import ProductCreate from '../admin/product/create';
import ProductUpdate from '../admin/product/update';
import ProductsManage from '../admin/products/manage';

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
            <PrivateRoute exact path='/profile/:userId'>
                <Profile />
            </PrivateRoute>
            <AdminRoute exact path='/admin/dashboard'>
                <Admin />
            </AdminRoute>
            <AdminRoute exact path='/admin/category/create'>
                <CategoryCreate />
            </AdminRoute>
            <AdminRoute exact path='/admin/product/create'>
                <ProductCreate />
            </AdminRoute>
            <AdminRoute exact path={'/admin/product/update/:productId'}>
                <ProductUpdate />
            </AdminRoute>
            <AdminRoute exact path='/admin/products/manage'>
                <ProductsManage />
            </AdminRoute>
            <AdminRoute exact path='/admin/orders'>
                <Orders />
            </AdminRoute>
        </Switch>
    </BrowserRouter>
);

export default App;
