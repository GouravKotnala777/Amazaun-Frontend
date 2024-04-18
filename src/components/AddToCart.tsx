import { ChangeEvent, useState } from "react";
import "../styles/add_to_cart.scss";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Skeleton from "./Skeleton";

const AddToCart = ({productAmount, productID, reloadFunction, haveQunatityInp, hasRemoveBtn, homeCheck}:{productAmount?:number; productID?:string; reloadFunction?:()=> Promise<void>; haveQunatityInp?:boolean; hasRemoveBtn?:boolean; homeCheck?:boolean;}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [isAddBtnActive, setIsAddBtnActive] = useState<boolean>(false);
    const [isBuyBtnActive, setIsBuyBtnActive] = useState<boolean>(false);
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
            }
            if (data.success === false && data.message === "Unauthorized request") {
                navigate("/login");
            }
            console.log("-------  Home.tsx  removeFromCart");
            
        } catch (error) {
            console.log("-------  Home.tsx  removeFromCart");
            console.log(error);
            console.log("-------  Home.tsx  removeFromCart");
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
                navigate("/shipping", {state:{clientSecret:data.message, productID, quantity}})
                // <Navigate to="/shipping" />
            }
            else{
                setIsBuyBtnActive(false);
                // console.log("error a gaya");
                // navigate("/shipping", {state:data})
            }

        } catch (error) {
            console.log("------ AddToCart.tsx  buyProduct");
            console.log(error);            
            console.log("------ AddToCart.tsx  buyProduct");
            setIsBuyBtnActive(false);
        }
    };


    return(
        <>
            <div className="btn_cont">
                {
                    hasRemoveBtn &&
                        <button className="remove_btn" onClick={()=> {!isAddBtnActive&&!isBuyBtnActive&&removeFromCart()}}>Remove</button>
                }
                {
                    productID&&productAmount ?
                        <button style={{zIndex:homeCheck ? "18" : "19", background:homeCheck ? "white" : "#ff3153", transition:"0.5s"}} onClick={() => {!isAddBtnActive&&!isBuyBtnActive&&addToCart()}}>{isAddBtnActive ? <Loader size={13} borderWidth={3} color="#ff3153" /> : "Add"}</button>
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
                        <button onClick={() => {!isAddBtnActive&&!isBuyBtnActive&&buyProduct()}}>{isBuyBtnActive?<Loader size={13} borderWidth={3} color="#ff824d" /> : "Buy"}</button>
                        :
                        <Skeleton width={30} />
                }
            </div>
        </>
    )
};

export default AddToCart;