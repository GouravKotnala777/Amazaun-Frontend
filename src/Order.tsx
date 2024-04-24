import "./styles/order.scss";
import { useEffect, useState } from "react";

interface OrderDataTypes {
    success:boolean;
    message:{
        _id:string;
        orderItems:{
            paymentInfo:{
                transactionID:string;
                status:string;
                time:string;
            };
            productGrouped:{
                product:{
                    _id:string;
                    name:string;
                    price:number;
                    photo:string;
                };
                quantity:number;
                _id:string;
            }[];
        }[];
        user:string;
    }
}

const Order = () => {
    const [orderData, setOrderData] = useState<OrderDataTypes>();

    const getMyOrders = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/order`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            console.log("-------  Order.tx  getMyOrders");
            setOrderData(data);
            console.log(data);
            console.log("-------  Order.tx  getMyOrders");
            
        } catch (error) {
            console.log("-------  Order.tx  getMyOrders");
            console.log(error);
            console.log("-------  Order.tx  getMyOrders");
        }
    };

    useEffect(() => {
        getMyOrders();
    }, []);

    return(
        <>
            {/* <pre>{JSON.stringify(orderData, null, `\t`)}</pre> */}
            <div className="orders_cont">
                <table className="order_table">
                    {/* <th>
                        <p>Index</p>
                    </th> 
                    <th>
                        <p>Img</p>
                    </th>
                    <th>
                        <p>Name</p>
                    </th>
                    <th>
                        <p>Quantity</p>
                    </th> 
                    <th>
                        <p>Price</p>
                    </th>
                    <th>
                        <p>Time</p>
                    </th>
                    <th>
                        <p>Date</p>
                    </th>
                    <th>
                        <p>Status</p>
                    </th> */}
                    {
                        orderData?.message?.orderItems?.map((groupedItems, index) => 
                            (
                                // <tbody className="order_cont" key={index} onClick={() => getSingleOrder(order._id)}>
                                <tbody className="order_cont" key={index} >
                                    
                                    {groupedItems.productGrouped.map((i, ind) => (
                                            <div key={ind}>
                                                <td>
                                                    <img src={i.product.photo} alt="no photo" />
                                                </td>
                                                <td>
                                                    <p>{index+1}</p>
                                                </td> 
                                                <td>
                                                    <p>{i.product.name}</p>
                                                </td>
                                                <td>
                                                    <p>{i.quantity}</p>
                                                </td>
                                                <td>
                                                    <p>{i.product.price}</p>
                                                </td>
                                                <td>
                                                    <p>{(groupedItems.paymentInfo.time.split("T")[1]).split(".")[0]}</p>
                                                </td>
                                                <td>
                                                    <p>{groupedItems.paymentInfo.time.split("T")[0]}</p>
                                                </td>
                                            </div>
                                    ))}
                                    {/* 
                                     */}
                                    <td>
                                        {/* <p style={{padding:"5px", borderRadius:"4px", color:order.paymentInfo.status === "succeeded" ? "green" : "red", background:order.paymentInfo.status === "succeeded" ? "#d5ffd5" : "#ffd5d5"}}>{order.paymentInfo.status}</p> */}
                                    </td>
                                </tbody>
                            )
                        )
                    }
                </table>
            </div>
        </>
    )
};


export default Order;