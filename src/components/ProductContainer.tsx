import "../styles/product_container.scss";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
import AddToCart from "./AddToCart";
import { useNavigate } from "react-router-dom";
import photo from "/public/logo192.png";


const ProductContainer = ({homeCheck, hasReviewBtn, productAmount, productID, reloadFunction,haveQunatityInp, hasRemoveBtn, fieldsHeadingArray, fieldsValueArray}:{homeCheck:boolean; hasReviewBtn:boolean; productAmount?:number; productID?:string; reloadFunction?:()=> Promise<void>; haveQunatityInp?:boolean; hasRemoveBtn?:boolean; fieldsHeadingArray:string[]|number[]; fieldsValueArray:(string|number|undefined)[];}) => {
    const navigate = useNavigate();
    // const arr = [
    //     {heading:"Product Type", value:"aaaa"},
    //     {heading:"Name", value:"aaaa"},
    //     {heading:"Price", value:"aaaa"},
    //     {heading:"Stock", value:"aaaa"}
    // ];
    // const isCheckBoxChecked = false;

    return(
        <div className="product_container_background">
            <div className="image_cont">
                <img src={photo} alt={photo} />
                {/* <div className="wishlist_system_cont">
                    <span>add to wishlist</span>
                    <BsHeart className="heart_icon" display={isCheckBoxChecked?"none":"block"} />
                    <BsHeartFill className="heart_icon" color="red" display={isCheckBoxChecked?"block":"none"} />
                </div> */}
            </div>
            <div className="details_cont">
                {
                    fieldsHeadingArray.map((field, index) => 
                        (
                            <div className="detail_cont" key={index}>
                                <div className="detail_heading">{field}</div><div className="detail_value">{fieldsValueArray[index]}</div>
                            </div>
                        )
                    )
                }
                <AddToCart homeCheck={homeCheck} productAmount={productAmount} productID={productID} haveQunatityInp={haveQunatityInp} hasRemoveBtn={hasRemoveBtn} reloadFunction={reloadFunction} />
                <div className="detail_cont">
                    {
                        hasReviewBtn ?
                            <>
                                <div className="detail_heading">Review this product</div>
                                <div className="detail_value">
                                    <button className="write_review_btn" onClick={() => navigate(`/review/${productID}`)}>Review</button>
                                </div>
                            </>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
};

export default ProductContainer;