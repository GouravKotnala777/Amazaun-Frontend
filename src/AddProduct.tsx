import { ChangeEvent, useState } from "react";
import Form from "./components/Form";

interface AddProductFormTypes{
    productType?:string;
    name?:string;
    price?:number;
    stock?:number;
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
            formData.set("file", productPhoto);
            formData.set("upload_preset", "chat-app");
            formData.set("cloud_name", "dx4comsu3");

            try {
                const resProductPhoto = await fetch("https://api.cloudinary.com/v1_1/dx4comsu3/image/upload", {
                    method:"POST",
                    body:formData
                });
                
                const submittedProductPhoto = await resProductPhoto.json();

                console.log(submittedProductPhoto);
                
                if (submittedProductPhoto.secure_url) {
                    console.log("----AddProduct.tsx  cloudinary");
                    console.log(submittedProductPhoto);
                    console.log("----AddProduct.tsx  cloudinary");
                }else{
                    console.log("Failed to upload productPhoto to Cloudinary");
                }

                const res = await fetch("http://localhost:8000/api/v1/product/new", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    credentials:"include",
                    body:JSON.stringify({productType:addProductForm?.productType, name:addProductForm?.name, price:addProductForm?.price, stock:addProductForm?.stock, photo:submittedProductPhoto.url})
                });

                const data = await res.json();

                if (data.success) {
                    // console.log({productType:addProductForm?.productType, name:addProductForm?.name, price:addProductForm?.price, stock:addProductForm?.stock, photo:submittedProductPhoto.secure_url});
                    console.log("----- AddProduct.tsx  AddNewProduct");
                    console.log(data);
                    console.log("----- AddProduct.tsx  AddNewProduct");
                }
                else{
                    await fetch(`https://api.cloudinary.com/v1_1/dx4comsu3/image/destroy/${submittedProductPhoto.public_id}`, {
                        method: "DELETE"
                    });
                    console.log("Image deleted from Cloudinary");
                }
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