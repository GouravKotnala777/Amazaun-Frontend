import { ChangeEvent, useState } from "react";
import Form from "./components/Form"
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
        navigate("/pay", {state:location.state});
        setIsLoading(false);
    };



    return(
        <>
            <Form formHeading="Shipping Address" isLoading={isLoading} formFields={formFields} onChangeFunc={onChangeHandler} onClickFunc={shippingFormSubmitHandler} />
        </>
    )
};

export default Shipping;