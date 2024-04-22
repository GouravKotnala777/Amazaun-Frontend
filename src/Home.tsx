import "./styles/home.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import AddToCart from "./components/AddToCart";
import { FiFilter } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import Skeleton from "./components/Skeleton";


export interface AllProductsTypes {
    name:string;
    price:number;
    productType:string;
    reviews:{user:{name:string; email:string; avatar:string;}; rating:number; comment:string;}[];
    stock:number;
    wishlistedUsers:string[];
    _id:string;
    photo:string;
}




function Home({homeCheck}:{homeCheck:boolean}) {
    const [allProducts, setAllProducts] = useState<{success:boolean; message:AllProductsTypes[]}>();
    const [searchInpValue, setSearchInpValue] = useState<{name:string|undefined; productType:string|undefined;}>({name:"", productType:""});
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false);


    const fetchingAllProducts = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/all`, {
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
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/all`, {
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
        console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
        
    };

    
    useEffect(() => {
        if (isFilterDialogOpen) {
            filterHandler();
        }
    }, [homeCheck]);
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
        if (searchInpValue.name !== "" && searchInpValue.productType !== "") {
            fetchingAllProductsWithSearchedQueries();
        }
        if (searchInpValue.name === "" && searchInpValue.productType === "") {
            fetchingAllProducts();
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
            <dialog className="home_tools_dialog" open={isFilterDialogOpen} style={{zIndex:isFilterDialogOpen?"22":"18"}}>
                <div className="home_tools_cont">
                    <div className="home_tools">
                        <label>Search By Name</label>
                        <input type="search" name="name" placeholder="Product Name" value={searchInpValue.name} onChange={(e) => {setSearchInpValue({...searchInpValue, [e.target.name]:e.target.value})}} />
                        <label>Search By Product Type</label>
                        <input type="search" name="productType" placeholder="Product Type" value={searchInpValue.productType} onChange={(e) => {setSearchInpValue({...searchInpValue, [e.target.name]:e.target.value})}} />
                        <button onClick={() => {isFilterActive?setIsFilterDialogOpen(false):""; fetchingAllProductsWithSearchedQueries();}}>Filter</button>
                    </div>
                </div>
            </dialog>
            {
                allProducts ?
                    allProducts?.success ? 
                        allProducts?.message?.map((product, index) => 
                        (
                            <div className="product_cont" key={index}>
                                <Link to={`/product/${product._id}`} className="product_cont_link">
                                    <img src={product.photo ? product.photo : "https://res.cloudinary.com/dx4comsu3/image/upload/v1713257241/Products/dn629rcg2l2ycqezgab1.png"} alt={product.photo.split("/Products/")[1]} className="product_img" />
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
