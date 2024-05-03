import { useEffect, useState } from "react";
// import logo from "/public/logo192.png";
import { Link } from "react-router-dom";


const ProductCategories = ({heading, apiUrl}:{heading:string; apiUrl:string;}) => {
    const [allProductsCategories, setAllProductsCategories] = useState<string[]>([]);
    
    // const [searchInpValue, setSearchInpValue] = useState<{name:string|undefined; productType:string|undefined;}>({name:"", productType:""});

    const getProductCategories = async() => {
        try {
            // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/all?skipProducts=${skipProducts}`, {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/${apiUrl}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
    
            const data = await res.json();
    
            console.log("----- ProductCategories.tsx  getProductCategories");
            console.log(data);
            if (data.success) {
                setAllProductsCategories(data.message);
            }
            console.log("----- ProductCategories.tsx  getProductCategories");
            
        } catch (error) {
            console.log("----- ProductCategories.tsx  getProductCategories");
            console.log(error);
            console.log("----- ProductCategories.tsx  getProductCategories");
        }
    }

    useEffect(() => {
        getProductCategories();
        
        
    }, []);
    return(
        <div className="grouped_by_cont">
            {/* {JSON.stringify(allProductsCategories, null, `\t`)} */}
            <div className="grouped_heading">
                {heading}
            </div>
            <div className="grouped_product">
                {
                    allProductsCategories.map((item, index) => (
                                <Link to={`${apiUrl}/${item}`} className="grouped_by_link">
                                    <img src={`https://res.cloudinary.com/dx4comsu3/image/upload/v1/${apiUrl.split("/")[2]}/${item}.jpg`} alt={`https://res.cloudinary.com/dx4comsu3/image/upload/v1/${apiUrl.split("/")[2]}/${item}.jpg`} />
                                    <div className="category_heading" key={index}>{item}</div>
                                </Link>
                            
                    ))
                }
            </div>
        </div>
    )
};

export default ProductCategories;