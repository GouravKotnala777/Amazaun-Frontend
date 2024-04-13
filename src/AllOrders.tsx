import "./styles/order.scss";
import { useEffect, useState } from "react";

interface AllOrderDataTypes {
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
        user:{
            _id:string;
            name:string;
            email:string;
        };
    }[]
}

const AllOrders = () => {
    const [allOrderData, setAllOrderData] = useState<AllOrderDataTypes>();

    const getAllOrders = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/order/all`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            console.log("-------  Order.tx  getAllOrders");
            setAllOrderData(data);
            console.log(data);
            console.log("-------  Order.tx  getAllOrders");
            
        } catch (error) {
            console.log("-------  Order.tx  getAllOrders");
            console.log(error);
            console.log("-------  Order.tx  getAllOrders");
        }
    };


    useEffect(() => {
        getAllOrders();
    }, []);

    return(
        <>
            {/* <pre>{JSON.stringify(allOrderData, null, `\t`)}</pre> */}
            <div className="orders_cont">
                <table className="order_table">
                    <th>Img</th><th>Name</th><th>Quantity</th><th>Price</th><th>Customer Name</th><th>Customer Email</th>
                    {
                        allOrderData?.message?.map((customer) => 
                            (
                                
                                customer.orderItems.map((order) => 
                                    (
                                        <tbody className="order_cont" key={order._id}>
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
                                                <p>{order.product.price}</p>
                                            </td> 
                                            <td>
                                                <p>{customer.user.name}</p>
                                            </td> 
                                            <td>
                                                <p>{customer.user.email}</p>
                                            </td> 
                                        </tbody>
                                    )
                                )
                            )
                        )
                    }
                </table>
            </div>
        </>
    )
};


export default AllOrders;