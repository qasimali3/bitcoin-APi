import React from 'react';
import getfeed from '../services/feeds';
import Head from './head';
import {Link} from 'react-router-dom';
export default class UserFeed extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={
            isLoading:true,
            loadingError:'',
            time:{},
            disclaimer:{},
            bpi:{}
        }
    }
    componentDidMount()
    {
        getfeed().then(
            (res)=>{
                let x=this.state;
                x.bpi=res.data.bpi;
                x.time=res.data.time;
                x.disclaimer=res.data.disclaimer
                x.isLoading=false;
                x.loadingError='';
                this.setState({x});
            },(err)=>{
                let x=this.state;
                x.loadingError="Error !! Can't Load."
                x.isLoading=false;
                this.setState({x});
            }
        )
    }
    render()
    {

        if(this.state.isLoading)
        {
            return <React.Fragment><div className='spinner-border text-muted spi '></div></React.Fragment>
        }
        return(
            <div>
                <Head></Head>
                <table className=' tb table table-dark table-striped table-hover'>
                    <thead>
                        <tr className='text-center'>
                            <td colSpan='2'>
                            <div className='typv'> 1 BITCOIN EQUALS </div>
                            <div className='pull-right'><Link to='/bitcoin/undefined'><button className='btn btn-success'>Check for Currency</button></Link></div>
                            </td>
                        </tr>
                        <tr>
                        <th className='text-center'>
                            Currency 
                        </th>
                        <th className='text-center'>
                            Rate 
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td className='text-center'>
                            {this.state.bpi["USD"]["code"]}
                        </td>
                        <td className='text-center'>
                        &#36; {this.state.bpi["USD"]["rate"]}
                        </td>
                        </tr>
                        <tr>
                        <td className='text-center'>
                            {this.state.bpi["GBP"]["code"]}
                        </td>
                        <td className='text-center'>
                        &pound; {this.state.bpi["GBP"]["rate"]}
                        </td>
                        </tr>
                        <tr>
                        <td className='text-center'>
                        {this.state.bpi["EUR"]["code"]}
                        </td>
                        <td className='text-center'>
                        &#8364; {this.state.bpi["EUR"]["rate"]}
                        </td>
                        </tr>
                        <tr>
                            <td colSpan='2' className='disc text-muted text-center bg-secondry'>
                                
                                *Disclaimer: {this.state.disclaimer}
                                <br/>
                                <p className='text-center'>Time updated:{this.state.time.updated} | Time updated ISO:{this.state.time.updatedISO} |
                                 Time updated UK:{this.state.time.updateduk} </p>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        )

    }
}