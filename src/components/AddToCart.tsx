import { ChangeEvent, useState } from "react";
import "../styles/add_to_cart.scss";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Skeleton from "./Skeleton";
import toast, { Toaster } from "react-hot-toast";
import { InitialStateType } from "../redux/reducers/userReducer";
import { useSelector } from "react-redux";

const AddToCart = ({productAmount, productID, reloadFunction, haveQunatityInp, hasRemoveBtn, homeCheck}:{productAmount?:number; productID?:string; reloadFunction?:()=> Promise<void>; haveQunatityInp?:boolean; hasRemoveBtn?:boolean; homeCheck?:boolean;}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [isAddBtnActive, setIsAddBtnActive] = useState<boolean>(false);
    const [isBuyBtnActive, setIsBuyBtnActive] = useState<boolean>(false);
    const {payload} = useSelector((state:{userReducer:InitialStateType}) => state.userReducer);
    const navigate = useNavigate();


    const quantityHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(e.target.value));
    };


    const addToCart = async() => {
        try {
            setIsAddBtnActive(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/cart/add`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({quantity:Number(quantity), productID:productID&&productID})
            });
    
            const data = await res.json();
    
            console.log("-------  Home.tsx  addToCart");
            console.log(data);
            
            if (data.success) {
                reloadFunction&&reloadFunction();
                toast.success("Added to cart", {
                    duration:2000,
                    position:"bottom-center"
                })
            }
            if (data.success === false && data.message === "Unauthorized request") {
                navigate("/login");
            }
            console.log("-------  Home.tsx  addToCart");
            setIsAddBtnActive(false);
            
        } catch (error) {
            console.log("-------  Home.tsx  addToCart");
            console.log(error);
            console.log("-------  Home.tsx  addToCart");
            setIsAddBtnActive(false);
            toast.error("Error Occured", {
                duration:2000,
                position:"bottom-center"
            })
        }
        
    }
    const removeFromCart = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/cart/remove`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({quantity:Number(quantity), productID})
            });
    
            const data = await res.json();
    
            console.log("-------  Home.tsx  removeFromCart");
            console.log(data);
            if (data.success) {
                reloadFunction&&reloadFunction();
                toast.success("Removed from cart", {
                    duration:2000,
                    position:"bottom-center"
                })
            }
            if (data.success === false && data.message === "Unauthorized request") {
                navigate("/login");
            }
            console.log("-------  Home.tsx  removeFromCart");
            
        } catch (error) {
            console.log("-------  Home.tsx  removeFromCart");
            console.log(error);
            console.log("-------  Home.tsx  removeFromCart");
            toast.error("Error Occured", {
                duration:2000,
                position:"bottom-center"
            })
        }
        
    }
    const buyProduct = async() => {
        try {
            setIsBuyBtnActive(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/payment/new`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({amount:productAmount&&productAmount})
            });

            const data = await res.json();

            console.log("------ AddToCart.tsx  buyProduct");
            console.log(data);
            console.log("------ AddToCart.tsx  buyProduct");

            if (data.success) {
                setIsBuyBtnActive(false);
                navigate("/shipping", {state:{clientSecret:data.message, checkoutAllData:[{product:productID, quantity}]}});
            }
            else{
                setIsBuyBtnActive(false);
                toast.error(data.message, {
                    duration:2000,
                    position:"bottom-center"
                })
            }

        } catch (error) {
            console.log("------ AddToCart.tsx  buyProduct");
            console.log(error);            
            console.log("------ AddToCart.tsx  buyProduct");
            setIsBuyBtnActive(false);
            toast.error("Error Occured", {
                duration:2000,
                position:"bottom-center"
            })
        }
    };


    return(
        <>
            <Toaster />
            <div className="btn_cont">
                {
                    hasRemoveBtn &&
                        <button className="remove_btn" onClick={()=> {payload?._id ? (!isAddBtnActive&&!isBuyBtnActive&&removeFromCart()) : navigate("/login")}}>Remove</button>
                }
                {
                    productID&&productAmount ?
                        <button style={{zIndex:homeCheck ? "18" : "19", background:homeCheck ? "white" : "#ff3153", transition:"0.5s"}} onClick={() => {payload?._id ? (!isAddBtnActive&&!isBuyBtnActive&&addToCart()) : navigate("/login")}}>{isAddBtnActive ? <Loader size={13} borderWidth={3} color="#ff3153" /> : "Add"}</button>
                        :
                        <Skeleton width={30} />
                }

                {
                    haveQunatityInp &&
                        <select name="quantity" onChange={quantityHandler} value={quantity}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                }
                {
                    productID&&productAmount ?
                        <button onClick={() => {payload?._id ? (!isAddBtnActive&&!isBuyBtnActive&&buyProduct()) : navigate("/login")}}>{isBuyBtnActive?<Loader size={13} borderWidth={3} color="#ff824d" /> : "Buy"}</button>
                        :
                        <Skeleton width={30} />
                }
            </div>
        </>
    )
};

export default AddToCart;