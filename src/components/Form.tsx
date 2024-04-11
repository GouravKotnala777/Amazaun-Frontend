import "../styles/form.scss";
import React, { ChangeEvent, FC } from "react";

interface FormFieldsTypes {
    type:string;
    name:string;
    placeHolder:string;
}

interface FormPropTypes {
    formHeading:string;
    formFields:FormFieldsTypes[];
    onChangeFunc:(e:ChangeEvent<HTMLInputElement>) => void;
    onClickFunc:() => Promise<void>;
}


// const formFields = [
//     {type:"text", name:"product_type", placeHolder:"Product Type"},
//     {type:"text", name:"product_type", placeHolder:"Product Type"},
//     {type:"text", name:"product_type", placeHolder:"Product Type"},
// ];

const Form:FC<FormPropTypes> = ({formHeading, formFields, onChangeFunc, onClickFunc}) => {
    return(
        <>
            <div className="form_background">
                <div className="form_heading">{formHeading}</div>
                <div className="form_cont">
                    {
                        formFields.map((input, index) => (
                            input.type === "text" ?
                                <input key={index} type={input.type} name={input.name} placeholder={input.placeHolder} onChange={onChangeFunc} />
                                :
                                input.type === "file" ?
                                    <input key={index} type={input.type} name={input.name} accept="image/*" onChange={onChangeFunc} />
                                    :
                                    <input key={index} type={input.type} name={input.name} placeholder={input.placeHolder} onChange={onChangeFunc} />
                        ))
                    }
                    {/* <input type="text" name="product_type" placeholder="Product Type" onChange={(e) => setProductType(e.target.value)}/> */}

                    <button type="submit" onClick={onClickFunc}>Add</button>
                </div>
            </div>
        </>
    )
};

export default Form;