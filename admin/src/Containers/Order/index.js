import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

const Order = (props) => {
    const order = useSelector((state) => state.order);
    const [type, setType] = useState("");
    const dispatch = useDispatch();

    const onOrderUpdate = (orderId) => {
        const payload = {
        orderId,
        type,
        };
        dispatch(updateOrder(payload));
    };
    return (
        <div>
            <div className="sidebar">
                <a href="/">Home</a>
                <a class="active" href="/orders">Orders</a>
                <a href="/res">About</a>
            </div>
            <div className="content">
                <div className="row justify-contnent-center">
                    <h2><br/>Your Orders</h2>
                </div>
                <div className="row justify-contnent-center"><br/>
                    <div className="col-6"><br/>
                        <table class="table">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">order_id</th>
                            <th scope="col">food_id</th>
                            <th scope="col">user</th>
                            <th scope="col">Food_name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Address</th>
                            <th scope="col">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>{order._id}</td>
                            <td>{order.food_id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.food_name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.user_name}</td>
                            <td>{order.location}</td>
                            <td>{order.price}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Order