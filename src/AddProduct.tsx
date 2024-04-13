import { ChangeEvent, useState } from "react";
import Form from "./components/Form";

interface AddProductFormTypes{
    productType?:string;
    name?:string;
    price?:string;
    stock?:string;
}

const AddProduct = () => {
    const formFields = [
        {type:"text", name:"productType", placeHolder:"Product Type"},
        {type:"text", name:"name", placeHolder:"Name"},
        {type:"number", name:"price", placeHolder:"Price"},
        {type:"number", name:"stock", placeHolder:"Stock"},
        {type:"file", name:"photo", placeHolder:"photo"},
    ]
    const [addProductForm, setAddProductForm] = useState<AddProductFormTypes>();
    const [productPhoto, setProductPhoto] = useState<File|undefined>();



    const inputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "text" || e.target.type === "number") {
            setAddProductForm({...addProductForm, [e.target.name]:e.target.value})
        }
        else if (e.target.type === "file") {
            if (e.target.files && e.target.files[0]) {
                console.log(e.target.files[0]);
                setProductPhoto(e.target.files[0]);
            }
        }
    };

    const addNewProduct = async() => {
        if (productPhoto && addProductForm?.productType && addProductForm?.name && addProductForm?.price && addProductForm?.stock) {
            const formData = new FormData();
            formData.set("productType", addProductForm.productType as string);
            formData.set("name", addProductForm.name as string);
            formData.set("price", addProductForm.price as string);
            formData.set("stock", addProductForm.stock as string);
            formData.set("photo", productPhoto as File);

            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/new`, {
                    method:"POST",
                    credentials:"include",
                    body:formData
                    // body:JSON.stringify({productType:addProductForm?.productType, name:addProductForm?.name, price:addProductForm?.price, stock:addProductForm?.stock, photo:submittedProductPhoto.url})
                });

                const data = await res.json();

                console.log("----- AddProduct.tsx  AddNewProduct");
                console.log(data);
                console.log("----- AddProduct.tsx  AddNewProduct");
                
            } catch (error) {
                console.log(error);
            }
        }
        else{
            console.log("All fields are required");
            console.log({productType:addProductForm?.productType, name:addProductForm?.name, price:addProductForm?.price, stock:addProductForm?.stock, photo:productPhoto});
        }
        
    };


    return(
        <>
            <Form formHeading="Add Product" formFields={formFields} onChangeFunc={inputChangeHandler} onClickFunc={addNewProduct} />
        </>
    )
};

export default AddProduct;