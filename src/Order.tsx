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
                <div className="order_table">
                    {
                        orderData?.message?.orderItems?.map((groupedItems, index) => 
                            (
                                <div className="order_info_status" key={index} >
                                    <div className="order_status">
                                        <p>{(groupedItems.paymentInfo.time.split("T")[1]).split(".")[0]}</p>
                                        <p>{groupedItems.paymentInfo.time.split("T")[0]}</p>
                                        <p style={{padding:"5px", borderRadius:"4px", color:groupedItems.paymentInfo.status === "succeeded" ? "green" : "red", background:groupedItems.paymentInfo.status === "succeeded" ? "#d5ffd5" : "#ffd5d5"}}>{groupedItems.paymentInfo.status}</p>
                                    </div>
                                    {groupedItems.productGrouped.map((i, ind) => (
                                            <div className="order_info" key={ind}>
                                                <img src={i.product.photo} alt="no photo" />
                                                 
                                                <p>{i.product.name}</p>
                                                
                                                <p>{i.quantity} x</p>
                                                
                                                <p>{i.product.price}/- ₹</p>
                                                
                                            </div>
                                    ))}
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </>
    )
};


export default Order;