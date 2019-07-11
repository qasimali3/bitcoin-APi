import React from 'react';
import axios from 'axios';
import {withRouter,Link,Redirect} from 'react-router-dom';
import store from '../store/store';
import Head from './head'


const COUNTRY_API='https://api.coindesk.com/v1/bpi/supported-currencies.json';
const RATE_API='https://api.coindesk.com/v1/bpi/currentprice/';
const CORS='https://cors-anywhere.herokuapp.com/';
class CurrentPrice extends React.Component
{
    constructor(props)
    {
        super(props);        
        this.state={
            isLoading:false,
            error:'',
            countryData:[],
            currency:'',
            country:null,
            rate:null,
            data:[],
            time:{},
            Disclaimer:'',
            loadData:false,
            loadDataError:'',
        }
    }
    currencyChange=(e)=>
    {
        let a = '/bitcoin/'+e.target.value;
        // this.setState({redirect:<Redirect to={a} render={()=><CurrentPrice currency={e.target.value}/>}/>})
        store.dispatch({type:'CHANGE_CURRENCY',payload:{currency:e.target.value}});

    }
     callRateApi = ()=>
    {
            axios.get(CORS+RATE_API+this.state.currency+'.json').then(res=>
            {
            let data=res.data.bpi[this.state.currency];
            let obj=this.state;
            obj.country=data.description;
            obj.rate=data.rate;
            obj.loadData=false;
            obj.loadDataError='';
            this.setState({obj});
            },err=>{
                let obj=this.state;
                obj.loadDataError='Can\'t Load The Data Right Now!!';});
    }
    componentDidMount()
    {
        this.callAPI();
    }
    componentWillUnmount()
    {
        this.setState({});
    }
    callAPI= async ()=>
    {
        let x = await store.getState();
        axios.get(CORS+RATE_API+x.currency+'.json').then(res=>
            {
            try
            {
            if(res!=null)
            {
            let data=res.data.bpi[this.state.currency];
            let obj=this.state;
            obj.country=data.description;
            obj.rate=data.rate;
            obj.time=res.data.time;
            obj.Disclaimer=res.data.disclaimer;
            obj.loadData=false;
            obj.loadDataError='';
            console.log(obj);
            this.setState({obj});
            }
        }catch
        {
            console.error("FAiled to load");

        }
            },err=>{
                let obj=this.state;
                obj.loadDataError='Can\'t Load The Data Right Now!!';});
        axios.get(CORS+COUNTRY_API).then((res)=>{
            this.setState({countryData:res.data,isLoading:false});
        },(error)=>{console.log(error);
        this.setState({error:"Failed to Load",isLoading:false});

    })

    }
    render()
    {
        store.subscribe(
            ()=>{
                let x = this.state;
                x.currency=store.getState().currency;
                x.redirect='rd';
                this.setState({x});
                this.callAPI();
            }
        )
        // if(this.state.redirect) return this.state.redirect;
        return (<React.Fragment>
                <Head></Head>
                <div className='container-fluid'>  
                    <div className='row'>
                        <div className='col-md-8 offset-md-2 contains'>
                          <div className='card'>
                            <div className='card-header align-item-center text-center headcard'>
                                <select className='selector' onChange={(e)=>{this.currencyChange(e);}}>
                                    <option defaultValue >Choose a country</option>
                                    {this.state.isLoading?<option>Loading...</option>:
                                    this.state.error.length>0?<option>Failed to Load</option>:
                                    this.state.countryData.map(
                                        ai=><option value={ai.currency} key={ai.currency} >{ai.symbol}{ai.country}</option>)
                                    }
                                </select>
                                {this.state.redirect!=null?<Redirect to={'/bitcoin/'+this.state.currency}></Redirect>:null}
                            </div>
                            {!this.state.loadData?
                            <div>
                            <div className='card-body text-center bdcard'>
                                <span>1 Bitcoin equals</span>
                               <h1><Link to = '/bitcoin/analytics'> {this.state.rate} {this.state.currency}</Link></h1>
                               <p className='text-muted'>Last Updated: {this.state.time.updated}</p>
                            </div>
                            <div className='card-footer ftcard text-muted'>
                                *Disclaimer:{this.state.Disclaimer}
                            </div></div>:<div class="spinner-grow text-dark"></div>}
                            </div>
                        </div>  
                        </div>
                    </div></React.Fragment>

                );
    }
}
export default CurrentPrice;