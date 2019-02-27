import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';
import home from "@/pageF/home/home";
const record = asyncComponent(() => import("@/pageF/record/record"));
const helpcenter = asyncComponent(() => import("@/pageF/helpcenter/helpcenter"));
const production = asyncComponent(() => import("@/pageF/production/production"));
const balance = asyncComponent(() => import("@/pageF/balance/balance"));
export default class RouteConfig extends Component{
    render(){
      return(
        <HashRouter>
          <Switch>
            <Route path="/" exact component={home} />
            <Route path="/record" component={record} />
            <Route path="/helpcenter" component={helpcenter} />
            <Route path="/production" component={production} />
            <Route path="/balance" component={balance} />
            <Redirect to="/" />
          </Switch>
        </HashRouter>
      )
    }
  }