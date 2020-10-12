import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from '../homepage';
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
        </Switch>
    </BrowserRouter>
);

export default App;
