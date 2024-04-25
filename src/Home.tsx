import "./styles/home.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import NotFound from "./components/NotFound";
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
    const [allProducts, setAllProducts] = useState<AllProductsTypes[]>([]);
    const [searchInpValue, setSearchInpValue] = useState<{name:string|undefined; productType:string|undefined;}>({name:"", productType:""});
    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState<boolean>(false);
    const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
    const [skipProducts, setSkipProducts] = useState<number>(0);
    // const [productChucks, setProductChucks] = useState<AllProductsTypes[]>([]);


    const fetchingAllProducts = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/all?skipProducts=${skipProducts}`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({name:searchInpValue.name?.trim(), productType:searchInpValue.productType?.trim()})
            });
    
            const data = await res.json();
    
            console.log("----- Home.tsx  fetchingAllProducts");
            console.log(data);
            // setProductChucks(data.message);
            if (data.success) {
                setAllProducts([...allProducts, ...data.message]);
            }
            // else{
            //     if (data.message === "No product exists") {
            //         allProducts.splice(0, 6);
            //         setSkipProducts(0);
            //     }
            // }
            console.log({skipProducts});
            console.log({len:allProducts.length});
            
            
            // console.log(productChucks);
            console.log("----- Home.tsx  fetchingAllProducts");
            
        } catch (error) {
            console.log("----- Home.tsx  fetchingAllProducts");
            console.log(error);
            console.log("----- Home.tsx  fetchingAllProducts");
        }
        
    };

    const filterHandler = () => {
        if (isFilterActive === isFilterDialogOpen) {
            setIsFilterActive(!isFilterActive);
            if (isFilterActive) {
                setIsFilterDialogOpen(false);
                fetchingAllProducts();
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

    const handleInfiniteScroll = () => {
        try {
            if (!isFilterActive) {
                if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                    setSkipProducts((prev) => prev + 1);
                    console.log("aaaaaaaaaa");
                }
            }
        } catch (error) {
            console.log(error);            
        }
    };

    
    useEffect(() => {
        if (isFilterDialogOpen) {
            filterHandler();
        }
    }, [homeCheck]);
    useEffect(() => {
        fetchingAllProducts();
        console.log({skipProducts});
    }, [skipProducts]);
    useEffect(() => {
        if (isFilterDialogOpen) {
            document.body.classList.add("no-scroll");
        }
        else{
            document.body.classList.remove("no-scroll");
        }
    }, [isFilterDialogOpen]);
    useEffect(() => {
        if (searchInpValue.name !== "" || searchInpValue.productType !== "") {
            setAllProducts([]);
        }
        if (searchInpValue.name === "" && searchInpValue.productType === "") {
            setAllProducts([]);
            fetchingAllProducts();
        }
    }, [searchInpValue]);

    useEffect(() => {
        if (!isFilterActive) {
            window.addEventListener("scroll", handleInfiniteScroll);
        }

        return () => {window.removeEventListener("scroll", handleInfiniteScroll)};
    }, []);

  return (
    <>
        {/* <pre>{JSON.stringify(productChucks, null, `\t`)}</pre> */}
        <div className="filter_toggle">
            <div className="filter-operner" style={{background:isFilterActive ? "#ff3153" : "#ff824d"}} onClick={() => {filterHandler(); setAllProducts([]); setSkipProducts(0);}}>
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
                        <button onClick={() => {isFilterActive?setIsFilterDialogOpen(false):""; setSkipProducts(0); setAllProducts([]); fetchingAllProducts();}}>Filter</button>
                    </div>
                </div>
            </dialog>
            {
                // allProducts ?
                    allProducts.length !== 0 ? 
                        allProducts?.map((product, index) => 
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
                        
                        // <NotFound subject={`Products `} />
                    // :
                    // <>
                    //     <div className="product_cont">
                    //         <div className="product_cont_link">
                    //             <div className="product_img">
                    //                 <Skeleton height={177} />
                    //             </div>
                    //             <div className="product_detailes"><Skeleton height={20} /></div>
                    //             <div className="product_detailes"><Skeleton height={20} /></div>
                    //             <div className="product_detailes"><Skeleton height={20} /></div>
                    //         </div>
                    //         <AddToCart homeCheck={homeCheck}/>
                    //     </div>
                    // </>

            }
        </div>
    </>
  )
}

export default Home
