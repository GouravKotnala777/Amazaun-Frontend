import "./styles/home.scss";
import reactLogo from "/logo192.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import AddToCart from "./components/AddToCart";
import { FiFilter } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import Skeleton from "./components/Skeleton";

// const fakeData = [
//     {
//         "_id" : "65f5850aba1abc328100f26d",
//         "productType" : "electronics",
//         "name" : "Oppo A72",
//         "price" : 10000,
//         "stock" : 10,
//         "wishlistedUsers" : [ ],
//         "reviews" : [ ],
//         "__v" : 0
//     },
//     {
//         "_id" : "65f5850aba1abc328100f26d",
//         "productType" : "electronics",
//         "name" : "Oppo A72",
//         "price" : 10000,
//         "stock" : 10,
//         "wishlistedUsers" : [ ],
//         "reviews" : [ ],
//         "__v" : 0
//     },
//     {
//         "_id" : "65f5850aba1abc328100f26d",
//         "productType" : "electronics",
//         "name" : "Oppo A72",
//         "price" : 10000,
//         "stock" : 10,
//         "wishlistedUsers" : [ ],
//         "reviews" : [ ],
//         "__v" : 0
//     },
//     {
//         "_id" : "65f5850aba1abc328100f26d",
//         "productType" : "electronics",
//         "name" : "Oppo A72",
//         "price" : 10000,
//         "stock" : 10,
//         "wishlistedUsers" : [ ],
//         "reviews" : [ ],
//         "__v" : 0
//     },
// ];

// interface ReviewsTypes {
    
// };
// interface WishlistdUsersTypes {

// };
export interface AllProductsTypes {
    name:string;
    price:number;
    productType:string;
    reviews:{user:{name:string; email:string; avatar:string;}; rating:number; comment:string;}[];
    stock:number;
    wishlistedUsers:string[];
    _id:string;
}




function Home({homeCheck}:{homeCheck:boolean}) {
    const [allProducts, setAllProducts] = useState<{success:boolean; message:AllProductsTypes[]}>();
    const [searchInpValue, setSearchInpValue] = useState<{name:string|undefined; productType:string|undefined;}>({name:"", productType:""});
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false);


    const fetchingAllProducts = async() => {
        try {
            const res = await fetch("http://localhost:8000/api/v1/product/all", {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
    
            const data = await res.json();
    
            console.log("----- Home.tsx  fetchingAllProducts");
            console.log(data);
            setAllProducts(data);
            console.log("----- Home.tsx  fetchingAllProducts");
            
        } catch (error) {
            console.log("----- Home.tsx  fetchingAllProducts");
            console.log(error);
            console.log("----- Home.tsx  fetchingAllProducts");
        }
        
    };
    const fetchingAllProductsWithSearchedQueries = async() => {
        try {
            const res = await fetch("http://localhost:8000/api/v1/product/all", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name:searchInpValue.name?.trim(), productType:searchInpValue.productType?.trim()})
            });
    
            const data = await res.json();
    
            console.log("----- Home.tsx  fetchingAllProductsWithSearchedQueries");
            console.log(data);
            setAllProducts(data);
            console.log("----- Home.tsx  fetchingAllProductsWithSearchedQueries");
            
        } catch (error) {
            console.log("----- Home.tsx  fetchingAllProductsWithSearchedQueries");
            console.log(error);
            console.log("----- Home.tsx  fetchingAllProductsWithSearchedQueries");
        }
        
    };

    const filterHandler = () => {
        if (isFilterActive === isFilterDialogOpen) {
            setIsFilterActive(!isFilterActive);
            if (isFilterActive) {
                setIsFilterDialogOpen(false);
            }
            else{
                setIsFilterDialogOpen(true);
            }
            if (searchInpValue.name !== "" || searchInpValue.productType !== "") {
                setSearchInpValue({name:"", productType:""});
            }
        }
        else{
            setIsFilterActive(false);
            if (searchInpValue.name !== "" || searchInpValue.productType !== "") {
                setSearchInpValue({name:"", productType:""});
            }
        }
    };

    useEffect(() => {
        fetchingAllProducts();
    }, []);
    useEffect(() => {
        if (isFilterDialogOpen) {
            document.body.classList.add("no-scroll");
        }
        else{
            document.body.classList.remove("no-scroll");
        }
    }, [isFilterDialogOpen]);
    useEffect(() => {
        if (searchInpValue.name === "" && searchInpValue.productType === "") {
            fetchingAllProductsWithSearchedQueries();
        }
    }, [searchInpValue]);

  return (
    <>
        <div className="filter_toggle">
            <div className="filter-operner" style={{background:isFilterActive ? "#ff3153" : "#ff824d"}} onClick={filterHandler}>
                {
                    isFilterActive ? <CgClose className="FiFilter" /> : <FiFilter className="FiFilter" />
                }
            </div>
        </div>
        <div className="home_cont">
            <dialog className="home_tools_cont" open={isFilterDialogOpen}>
                <div className="home_tools">
                    <label>Search By Name</label>
                    <input type="search" name="name" value={searchInpValue.name} onChange={(e) => {setSearchInpValue({...searchInpValue, [e.target.name]:e.target.value})}} />
                    <label>Search By Product Type</label>
                    <input type="search" name="productType" value={searchInpValue.productType} onChange={(e) => {setSearchInpValue({...searchInpValue, [e.target.name]:e.target.value})}} />
                    <button onClick={() => {isFilterActive?setIsFilterDialogOpen(false):""; fetchingAllProductsWithSearchedQueries();}}>Filter</button>
                </div>
            </dialog>
            {
                allProducts ?
                    allProducts?.success ? 
                        allProducts?.message?.map((product, index) => 
                        (
                            <div className="product_cont" key={index}>
                                <Link to={`/product/${product._id}`} className="product_cont_link">
                                    {
                                        reactLogo ?
                                        <>
                                            {JSON.stringify(reactLogo)}
                                            <img src={reactLogo} alt={reactLogo} className="product_img" />
                                        </>
                                        :
                                        <div className="product_img">
                                            {JSON.stringify(reactLogo)}
                                            <Skeleton height={177} />
                                        </div>
                                    }
                                    <div className="product_detailes">{product.name}</div>
                                    <div className="product_detailes">{product.price}</div>
                                    <div className="product_detailes">{product.stock}</div>
                                </Link>
                                <AddToCart productAmount={product.price} homeCheck={homeCheck} productID={product._id} />
                            </div>
                        ))
                        :
                        <NotFound subject={`Products `} />
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
    </>
  )
}

export default Home
