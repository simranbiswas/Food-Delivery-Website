import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { PieChart } from 'react-minimal-pie-chart';

const Homepage = (props) => {

    const res = useSelector((state) => state.res);
    const cuisine = useSelector((state) => state.res.cuisine);
    
    return (
        <div>
           <div className="sidebar">
                <a class="active" href="/">Home</a>
                <a href="/orders">Orders</a>
                <a href="/res">About</a>
            </div>
            <div className="content">
                    <div className="col-12"><br/>
                     <div className="row">
                        <h3 style={{'font-style':'bold'}}>Welcome to Admin Dashboard!</h3>
                    </div>
                    <div className="row ">
                        <div className="col-md-6 sect">                           
                            <div className="row justify-content-center">
                                <h4 id="head">This week's revenue</h4>
                            </div>
                            <div className="row justify-content-center">
                                <h3 id="mon">&#8377; {res.week}</h3>
                            </div>
                        </div>
                        <div className="col-md-6 sect">                           
                            <div className="row justify-content-center">
                                <h4 id="head">This month's revenue</h4>
                            </div>
                            <div className="row justify-content-center">
                                <h3 id="mon">&#8377; {res.month}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <h4 id="head"><br/>Your food items price chart</h4>
                    </div>
                    <div className="row">
                        <div className="col-4 offset-4">
                            {useState.cuisine.map(Data=>(
                                    <PieChart
                                        data={[
                                            { title: {name}, value: {price}}
                                        ]}
                                        paddingAngle={5} 
                                    />
                            ))}

                            
                        </div>
                        <div className="col ml-auto text-left">
                            <h4><span className="dot1"></span>&nbsp;{Data.name}</h4>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage