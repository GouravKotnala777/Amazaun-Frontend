import "../styles/form.scss";
import { ChangeEvent, FC } from "react";
import Loader from "./Loader";

interface FormFieldsTypes {
    type:string;
    name:string;
    placeHolder:string;
    selectOptionFields?:{
        value:string;
        placeHolder:string;
    }[];
}

interface FormPropTypes {
    isLoading?:boolean;
    formHeading:string;
    formFields:FormFieldsTypes[];
    onChangeFunc:(e:ChangeEvent<HTMLInputElement>) => void;
    onSelectFunc?:(e:ChangeEvent<HTMLSelectElement>) => void;
    onClickFunc:() => Promise<void>;
}

const Form:FC<FormPropTypes> = ({isLoading, formHeading, formFields, onChangeFunc, onSelectFunc, onClickFunc}) => {
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
                                    input.type === "select" ?
                                        <select name={input.name} onChange={onSelectFunc}>
                                            <option value="none">None</option>
                                            {
                                                input.selectOptionFields?.map((selectInp, selectInd) => (
                                                    <option key={selectInd} value={selectInp.value}>{selectInp.placeHolder}</option>
                                                ))
                                            }
                                        </select>
                                        :
                                        <input key={index} type={input.type} name={input.name} placeholder={input.placeHolder} onChange={onChangeFunc} />
                        ))
                    }

                    <button type="submit" onClick={onClickFunc}>{isLoading===true?<Loader size={15} borderWidth={3} color="#3182ce" />:formHeading}</button>
                </div>
            </div>
        </>
    )
};

export default Form;