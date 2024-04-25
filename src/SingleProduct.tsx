import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AllProductsTypes } from "./Home";
import "./styles/single_product.scss";
// import AddToCart from "./components/AddToCart";
import { InitialStateType } from "./redux/reducers/userReducer";
import { useSelector } from "react-redux";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import RatingStar from "./components/RatingStar";
import ProductContainer from "./components/ProductContainer";
import toast, { Toaster } from "react-hot-toast";


let wishlistCheckbox:HTMLElement|null;
const SingleProduct = ({homeCheck}:{homeCheck:boolean;}) => {
    const {productID} = useParams();
    const [product, setProduct] = useState<{success:boolean; message:AllProductsTypes, message2:string;}>();
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState<boolean>();
    const {payload} = useSelector((state:{userReducer:InitialStateType}) => state.userReducer);
    const navigate = useNavigate();

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

    useEffect(() => {
        getSingleProduct();
    }, []);

    return(
        <>
        {/* <button onClick={addToWishlist}>POST</button> */}
        {/* <pre>{JSON.stringify(product?.message, null, `\t`)}</pre> */}
        {/* <pre>{JSON.stringify(isWishlisted, null, `\t`)}</pre> */}
            <Toaster />
            <div className="product_cont">
                <div className="wishlist_system_cont">
                    <span>add to wishlist</span>
                    <BsHeart className="heart_icon" display={isCheckBoxChecked?"none":"block"} />
                    <BsHeartFill className="heart_icon" color="red" display={isCheckBoxChecked?"block":"none"} />
                    <input id="wishlist_checkbox" type="checkbox" className="wishlist_checkbox" onClick={() => payload?._id ? addToWishlist() : navigate("/login")} />
                </div>
                <ProductContainer homeCheck={homeCheck} hasReviewBtn={true}  productAmount={product?.message.price as number} productPhoto={product?.message.photo} productID={product?.message._id} haveQunatityInp={true}
                    fieldsHeadingArray={[
                        "Product Type", "Name", "Price", "Stock"
                        ]}
                    fieldsValueArray={[
                        product?.message.productType, product?.message.name, product?.message.price, product?.message.stock
                        ]}
                />
            </div>


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
                                <div className="user_email">gouravKotnala777adaddaasdsda.gemail.com</div>
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