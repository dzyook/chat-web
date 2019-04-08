import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import chat from './routes/chat/chat';
import Login from './routes/login/login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/Chat" component={chat} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
