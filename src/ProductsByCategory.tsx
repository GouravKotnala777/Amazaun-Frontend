import { useEffect, useState } from "react";
import { AllProductsTypes } from "./Home";
import { Link, useParams } from "react-router-dom";
import AddToCart from "./components/AddToCart";
import Skeleton from "./components/Skeleton";
import EAAsCategoryComponent from "./components/staticComponents/EAAsCategoryComponent";
import ProteinCategoryComponent from "./components/staticComponents/ProteinCategoryComponent";
import GainerCategoryComponent from "./components/staticComponents/GainerCategoryComponent";
import RecoveryCategoryComponent from "./components/staticComponents/RecoveryCategoryComponent";
import PreWorkoutCategoryComponent from "./components/staticComponents/PreWorkoutCategoryComponent";
// import IntraWorkoutCategoryComponent from "./components/staticComponents/PostWorkoutCategoryComponent";
import PostWorkoutCategoryComponent from "./components/staticComponents/BCAAsCategoryComponent";
import BCAAsCategoryComponent from "./components/staticComponents/BCAAsCategoryComponent";


const ProductByCategory = ({homeCheck}:{homeCheck:boolean}) => {
    const [allProducts, setAllProducts] = useState<AllProductsTypes[]>([]);
    const {groupedBy, item} = useParams();
    const [skipProducts, setSkipProducts] = useState<number>(0);
    const [isProductExist, setIsProductExist] = useState<boolean>(false);


    const fetchingAllProductsByCategory = async() => {
        try {
            // const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/all?skipProducts=${skipProducts}`, {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/all`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({groupedBy, item, skipProducts})
            });
    
            const data = await res.json();
    
            console.log("----- ProductByCategory.tsx  fetchingAllProductsByCategory");
            console.log(data);
            console.log({groupedBy});
            
            if (data.success) {
                setIsProductExist(true);
                setAllProducts([...allProducts, ...data.message]);
            }
            else{
                if (data.message === "No product exists") {
                    setIsProductExist(false);
                }
            }
            console.log("----- ProductByCategory.tsx  fetchingAllProductsByCategory");
            
        } catch (error) {
            console.log("----- ProductByCategory.tsx  fetchingAllProductsByCategory");
            console.log(error);
            console.log("----- ProductByCategory.tsx  fetchingAllProductsByCategory");
        }
    };

    

    const CategoryDetailes = () => {
        if (item === "EAAs") {
            return <EAAsCategoryComponent />
        }
        else if (item === "Protein") {
            return <ProteinCategoryComponent />
        }
        else if (item === "Gainer") {
            return <GainerCategoryComponent />
        }
        else if (item === "Recovery") {
            return <RecoveryCategoryComponent />
        }
        else if (item === "Pre-Workout") {
            return <PreWorkoutCategoryComponent />
        }
        else if (item === "Post-Workout") {
            return <PostWorkoutCategoryComponent />
        }
        else if (item === "BCAAs") {
            return <BCAAsCategoryComponent />
        }
        else{
            return <h1>No Category</h1>
        }
    };

    useEffect(() => {
        fetchingAllProductsByCategory();
    }, [skipProducts]);

    return(
        <>
            {/* <pre>{JSON.stringify(allProducts, null, `\t`)}</pre> */}

            <div className="filter_toggle">
            </div>
            <h1>{JSON.stringify(item)}</h1>
            <div className="home_cont">
            {
                // allProducts ?
                    allProducts.length !== 0 ? 
                        allProducts?.map((product, index) => 
                        (
                            <div className="product_cont" key={index}>
                                <Link to={`/product/${product._id}`} className="product_cont_link">
                                    <img src={product.photo ? product.photo : "https://res.cloudinary.com/dx4comsu3/image/upload/v1713257241/Products/dn629rcg2l2ycqezgab1.png"} alt={product.photo.split("/Products/")[1]} className="product_img" />
                                    <div className="product_detailes">{product.brand}</div>
                                    <div className="product_detailes">{product.name}</div>
                                    <div className="product_detailes">{product.price}</div>
                                    <div className="product_detailes">{product.stock}</div>
                                </Link>
                                <AddToCart productAmount={product.price} homeCheck={homeCheck} productID={product._id} />
                            </div>
                        ))
                        :
                        <>
                            <div className="product_cont">
                                <div className="product_cont_link">
                                    <div className="product_img">
                                        <Skeleton height={177} />
                                    </div>
                                    <div className="product_detailes"><Skeleton height={20} /></div>
                                    <div className="product_detailes"><Skeleton height={20} /></div>
                                    <div className="product_detailes"><Skeleton height={20} /></div>
                                </div>
                                <AddToCart homeCheck={homeCheck}/>
                            </div>
                        </>

            }
            </div>

            <div className="more_btn_cont">
                {
                    isProductExist && <button className="more_btn" onClick={() => {setSkipProducts(skipProducts+1);}}>More</button>
                }
            </div>

         
            {
                <CategoryDetailes />
            }

            {/* <IntraWorkoutCategoryComponent /> */}
        </>
    )
};

export default ProductByCategory;