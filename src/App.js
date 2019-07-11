import React from 'react';
import './App.css';
import Show from './components/showCurrent';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import store from './store/store';
import {Provider} from 'react-redux';
import Login from './components/login';
import Instruction from './components/instruction';
import UserFeed from './components/userFeeds';
import Chart from './components/chart';
class App extends React.Component
{
  render()
  {
    return (
      <Provider store={store}>
            <BrowserRouter >
            <Switch>
              <Route path='/userFeed' component={UserFeed}></Route>
              <Route path='/bitcoin/analytics' component={Chart}></Route>
              <Route path='/bitcoin/:currency' component={Show}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/instructions' component={Instruction}></Route>
              <Route path='/' component={Login}></Route>
              </Switch>
            </BrowserRouter>
      </Provider>);
  }
}
export default App;
