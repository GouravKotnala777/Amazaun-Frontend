import { useEffect, useState } from "react";
import "../styles/cart.scss";
// import img from "/logo192.png";
// import AddToCart from "./AddToCart";
import NotFound from "./NotFound";
import { BiInfoCircle } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import ProductContainer from "./ProductContainer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";


interface ProductTypes {
    _id: string;
    productType: string;
    name: string;
    price: number;
    stock: number;
    photo: string;
}

export interface CartItemsTypes {
    product : ProductTypes;
    quantity : number;
    _id : string;
    included:boolean;
}

interface CartProductTypes {
    cartItems : CartItemsTypes[];
    user : string;
    paymentInfo : {
            status : string;
    }
}


const Cart = ({homeCheck}:{homeCheck:boolean;}) => {
    const [cartData, setCartData] = useState<CartProductTypes>();
    const [cartItems, setCartItems] = useState<CartItemsTypes[]>();
    const [allProductsTotalAmount, setAllProductsTotalAmount] = useState<number>(0);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    // const [quantity, setQuantity] = useState<number>(1);
    const [isBuyAllBtnActive, setIsBuyAllBtnActive] = useState<boolean>(false);
    const [checkoutAllData, setCheckoutAllData] = useState<{product:string; quantity:number;}[]>();
    const navigate = useNavigate();


    const getMyCartProducts = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/cart/mycart`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data:{success:boolean; message:CartProductTypes} = await res.json();
            console.log("-------  Cart.tsx  getMyCartProducts");
            const cartItemsA:CartItemsTypes[] = [];
            console.log(data.message);
            if (data.success) {
                setCartData(data.message);
                data.message.cartItems.forEach((product) => {
                    cartItemsA?.push({...product, included:true});
                });
                totalAmountCalculatorA(data.message);
            }
            if (cartData) {
                setCartData({...cartData, cartItems:cartItemsA} as CartProductTypes);
            }
            console.log("-------  Cart.tsx  getMyCartProducts");
        } catch (error) {
            console.log("-------  Cart.tsx  getMyCartProducts");
            console.log(error);
            console.log("-------  Cart.tsx  getMyCartProducts");
        }
    };

    const totalAmountCalculator = (data:CartProductTypes) => {        
        const cartItemsA:CartItemsTypes[] = [];
        const checkoutAllDataA:{product:string; quantity:number;}[] = [];
        let aaaaa:number = 0;
        data.cartItems.forEach((product, index) => {
            const includeCheckbox = document.getElementById(`include_checkbox${index}`) as HTMLInputElement;
            if (includeCheckbox?.checked) {
                aaaaa += product.product.price*product.quantity;
                cartItemsA.push({...product, included:true});
                checkoutAllDataA.push({product:product.product._id, quantity:product.quantity});
            }
            else{
                // cartItemsA.push({...product, included:false});
            }
        });
        setAllProductsTotalAmount(aaaaa);
        setCartItems(cartItemsA);
        setCheckoutAllData(checkoutAllDataA);
    };
    const totalAmountCalculatorA = (data:CartProductTypes) => {
        const cartItemsA:CartItemsTypes[] = [];
        const checkoutAllDataA:{product:string; quantity:number;}[] = [];
        let aaaaa:number = 0;
        data.cartItems.forEach((product, index) => {
            const includeCheckbox = document.getElementById(`include_checkbox${index}`) as HTMLInputElement;
            includeCheckbox?.setAttribute("checked", "true");
            if (includeCheckbox?.checked) {
                aaaaa += product.product.price*product.quantity;
                cartItemsA.push({...product, included:true});
                checkoutAllDataA.push({product:product.product._id, quantity:product.quantity});
            }
            else{
                cartItemsA.push({...product, included:false});
                checkoutAllDataA.push({product:product.product._id, quantity:product.quantity});
            }
        });
        
        setAllProductsTotalAmount(aaaaa);        
        setCartItems(cartItemsA);
        setCheckoutAllData(checkoutAllDataA);
    };

    const buyAllProduct = async() => {
        try {
            setIsBuyAllBtnActive(true);
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/payment/new`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({amount:allProductsTotalAmount&&allProductsTotalAmount})
            });

            const data = await res.json();

            console.log("------ Cart.tsx  buyAllProduct");
            console.log(data);
            console.log(cartItems);
            console.log({checkoutAllData});
            console.log("------ Cart.tsx  buyAllProduct");

            if (data.success) {
                setIsBuyAllBtnActive(false);
                // navigate("/shipping", {state:{clientSecret:data.message, productID, quantity}});
                navigate("/shipping", {state:{clientSecret:data.message, checkoutAllData}});
            }
            else{
                setIsBuyAllBtnActive(false);
                toast.error(data.message, {
                    duration:2000,
                    position:"bottom-center"
                })
            }

        } catch (error) {
            console.log("------ Cart.tsx  buyAllProduct");
            console.log(error);            
            console.log("------ Cart.tsx  buyAllProduct");
            setIsBuyAllBtnActive(false);
            toast.error("Error Occured", {
                duration:2000,
                position:"bottom-center"
            })
        }
    };
    
    useEffect(() => {
        const cartCont = document.getElementById("cart_cont");
        if (isDialogOpen) {
            document.body.classList.add('no-scroll');
            cartCont?.classList.add("dark-background");
        } else {
            document.body.classList.remove('no-scroll');
            cartCont?.classList.remove("dark-background");
        }
      }, [isDialogOpen]);
    
    useEffect(() => {
        getMyCartProducts();        
    }, []);
    


    return(
        <>
        {/* <pre>{JSON.stringify(cartData, null, `\t`)}</pre> */}
        {/* <pre>{JSON.stringify(orderItems, null, `\t`)}</pre> */}
        {/* <pre>{JSON.stringify(allProductsTotalAmount, null, `\t`)}</pre> */}
        {/* <pre>{JSON.stringify(cartData, null, `\t`)}</pre> */}

            <Toaster />
            <div id="cart_cont" className="cart_cont">
                <div className="checkout_all_cont">
                    <div className="checkout_info" onClick={() => setIsDialogOpen(true)}><BiInfoCircle className="BiInfoCircle"/></div>
                    <div className="total_amount">{allProductsTotalAmount}/- ₹</div>
                    <button onClick={() => {buyAllProduct()}}>{isBuyAllBtnActive ? <Loader size={13} borderWidth={3} color="#ff824d" /> : "Buy All"}</button>
                    {/* <button onClick={() => {console.log(checkoutAllData)}}>{isBuyAllBtnActive ? <Loader size={13} borderWidth={3} color="#ff824d" /> : "Buy All"}</button> */}
                </div>
                {
                        cartData?.cartItems.length !== undefined ?
                            cartData?.cartItems.length !== 0 ?
                                (cartData?.cartItems.map((product, index) => (
                                    <div className="product_cont" key={index}>
                                        <div className="include_cont">
                                            <div className="include_heading">Include to checkout</div>
                                            <input type="checkbox" id={`include_checkbox${index}`} value={product.product.price*product.quantity} onChange={() => {totalAmountCalculator(cartData&&cartData);}} onClick={() => {totalAmountCalculator(cartData&&cartData);}} />
                                        </div>
                                        <ProductContainer homeCheck={homeCheck} hasReviewBtn={false}  productAmount={product.product.price*product.quantity} productPhoto={product.product.photo} productID={product?.product?._id} reloadFunction={getMyCartProducts} haveQunatityInp={true} hasRemoveBtn={true} fieldsHeadingArray={["Name", "Price", "Quantity", "Subtotal"]} fieldsValueArray={[product.product.name, product.product.price, product.quantity, product?.product?.price*product?.quantity]} />
                                    </div>
                                )))
                                :
                                <NotFound subject="Products" />
                            :
                            <NotFound subject="Products" />
                }

                <dialog className="total_amount_dialog" open={isDialogOpen}>
                    <CgClose className="CgClose" onClick={() => setIsDialogOpen(false)}/>
                    <div className="table_inner_div">
                        <table>
                            <thead>
                                <th>Name</th><th>Price</th><th>Quantity</th><th>Subtotal</th>
                            </thead>
                            {
                                cartItems?.length !== 0 &&
                                cartItems?.map((product, index) => {
                                    if (product.included) {
                                        return(
                                            <tbody key={index}>
                                                <td>{product.product.name}</td>
                                                <td>{product.product.price}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.product.price*product.quantity}</td>
                                            </tbody>)
                                    }                                  
                                    else{
                                        return(
                                            <tbody key={index} style={{color:"gainsboro"}}>
                                                <td><s>{product.product.name}</s></td>
                                                <td><s>{product.product.price}</s></td>
                                                <td><s>{product.quantity}</s></td>
                                                <td><s>{product.product.price*product.quantity}</s></td>
                                            </tbody>
                                            )
                                    }

                                })
                            }
                            <th></th><th></th><th>Grand Total</th><th>{allProductsTotalAmount}</th>
                        </table>
                    </div>
                </dialog>


            </div>
        </>
    )
};

export default Cart;