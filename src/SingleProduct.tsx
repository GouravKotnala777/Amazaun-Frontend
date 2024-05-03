import { useEffect, useState, ChangeEvent } from "react";
import "./styles/single_product.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AllProductsTypes } from "./Home";
// import AddToCart from "./components/AddToCart";
import { InitialStateType } from "./redux/reducers/userReducer";
import { useSelector } from "react-redux";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import RatingStar from "./components/RatingStar";
import ProductContainer from "./components/ProductContainer";
import toast, { Toaster } from "react-hot-toast";
import ProductsSameBrand from "./components/ProductsSameBrand";
import Form from "./components/Form";
import { MdDeleteForever } from "react-icons/md";



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

let wishlistCheckbox:HTMLElement|null;
const SingleProduct = ({homeCheck}:{homeCheck:boolean;}) => {
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
        // {type:"file", name:"photo", placeHolder:"photo"},
    ];
    const [updateProductForm, setUpdateProductForm] = useState<AddProductFormTypes>();
    // const [productPhoto, setProductPhoto] = useState<File|undefined>();

    const {productID} = useParams();
    const [product, setProduct] = useState<{success:boolean; message:AllProductsTypes, message2:string;}>();
    const [sameBrandProducts, setSameBrandProducts] = useState<AllProductsTypes[]>([]);
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState<boolean>();
    const {payload} = useSelector((state:{userReducer:InitialStateType}) => state.userReducer);
    const navigate = useNavigate();



    const inputChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        if (e.target.type === "text" || e.target.type === "number") {
            setUpdateProductForm({...updateProductForm, [e.target.name]:e.target.value});
            console.log(e.target.name, e.target.value);
        }
        // else if ((e as ChangeEvent<HTMLInputElement>).target.type === "file") {
        //     if ((e as ChangeEvent<HTMLInputElement>).target.files && (e as ChangeEvent<HTMLInputElement>).target.files![0]) {
        //         console.log((e as ChangeEvent<HTMLInputElement>).target.files![0]);
        //         setProductPhoto((e as ChangeEvent<HTMLInputElement>)?.target.files![0]);
        //     }
        // }
        else{
            setUpdateProductForm({...updateProductForm, [e.target.name]:e.target.value});
            console.log(e.target.name, e.target.value);
        }
    };
    const getSingleProduct = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/${productID}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });

            const data = await res.json();

            console.log("------ SingleProduct.tsx");
            console.log(data);
            setProduct(data);
            setSameBrandProducts(data.sameBrandProducts);
            console.log("------ SingleProduct.tsx");
            isWishlistedFinder(data);
            
        } catch (error) {
            console.log("------ SingleProduct.tsx");
            console.log(error);
            console.log("------ SingleProduct.tsx");
        }
    };
    const addToWishlist = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/wishlist`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({productID})
            });

            const data = await res.json();

            console.log("------ SingleProduct.tsx  addToWishlist");
            console.log(data);
            if (data.success) {
                setProduct(data);
                setIsCheckBoxChecked(!isCheckBoxChecked);

                toast.success(data.message2, {
                    duration:2000,
                    position:"bottom-center"
                })
            }
            console.log("------ SingleProduct.tsx  addToWishlist");
            
        } catch (error) {
            console.log("------ SingleProduct.tsx  addToWishlist");
            console.log(error);
            console.log("------ SingleProduct.tsx  addToWishlist");
        }
    };
    const isWishlistedFinder = (data:{success:boolean; message:AllProductsTypes}|undefined) => {
        wishlistCheckbox = document.getElementById("wishlist_checkbox");
        const isProductWishlishted = data?.message?.wishlistedUsers.includes(payload?._id as string);

        if (isProductWishlishted) {
            wishlistCheckbox?.setAttribute("checked","true");
            setIsCheckBoxChecked(true);
        }
        else{
            wishlistCheckbox?.removeAttribute("checked");
            setIsCheckBoxChecked(false);
        }
    }
    const updateProduct = async(productID:string) => {
        console.log({
            category:updateProductForm?.category,
            brand:updateProductForm?.brand,
            name:updateProductForm?.name,
            price:updateProductForm?.price,
            stock:updateProductForm?.stock,
            // photo:productPhoto,
            flavor:updateProductForm?.flavor,
            description:updateProductForm?.description,
            weight:updateProductForm?.weight,
            length:updateProductForm?.length,
            width:updateProductForm?.width,
            height:updateProductForm?.height,
            restriction:updateProductForm?.restriction
        });

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/${productID}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({
                    category:updateProductForm?.category,
                    brand:updateProductForm?.brand,
                    name:updateProductForm?.name,
                    price:updateProductForm?.price,
                    stock:updateProductForm?.stock,
                    flavor:updateProductForm?.flavor,
                    description:updateProductForm?.description,
                    weight:updateProductForm?.weight,
                    length:updateProductForm?.length,
                    width:updateProductForm?.width,
                    height:updateProductForm?.height,
                    restriction:updateProductForm?.restriction})
            });

            const data = await res.json();

            console.log("----- SingleProductUpdate.tsx  updateProduct");
            console.log(data);
            if (data.success) {
                getSingleProduct();
            }
            console.log("----- SingleProductUpdate.tsx  updateProduct");
            
        } catch (error) {
            console.log(error);
        }
        
    };
    const deleteProduct = async(productID:string) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/${productID}`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            console.log("----- SingleProductUpdate.tsx  deleteProduct");
            console.log(data);
            if (data.success) {
                toast.success("Product Delete Successfully", {
                    duration:2000,
                    position:"bottom-center"
                })
                setTimeout(() => {
                    navigate("/");
                }, 2100);
            }
            else{
                toast.error(data.message, {
                    duration:2000,
                    position:"bottom-center"
                })

            }
            console.log("----- SingleProductUpdate.tsx  deleteProduct");
            
        } catch (error) {
            console.log(error);
            toast.error("Error Occured", {
                duration:2000,
                position:"bottom-center"
            })
        }
        
    };

    useEffect(() => {
        getSingleProduct();
        
    }, [productID]);

    return(
        <>
        {/* <button onClick={addToWishlist}>POST</button> */}
        {/* <pre>{JSON.stringify(product?.message, null, `\t`)}</pre> */}
        {/* <pre>{JSON.stringify(sameBrandProducts, null, `\t`)}</pre> */}
            <Toaster />
            <div className="product_cont">
                <div className="delete_product_system">
                    <span>Delete this product</span>
                    <MdDeleteForever color="red" className="MdDeleteForever" onClick={() => deleteProduct(productID!)} />
                </div>
                <div className="wishlist_system_cont">
                    <span>add to wishlist</span>
                    <BsHeart className="heart_icon" color="red" display={isCheckBoxChecked?"none":"block"} />
                    <BsHeartFill className="heart_icon" color="red" display={isCheckBoxChecked?"block":"none"} />
                    <input id="wishlist_checkbox" type="checkbox" className="wishlist_checkbox" onClick={() => payload?._id ? addToWishlist() : navigate("/login")} />
                </div>
                <ProductContainer homeCheck={homeCheck} hasReviewBtn={true}  productAmount={product?.message.price as number} productPhoto={product?.message.photo} productID={product?.message._id} haveQunatityInp={true}
                    fieldsHeadingArray={[
                        "Product Type", "Brand", "Name", "Price", "Stock"
                        ]}
                    fieldsValueArray={[
                        product?.message.category, product?.message.brand, product?.message.name, product?.message.price, product?.message.stock
                        ]}
                />

                <Form formHeading="Update Product" formFields={formFields} onChangeFunc={inputChangeHandler} onClickFunc={() => updateProduct(productID!)} />
            </div>

            <ProductsSameBrand sameBrandProducts={sameBrandProducts}  />


            <div className="reviews_cont">
                <div className="review_heading">
                    Reviews
                </div>
                
                {
                    product?.message.reviews.map((review, index) => 

                    product?.message.reviews.length >= 10 ?
                        review.user.email === payload?.email ?
                            (
                            <div className="review_cont" key={index}>
                                <div className="user_detail user_photo">
                                    <img src={review.user.avatar} alt={review.user.avatar.split("/Avatar/")[1]} />
                                </div>
                                <div className="user_detail">
                                    <div className="user_email">{review.user.email}</div>
                                    <div className="rating">{review.rating}</div>
                                    <div className="comment">{review.comment}</div>
                                </div>
                            </div>
                            )
                            :
                            ""
                        :
                        ""

                    )
                }
                {
                    product?.message.reviews.map((review, index) => (
                        <div className="review_cont" key={index}>
                            <div className="user_photo_cont">
                                <img src={review.user.avatar?review.user.avatar:"https://res.cloudinary.com/dx4comsu3/image/upload/v1713260670/Avatars/t0qlyva2ss0jm2evdcr7.png"} alt={review.user.avatar?review.user.avatar.split("/Avatars/")[1]:"t0qlyva2ss0jm2evdcr7.png"} />
                            </div>
                            <div className="user_detail">
                                <div className="user_email">{review.user.email}</div>
                                <div className="rating">{review.rating}

                                <RatingStar rating={review.rating} />

                                {/* <BiStar /><BsStarFill/><BsStarHalf/> */}
                                </div>
                                <div className="comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus delectus ipsum voluptatem cupiditate a corrupti ex, dicta, vero atque illo quod non. Asperiores assumenda odio adipisci, earum consequatur officiis dignissimos?</div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
};

export default SingleProduct;