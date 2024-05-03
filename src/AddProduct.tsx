import { ChangeEvent, useState } from "react";
import Form from "./components/Form";

interface AddProductFormTypes{
    category?:string;
    brand?:string;
    name?:string;
    price?:string;
    stock?:string;

    flavor?:string;
    description?:string;
    weight?:string;
    length?:string;
    width?:string;
    height?:string;
    restriction?:string;
}

const AddProduct = () => {
    const formFields = [
        {type:"text", name:"category", placeHolder:"Category"},
        {type:"text", name:"brand", placeHolder:"Brand Name"},
        {type:"text", name:"name", placeHolder:"Name"},
        {type:"number", name:"price", placeHolder:"Price"},
        {type:"number", name:"stock", placeHolder:"Stock"},
        {type:"select", name:"flavor", placeHolder:"Flavor", selectOptionFields:[
            {value:"chocolate", placeHolder:"Chocolate"},
            {value:"vanella", placeHolder:"Vanella"},
            {value:"stawberry", placeHolder:"Stawberry"}
        ]},
        {type:"text", name:"description", placeHolder:"Description"},
        {type:"text", name:"weight", placeHolder:"Weight"},
        {type:"text", name:"length", placeHolder:"Length"},
        {type:"text", name:"width", placeHolder:"Width"},
        {type:"text", name:"height", placeHolder:"Height"},
        {type:"select", name:"restriction", placeHolder:"Restriction", selectOptionFields:[
            {value:"temperature specific", placeHolder:"Temperature Specific"},
            {value:"brittle material", placeHolder:"Brittle Material"},
            {value:"over weight", placeHolder:"Over Weight"},
            {value:"over volume", placeHolder:"Over Volume"}
        ]},
        {type:"file", name:"photo", placeHolder:"photo"},
    ];
    const [addProductForm, setAddProductForm] = useState<AddProductFormTypes>();
    const [productPhoto, setProductPhoto] = useState<File|undefined>();



    const inputChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "text" || e.target.type === "number") {
            setAddProductForm({...addProductForm, [e.target.name]:e.target.value});
            console.log(e.target.name, e.target.value);
        }
        else if (e.target.type === "file") {
            if (e.target.files && e.target.files![0]) {
                console.log(e.target.files![0]);
                setProductPhoto(e?.target.files![0]);
            }
        }
        else{
            setAddProductForm({...addProductForm, [e.target.name]:e.target.value});
            console.log(e.target.name, e.target.value);
        }
    };

    const selectChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {    
        setAddProductForm({...addProductForm, [e.target.name]:e.target.value});
        console.log(e.target.name, e.target.value);
    }

    const addNewProduct = async() => {
        if (productPhoto && addProductForm?.category && addProductForm?.name && addProductForm?.price && addProductForm?.stock && addProductForm?.description && addProductForm?.weight && addProductForm?.length && addProductForm?.width && addProductForm?.height) {
            const formData = new FormData();
            formData.set("category", addProductForm.category as string);
            formData.set("brand", addProductForm.brand as string);
            formData.set("name", addProductForm.name as string);
            formData.set("price", addProductForm.price as string);
            formData.set("stock", addProductForm.stock as string);
            formData.set("flavor", addProductForm.flavor as string);
            formData.set("description", addProductForm.description as string);
            formData.set("weight", addProductForm.weight as string);
            formData.set("length", addProductForm.length as string);
            formData.set("width", addProductForm.width as string);
            formData.set("height", addProductForm.height as string);
            formData.set("restriction", addProductForm.restriction as string);
            formData.set("photo", productPhoto as File);

            console.log(addProductForm.flavor);
            console.log(typeof addProductForm.flavor);
            
            console.log({
                category:addProductForm?.category,
                name:addProductForm?.name,
                price:addProductForm?.price,
                stock:addProductForm?.stock,
                photo:productPhoto,
                flavor:addProductForm?.flavor,
                description:addProductForm?.description,
                weight:addProductForm?.weight,
                length:addProductForm?.length,
                width:addProductForm?.width,
                height:addProductForm?.height,
                restriction:addProductForm?.restriction
            });

            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/new`, {
                    method:"POST",
                    credentials:"include",
                    body:formData
                    // body:JSON.stringify({category:addProductForm?.category, name:addProductForm?.name, price:addProductForm?.price, stock:addProductForm?.stock, photo:submittedProductPhoto.url})
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
            console.log({
                category:addProductForm?.category,
                name:addProductForm?.name,
                price:addProductForm?.price,
                stock:addProductForm?.stock,
                photo:productPhoto,
                flavor:addProductForm?.flavor,
                description:addProductForm?.description,
                weight:addProductForm?.weight,
                length:addProductForm?.length,
                width:addProductForm?.width,
                height:addProductForm?.height,
                restriction:addProductForm?.restriction
            });
        }
        
    };


    return(
        <>
            <Form formHeading="Add Product" formFields={formFields} onChangeFunc={inputChangeHandler} onSelectFunc={selectChangeHandler} onClickFunc={addNewProduct} />
        </>
    )
};

export default AddProduct;