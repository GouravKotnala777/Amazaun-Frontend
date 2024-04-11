import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
    "pk_test_51Oc3xKSHf5vitJ9rEYdbqKhf7MmyOGBWIL2GJs8NDprnDtHs4QoaVNOUTDIA1mzjBxlwUgY00u6x6AhMD5OMdO4X00WbRXvaOo"
);

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setISProcessing] = useState<boolean>(false);
    const navigate = useNavigate();


    const submitHandler = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log("stripe ya element nahi hai");
            return;
        }

        setISProcessing(true);

        // const order = {};

        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams:{return_url:window.location.origin},
            redirect:"if_required"
        });

        if (error) {
            setISProcessing(false);
            console.log("Something went wrong from Checkout.tsx");
            return;
        }

        if (paymentIntent.status === "succeeded") {
            console.log("Placing Order");
            navigate("/orders");
        }
        setISProcessing(false);
    };
    return(
        <div className="checkout_cont">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button>{isProcessing?"Processing...":"Pay"}</button>
            </form>
        </div>
    )
};

const Checkout = () => {
    const location = useLocation();

    const clientSecret:string|undefined = location.state;

    if (!clientSecret) return <Navigate to={"/shipping"} />;

    return(
        <Elements options={{clientSecret}} stripe={stripePromise}>
            <CheckOutForm />
        </Elements>
    )
};

export default Checkout;