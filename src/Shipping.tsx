import "./styles/shipping.scss";
import { ChangeEvent, useState } from "react";
import Form from "./components/Form";
import { useLocation, useNavigate } from "react-router-dom";

interface ShippingFormTypes {
    houseNo?: string;
    streetNo?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

const Shipping = () => {
    const [shippingForm, setShippingForm] = useState<ShippingFormTypes>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [shippingType, setShippingType] = useState<string>();
    const location = useLocation();
    const navigate = useNavigate();
    const formFields = [
        {type:"text", name:"houseNo", placeHolder:"House No.", value:shippingForm?.houseNo},
        {type:"text", name:"streetNo", placeHolder:"Street No.", value:shippingForm?.streetNo},
        {type:"text", name:"city", placeHolder:"City.", value:shippingForm?.city},
        {type:"text", name:"State", placeHolder:"State.", value:shippingForm?.state},
        {type:"text", name:"country", placeHolder:"Country.", value:shippingForm?.country},
        {type:"text", name:"zipCode", placeHolder:"Zip Code.", value:shippingForm?.zipCode}
    ];

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setShippingForm({...shippingForm, [e.target.name]:e.target.value})
    };

    const shippingFormSubmitHandler = async() => {
        setIsLoading(true);
        console.log({shippingForm});
        console.log({location});
        
        navigate("/pay", {state:{...(location.state), shippingType, total:(location.state.subTotal)+(shippingType === "instant" ? 200 : shippingType === "standard" ? 100 : 0)}});
        setIsLoading(false);
    };



    return(
        <div className="shipping_cont">
            <div className="subtotal">
                <span>Subtotal</span>
                <span>{location.state.subTotal}/- ₹</span>
            </div>
            <div className="shipping_heading">Shipping</div>
            <div className="radios_cont">
                <label>
                    <input type="radio" name="shipping_time" value="instant" onChange={(e) => setShippingType(e.target.value)} />Same Day/Next Day (excluding sunday)
                </label>
                <label>
                    <input type="radio" name="shipping_time" value="standard" onChange={(e) => setShippingType(e.target.value)} />Standard Shipping (2 -3 days)
                </label>
                <label>
                    <input type="radio" name="shipping_time" value="regular" onChange={(e) => setShippingType(e.target.value)} />Free Standard Shipping (3 - 6 days)
                </label>
            </div>
            <div className="cont">
                <span><b>₹{location.state.subTotal}/-</b> <i style={{fontSize:"8px"}}>(9% gst <b>₹{(9*location.state.subTotal)/(100)}/-</b> include, 9% cgst <b>₹{(9*location.state.subtotal)/(100)}/-</b> include)</i></span>
                <span>+</span>
                <span><b>₹{shippingType === "instant" ? 200 : shippingType === "standard" ? 100 : 0}/-</b> <i style={{fontSize:"8px"}}>({shippingType} shipping)</i></span>
                <span>=</span>
                <span><b>₹{location.state.subTotal + (shippingType === "instant" ? 200 : shippingType === "standard" ? 100 : 0)}/-</b></span>
            </div>
            <div className="cont">
                <span><b>Total</b></span>
                <span>=</span>
                <span><b>₹{location.state.subTotal + (shippingType === "instant" ? 200 : shippingType === "standard" ? 100 : 0)}/-</b></span>
            </div>


            {
                shippingType ? 
                    <Form formHeading="Shipping Address" isLoading={isLoading} formFields={formFields} onChangeFunc={onChangeHandler} onClickFunc={shippingFormSubmitHandler} />
                    :
                    ""
            }
        </div>
    )
};

export default Shipping;