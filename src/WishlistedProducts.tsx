import { useEffect, useState } from "react";
import ProductContainer from "./components/ProductContainer";

const WishlistedProducts = ({homeCheck}:{homeCheck:boolean;}) => {
    const [wishlistedProducts, setWishlistedProducts] = useState<{success:boolean; message:{_id:string; name:string; price:number; photo:string;}[]}>();


    const findMyWishlist = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/wishlist`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });

            const data = await res.json();

            console.log("-------  WishlistedProducts.tsx  findMyWishlist");
            console.log(data);
            if (data.success) {
                setWishlistedProducts(data);
            }
            console.log("-------  WishlistedProducts.tsx  findMyWishlist");
            
        } catch (error) {
            console.log("-------  WishlistedProducts.tsx  findMyWishlist");
            console.log(error);
            console.log("-------  WishlistedProducts.tsx  findMyWishlist");
            
        }
    };

    useEffect(() => {
        findMyWishlist();
    }, []);

    return(
        <>
            {
                wishlistedProducts?.message.map((item, index) => (
                    <>
                        <ProductContainer key={index} homeCheck={homeCheck} hasReviewBtn={false}  productAmount={999} productPhoto={item.photo} productID={item._id} haveQunatityInp={true} hasRemoveBtn={true} fieldsHeadingArray={["Name", "Price"]} fieldsValueArray={[item.name, item.price]} />
                    </>
                ))
            }
        </>
    )
};

export default WishlistedProducts;