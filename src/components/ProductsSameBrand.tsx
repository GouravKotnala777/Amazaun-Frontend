import { AllProductsTypes } from "../Home";
import "../styles/product_same_brand.scss";
import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const ProductsSameBrand = ({sameBrandProducts}:{sameBrandProducts:AllProductsTypes[]}) => {

    return(
        <div className="product_same_brand_cont">
            <div className="product_same_brand_heading">
                Products of same brands
            </div>
            <div className="product_same_brand_slider">
                <div className="products_cont">
                    {
                        sameBrandProducts.map((product, index) => 
                            (
                                <>
                                    <div className="product_cont" key={index}>
                                        <Link to={`/product/${product._id}`} className="product_cont_link">
                                            <img src={product.photo} alt={product.photo.split("/Products/")[1]} className="product_img" />
                                            <div className="product_detailes product_name">{product.name}</div>
                                            <div className="product_detailes">{product.price}</div>
                                        </Link>
                                        <AddToCart productAmount={product.price} productID={product._id} />
                                    </div>
                                </>
                            )
                            // (
                            //     <div className="product_cont" key={index}>
                            //         <div className="img_cont">
                            //             <img src={logo} alt="aaaa" />
                            //         </div>
                            //         <div className="product_info_cont">
                            //             <div className="product_info_value">{product.name}</div>
                            //             <div className="product_info_value">{product.category}</div>
                            //         </div>
                            //     </div>
                            // )
                        )
                    }
                </div>
            </div>
        </div>
    )
};

export default ProductsSameBrand;