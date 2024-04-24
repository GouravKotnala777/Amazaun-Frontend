import "./styles/order.scss";
import { useEffect, useState } from "react";

// interface SingleOrderTypes {
//     success:boolean;
//     message:{
//         _id:string;
//         orderItems:{
//             paymentInfo:{
//                 transactionID:string;
//                 status:string;
//                 time:string;
//             };
//             productGrouped:{
//                 product:{
//                     _id:string;
//                     name:string;
//                     price:number;
//                     photo:string;
//                 };
//                 quantity:number;
//                 _id:string;
//             }[];
//         }[];
//         user:string;
//     }[]
// }

interface AllOrderDataTypes {
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
        user:{
            name:string;
            email:string;
        };
    }[]
}

const AllOrders = () => {
    const [allOrderData, setAllOrderData] = useState<AllOrderDataTypes>();
    // const [selectedOrder, setSelectedOrder] = useState<SingleOrderTypes>();
    // const [isOrderDialogOpen, setIsOrderDialogOpen] = useState<boolean>(false);

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
    // const getSingleOrder = async(customerID:string, orderID:string) => {
    //     try {
    //         const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/order/${orderID}`, {
    //             method:"POST",
    //             headers:{
    //                 "Content-Type":"application/json"
    //             },
    //             credentials:"include",
    //             body:JSON.stringify({customerID, orderID})
    //         });

    //         const data = await res.json();

    //         console.log("-------  AllOrder.tx  getSingleOrder");
    //         setSelectedOrder(data);
    //         console.log(data);
    //         console.log("-------  AllOrder.tx  getSingleOrder");
            
    //     } catch (error) {
    //         console.log("-------  AllOrder.tx  getSingleOrder");
    //         console.log(error);
    //         console.log("-------  AllOrder.tx  getSingleOrder");
    //     }
    // };


    useEffect(() => {
        getAllOrders();
    }, []);

    return(
        <>
            {/* <pre>{JSON.stringify(allOrderData, null, `\t`)}</pre> */}
            <div className="orders_cont">

                {/* <dialog className="order_dialog" open={isOrderDialogOpen}>
                    <button className="order_dialog_close_btn" onClick={() => setIsOrderDialogOpen(false)}>X</button>
                    <div className="image_cont">
                        <img src={selectedOrder?.message.product.photo} alt={selectedOrder?.message.product.photo.split("/Products/")[1]} />
                    </div>
                    <div className="details_cont">
                        <div className="detail_cont">
                            <div className="detail_heading">Message :-</div>
                            <div className="detail_value">{selectedOrder?.message.paymentInfo.message}</div>
                        </div>
                    </div>
                </dialog> */}

                <table className="order_table">
                    {
                        allOrderData?.message?.map((customer) => 
                            (
                                
                                customer.orderItems.map((order, orderIndex) => 
                                    (
                                        <tbody className="order_cont" key={orderIndex}>
                                            {
                                                order.productGrouped.map((i, ii) => (
                                                    <div key={ii}>
                                                        <td>
                                                            <img src={i.product.photo} alt="no photo" />
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
                                                            <p>{customer.user.name}</p>
                                                        </td>
                                                        <td>
                                                            <p>{customer.user.email}</p>
                                                        </td>
                                                    </div>
                                                ))
                                            }
                                            <td>
                                                <p>{(order.paymentInfo.time.split("T")[1]).split(".")[0]}</p>
                                            </td>
                                            <td>
                                                <p>{order.paymentInfo.time.split("T")[0]}</p>
                                            </td>
                                            <td>
                                                <p style={{padding:"5px", borderRadius:"4px", color:order.paymentInfo.status === "succeeded" ? "green" : "red", background:order.paymentInfo.status === "succeeded" ? "#d5ffd5" : "#ffd5d5"}}>{order.paymentInfo.status}</p>
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