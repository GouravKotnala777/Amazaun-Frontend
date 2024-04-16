import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AllProductsTypes } from "./Home";
import "./styles/single_product.scss";
import AddToCart from "./components/AddToCart";
import { InitialStateType } from "./redux/reducers/userReducer";
import { useSelector } from "react-redux";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import RatingStar from "./components/RatingStar";

// interface ProductType {

// }
let wishlistCheckbox:HTMLElement|null;
const SingleProduct = ({homeCheck}:{homeCheck:boolean;}) => {
    const {productID} = useParams();
    const [product, setProduct] = useState<{success:boolean; message:AllProductsTypes}>();
    const [isCheckBoxChecked, setIsCheckBoxChecked] = useState<boolean>();
    const {payload} = useSelector((state:{userReducer:InitialStateType}) => state.userReducer)
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
            setProduct(data);
            setIsCheckBoxChecked(!isCheckBoxChecked);
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
            <div className="product_cont">
                <div className="image_cont">
                    <img src={product?.message.photo} alt={product?.message.photo.split("/Products/")[1]} />
                    <div className="wishlist_system_cont">
                        <span>add to wishlist</span>
                        <BsHeart className="heart_icon" display={isCheckBoxChecked?"none":"block"} />
                        <BsHeartFill className="heart_icon" color="red" display={isCheckBoxChecked?"block":"none"} />
                        <input id="wishlist_checkbox" type="checkbox" className="wishlist_checkbox" onClick={addToWishlist} />
                    </div>
                </div>
                <div className="details_cont">
                    <div className="detail_cont">
                        <div className="detail_heading">Product Type</div><div className="detail_value">{product?.message.productType}</div>
                    </div>
                    <div className="detail_cont">
                        <div className="detail_heading">Name</div><div className="detail_value">{product?.message.name}</div>
                    </div>
                    <div className="detail_cont">
                        <div className="detail_heading">Price</div><div className="detail_value">{product?.message.price}</div>
                    </div>
                    <div className="detail_cont">
                        <div className="detail_heading">Stock</div><div className="detail_value">{product?.message.stock}</div>
                    </div>
                    <div className="detail_cont">
                        {/* <div className="detail_heading">Reviews</div><div className="detail_value">{product?.message.reviews}</div> */}
                    </div>
                    <AddToCart homeCheck={homeCheck} productAmount={product?.message.price as number} productID={product?.message._id as string} haveQunatityInp={true} />
                    <div className="detail_cont">
                        <div className="detail_heading">Review this product</div><div className="detail_value"><button className="write_review_btn" onClick={() => navigate(`/review/${productID}`)}>Review</button></div>
                    </div>
                </div>
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
                                <img src={review.user.avatar?review.user.avatar:"https://res.cloudinary.com/dx4comsu3/image/upload/v1713260670/Avatars/t0qlyva2ss0jm2evdcr7.png"} alt={review.user.avatar.split("/Avatars/")[1]} />
                            </div>
                            <div className="user_detail">
                                <div className="user_email">gouravKotnala777adaddaasdsda.gemail.com</div>
                                <div className="rating">{review.rating}

                                <RatingStar rating={4} />

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