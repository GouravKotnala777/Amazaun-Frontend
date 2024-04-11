import { useEffect, useState } from "react";
import "../styles/cart.scss";
import img from "/logo192.png";
import AddToCart from "./AddToCart";
import NotFound from "./NotFound";
import { BiInfoCircle } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";


interface ProductTypes {
    _id: string;
    productType: string;
    name: string;
    price: number;
    stock: number;
    photo: string;
    wishlistedUsers: {
                        _id: string;
                        productType: string;
                        name: string;
                        price: number;
                        stock: number;
                        photo: string;
                    }[]
}

interface CartItemsTypes {
    product : ProductTypes;
    quantity : number;
    image : string;
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



// interface AllProductsTotalAmountTypes {
//     name:string;
//     subTotal:number;
// }

const Cart = ({homeCheck}:{homeCheck:boolean;}) => {
    // const [cartData, setCartData] = useState<{success:boolean; message:CartProductTypes}>();
    const [cartData, setCartData] = useState<CartProductTypes>();
    const [cartItems, setCartItems] = useState<CartItemsTypes[]>();
    // const [dataForSummery, setDataForSummery] = useState<OrderItemsTypes[]>();
    const [allProductsTotalAmount, setAllProductsTotalAmount] = useState<number>(0);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    // const [includeChackboxElement, setIncludeChackboxElement] = useState<HTMLInputElement|null>(null);


    const getMyCartProducts = async() => {
        try {
            const res = await fetch("http://localhost:8000/api/v1/cart/mycart", {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data:{success:boolean; message:CartProductTypes} = await res.json();
            console.log("-------  Cart.tsx  getMyCartProducts");
            const cartItemsA:CartItemsTypes[] = [];
            if (data.success) {
                setCartData(data.message);
                data.message.cartItems.forEach((product) => {
                    cartItemsA?.push({...product, included:true});
                });
                console.log(data.message);
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
        let aaaaa:number = 0;
        data.cartItems.forEach((product, index) => {
            const includeCheckbox = document.getElementById(`include_checkbox${index}`) as HTMLInputElement;
            if (includeCheckbox.checked) {
                aaaaa += product.product.price*product.quantity;
                cartItemsA.push({...product, included:true});
            }
            else{
                cartItemsA.push({...product, included:false});
            }
        });
        setAllProductsTotalAmount(aaaaa);
        setCartItems(cartItemsA);
    };
    const totalAmountCalculatorA = (data:CartProductTypes) => {
        const cartItemsA:CartItemsTypes[] = [];
        let aaaaa:number = 0;
        data.cartItems.forEach((product, index) => {
            const includeCheckbox = document.getElementById(`include_checkbox${index}`) as HTMLInputElement;
            includeCheckbox?.setAttribute("checked", "true");
            if (includeCheckbox?.checked) {
                aaaaa += product.product.price*product.quantity;
                cartItemsA.push({...product, included:true});
            }
            else{
                cartItemsA.push({...product, included:false});
            }
        });
        
        setAllProductsTotalAmount(aaaaa);        
        setCartItems(cartItemsA);      
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
        {/* <pre>{JSON.stringify(refresh)}</pre> */}
            <div id="cart_cont" className="cart_cont">
                <div className="checkout_all_cont">
                    <div className="checkout_info" onClick={() => setIsDialogOpen(true)}><BiInfoCircle className="BiInfoCircle"/></div>
                    <div className="total_amount">{allProductsTotalAmount}/- ₹</div>
                    <button onClick={() => {console.log(cartItems)}}>Buy All</button>
                </div>
                {
                    cartData?.cartItems.length !== 0 ?
                        cartData?.cartItems.map((product, index) => (
                            <div className="product_cont" key={product._id}>
                                        <div className="left_section">
                                            <Link to={`/product/${product.product._id}`}>
                                                <img src={img} alt={img} />
                                            </Link>
                                            <input type="checkbox" id={`include_checkbox${index}`} value={product.product.price*product.quantity} onChange={() => {totalAmountCalculator(cartData&&cartData);}} onClick={() => {totalAmountCalculator(cartData&&cartData);}} />
                                        </div>
                                <div className="right_section">
                                    <div className="detail_cont">
                                        <div className="detail_heading">Product Type</div><div className="detail_value">{product?.product?.productType}</div>
                                    </div>
                                    <div className="detail_cont">
                                        <div className="detail_heading">Name</div><div className="detail_value">{product?.product?.name}</div>
                                    </div>
                                    <div className="detail_cont">
                                        <div className="detail_heading">Price</div><div className="detail_value">{product?.product?.price}</div>
                                    </div>
                                    <div className="detail_cont">
                                        <div className="detail_heading">Quantity</div><div className="detail_value">{product?.quantity}</div>
                                    </div>
                                    <div className="detail_cont">
                                        <div className="detail_heading">subTotal</div><div className="detail_value">{product?.product?.price*product?.quantity}</div>
                                    </div>
                                    <AddToCart productAmount={product.product.price*product.quantity} homeCheck={homeCheck} productID={product?.product?._id} reloadFunction={getMyCartProducts} haveQunatityInp={true} hasRemoveBtn={true} />
                                </div>
                            </div>
                        ))
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