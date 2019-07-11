import React from 'react';
import store from '../store/store';
import {Link,Redirect} from 'react-router-dom';
export default class Head extends React.Component
{
    constructor(props)
    {
        super(props);
        let x=store.getState();
        this.state={
            emailId:x.emailId,
            loggedIn:x.loggedIn
        }
    }
    logout=()=>
    {
        store.dispatch({type:'LOG_OUT'});
    }
    render()
    {
        return this.state.loggedIn?(
        <div className='topp'>
            <div className='mark'><marquee>Welcome, {this.state.emailId}</marquee></div>
            <div className='pull-left logo' ><i class="fa fa-btc" aria-hidden="true"></i></div>
            <div className='pull-right'>
                <Link to='/login'><button onClick={()=>{this.logout()}} className='btn btn-dark btm'>Log Out</button></Link>
            </div>
        </div>):<Redirect to='/login'></Redirect>;
    }
} 