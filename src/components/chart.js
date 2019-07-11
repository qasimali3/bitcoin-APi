import React from 'react';
import Head from './head';
import store from '../store/store';
import {Link} from 'react-router-dom';
import getHistory from '../services/historical';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default class Analytics extends React.Component
{
    constructor()
    {
        super();
        let x = store.getState();
        this.state={
            currency: x.currency,
            isLoading:true,
            data:{},
            disclaimer:'',
            time:'',
            processed:[]
        }
    }
    componentDidMount ()
    {
        getHistory().then(
            (res)=>{
                if(res){
                    try{
                        let y = this.state;
                        y.data= res.data.bpi;
                        y.disclaimer= res.data.disclaimer;
                        y.time=res.data.time.updated;
                        y.isLoading=false;
                        this.setState({y});
                        this.sortData();
                    }
                    catch{
                        console.error("ERRRORR!!!");
                    }
                }
            },(err)=>{
                console.log("eRROr");
            }
        )
    }
    sortData=()=>
    {
        let x=this.state.data;
        let processed=[];
        for(let k in x)
        {
            let d = new Date(k);
            let v = parseFloat(x[k]);
            processed.push({'Date':d,'Rate':v});
        }
        let y =  this.state;
        y.processed=processed;
        this.setState({y});
    }

    render()
    {
        return this.state.isLoading?(<div className='spi spinner-border text-muted'></div>):(
            <div className='text-muted'>
            <Link to={'/bitcoin/undefined'}><div className='pull-right back'>+</div></Link>
                <div className='canvas'>
                <Head></Head>
                    <div className='text-center'>
                        <div className='topan'>
                        <h2 className='txt'>Analytics</h2>
                        </div>
                    </div>
                    <div className='canva-body'>
                    <LineChart width={800} height={500}  data={this.state.processed} margin={{ top: 50, right: 20, bottom: 5, left: 20 }}>
                        <Line type="monotone" dataKey={"Rate"} stroke="#009999" />
                                <XAxis dataKey="Date"/>
                                <YAxis />
                                <Tooltip />
                    </LineChart> 
                    <div className='footer'>
                        <p className='text-primary'>Graph for last month, rate in [{this.state.currency}]</p>
                        <p className='text-muted'>Last Updated:{this.state.time}</p>
                        <p className='text-muted'>*Disclaimer:{this.state.disclaimer}</p>                        
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}