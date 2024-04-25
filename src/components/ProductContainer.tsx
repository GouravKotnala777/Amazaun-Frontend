import "../styles/product_container.scss";
// import { BsHeart, BsHeartFill } from "react-icons/bs";
import AddToCart from "./AddToCart";
import { Link, useNavigate } from "react-router-dom";


const ProductContainer = ({homeCheck, hasReviewBtn, productAmount, productPhoto, productID, reloadFunction,haveQunatityInp, hasRemoveBtn, fieldsHeadingArray, fieldsValueArray}:{homeCheck:boolean; hasReviewBtn:boolean; productAmount?:number; productPhoto?:string; productID?:string; reloadFunction?:()=> Promise<void>; haveQunatityInp?:boolean; hasRemoveBtn?:boolean; fieldsHeadingArray:string[]|number[]; fieldsValueArray:(string|number|undefined)[];}) => {
    const navigate = useNavigate();

    return(
        <div className="product_container_background">
            {/* {JSON.stringify(productPhoto)} */}
            <div className="image_cont">
                <Link to={`/product/${productID}`}>
                    <img src={productPhoto} alt={productPhoto ? productPhoto.split("/Products/")[1]:"img not found"} />
                </Link>
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