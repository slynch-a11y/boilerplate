import React from 'react';
import {Provider} from 'react-redux';
import {HashRouter, Switch, Route} from 'react-router-dom'

import store from '../store';

const Foo = () => (<div>foo</div>);
const Bar = () => (<div>bar</div>);
const Home = () => (<div>home</div>);

const Main = () => (
  <Provider store={store}>
  <HashRouter>
    <Switch>
    <Route exact path='/the-foo' component={Foo} />
    <Route exact path='/the-bar' component={Bar} />
    <Route exact path='/' component={Home} />
    </Switch>
    </HashRouter>
    </Provider>

);

export default Main;
