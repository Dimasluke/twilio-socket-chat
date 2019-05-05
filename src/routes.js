import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Chat from './Components/Chat';

export default (
    <Switch>
        <Route exact path='/chat' component={Chat} />
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={Login} />
    </Switch>
)