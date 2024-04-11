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
    const location = useLocation();
    const navigate = useNavigate();
    const formFields = [
        {type:"text", name:"houseNo", placeHolder:"House No.", value:"ssss"},
        {type:"text", name:"streetNo", placeHolder:"Street No.", value:"ssss"},
        {type:"text", name:"city", placeHolder:"City.", value:"ssss"},
        {type:"text", name:"State", placeHolder:"State.", value:"ssss"},
        {type:"text", name:"country", placeHolder:"Country.", value:"ssss"},
        {type:"text", name:"zipCode", placeHolder:"Zip Code.", value:"ssss"}
    ];

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setShippingForm({...shippingForm, [e.target.name]:e.target.value})
    };

    const shippingFormSubmitHandler = async() => {
        console.log(shippingForm);
        navigate("/pay", {state:location.state});
    };



    return(
        <>
            <button onClick={() => {
                console.log(location.state);
            }}>Fetch Location Data</button>
            <Form formHeading="Shipping Address" formFields={formFields} onChangeFunc={onChangeHandler} onClickFunc={shippingFormSubmitHandler} />
        </>
    )
};

export default Shipping;