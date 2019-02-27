import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from './home/App.js';
import Detail from './detail/detail';


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/detail" component={Detail}/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;