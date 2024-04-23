import "./styles/checkout.scss";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { CartItemsTypes } from "./components/Cart";

// import { useState } from "react";
// import StripeCheckout, { Token } from "react-stripe-checkout";

interface CheckoutAllDataTypes {
    product:string;
    quantity:number;
}


const stripePromise = loadStripe(
    "pk_test_51Oc3xKSHf5vitJ9rEYdbqKhf7MmyOGBWIL2GJs8NDprnDtHs4QoaVNOUTDIA1mzjBxlwUgY00u6x6AhMD5OMdO4X00WbRXvaOo"
);
const CheckOutForm = ({checkoutAllData}:{checkoutAllData:CheckoutAllDataTypes[]}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setISProcessing] = useState<boolean>(false);
    const navigate = useNavigate();

    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log("stripe ya element nahi hai");
            console.log({stripe});
            console.log({elements});
            return;
        }
        setISProcessing(true);

        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams:{return_url:window.location.origin},
            redirect:"if_required"
        });

        if (error) {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/order/new`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({checkoutAllData, status:"Failed", message:error.message})
            });


            console.log("Something went wrong from Checkout.tsx");
            console.log(error);
            setISProcessing(false);
            return;
        }
        
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/order/new`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({checkoutAllData, status:paymentIntent.status, message:paymentIntent.description})
            });

            const data = await res.json();

            console.log("-------  Checkout.tsx   after payment success");
            console.log(data);
            console.log("-------  Checkout.tsx   after payment success");

            
            console.log({paymentIntent});
            if (paymentIntent.status === "succeeded") {

                try {
                    const resClearCart = await fetch(`${import.meta.env.VITE_SERVER_URL}/cart/clear`, {
                        method:"PUT",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        credentials:"include",
                        body:JSON.stringify({checkoutAllData})
                    });
        
                    const dataClearCart = await resClearCart.json();
        
                    console.log("-------  Checkout.tsx   clear cart after checkout");
                    console.log(dataClearCart);
                    console.log("-------  Checkout.tsx   clear cart after checkout");
                } catch (error) {
                    console.log("-------  Checkout.tsx   clear cart error");
                    console.log("error from checkout after payment === succeeded");
                    console.log(error);
                    console.log("-------  Checkout.tsx   clear cart error");
                }
                
                console.log("Placing Order");
                navigate("/orders");
            }
            setISProcessing(false);
            
        } catch (error) {
            console.log("-------  Checkout.tsx   after payment error");
            console.log("error from checkout after payment === succeeded");
            console.log(error);
            console.log("-------  Checkout.tsx   after payment error");
            setISProcessing(false);
        }
        
    };

    return(
        <div className="checkout_container">
            <form onSubmit={submitHandler} >
                <PaymentElement />
                <button className="payment_btn" disabled={isProcessing} onClick={() => {console.log("Checkout button has clicked.......")}}>{isProcessing ? "Processing..." : "Pay"}</button>
            </form>
        </div>
    )
};

const Checkout = () => {
    const location = useLocation();

    const locationState:{clientSecret:string; checkoutAllData:CheckoutAllDataTypes[]; cartTotalAmount:number;}|undefined = location.state;
    console.log({locationState});

    if (!locationState?.clientSecret) return <Navigate to={"/shipping"} />;
    if (locationState?.checkoutAllData.length === 0) return <Navigate to={"/"} />;
    
    // if (!locationState?.productID) return <Navigate to={"/"} />;
    // if (!locationState?.quantity) return <Navigate to={"/"} />;
    
    if (locationState?.checkoutAllData.length === 1){
        return (
            <Elements options={{
                clientSecret:locationState.clientSecret
            }} stripe={stripePromise}>
                <CheckOutForm checkoutAllData={locationState.checkoutAllData} />
            </Elements>
        )
    }
    else if (locationState.checkoutAllData.length > 1){
        return (
            <Elements options={{
                clientSecret:locationState.clientSecret
            }} stripe={stripePromise}>
                <CheckOutForm checkoutAllData={locationState.checkoutAllData} />
            </Elements>
        )

    }
};

export default Checkout;