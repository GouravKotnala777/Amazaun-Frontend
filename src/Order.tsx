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
                data:string;
            };
            product:{
                _id:string;
                name:string;
                price:number;
                photo:string;
            };
            quantity:number;
            _id:string;
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
                    {
                        orderData?.message?.orderItems?.map((order, index) => 
                            (
                                <tbody className="order_cont" key={index}>
                                    <td>
                                        <p>{index+1}</p>
                                    </td> 
                                    <td>
                                        <img src={order.product.photo} alt="no photo" />
                                    </td>
                                    <td>
                                        <p>{order.product.name}</p>
                                    </td>
                                    <td>
                                        <p>{order.quantity}</p>
                                    </td> 
                                    <td>
                                        <p>{order.product.price} ₹</p>
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