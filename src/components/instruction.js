import React from 'react';
import {Link} from 'react-router-dom'
import store from '../store/store';
import {Redirect} from 'react-router-dom';
export default class Instructions extends React.Component
{
    constructor()
    {
        super();
        let x= store.getState();
        this.state={
            red:x.loggedIn
        }
    }

    render()
    {
        let li=[];
        for(let i=1;i<20;i++)
        {
            li.push(<li key={i}>This is Dummy Text # {i} This is Dummy Text # {i}
            This is Dummy Text # {i} This is Dummy Text # {i}
            This is Dummy Text # {i} This is Dummy Text # {i}
            This is Dummy Text # {i} This is Dummy Text # {i}
            This is Dummy Text # {i} This is Dummy Text # {i} </li>);
        }
        // console.log(store.getState());
        store.subscribe(()=>{let x=store.getState();
        if(x.loggedIn===false)
    {
        return <Redirect to = '/login'></Redirect>
    }});
        return this.state.red?(<React.Fragment>
            <div className=' row'>
            <div className='offset-md-2 col-md-8 '>
            <div className='card instr'>
            <div className='card-header instrheadcard'>
            <h2>INSTRUCTIONS</h2>
            </div>
            <div className='card-body instrbodycard'>
            <ul>{li}</ul>
            </div>
            <div className='card-footer instrfoot'>
            <Link to='/userFeed'><button className='btn btn-primary pull-right cus'>Get Started <i class="fa fa-arrow-right"></i></button></Link>
            </div>
            </div>
            </div>
            </div>
            </React.Fragment>):<Redirect to='/login'></Redirect>
    }
}