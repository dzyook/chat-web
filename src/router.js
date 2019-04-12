import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import chat from './routes/chat/chat';
import Login from './routes/login/login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/Chat" component={chat} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/" component={Login} />
      </Switch>
      
    </Router>
  );
}

export default RouterConfig;
