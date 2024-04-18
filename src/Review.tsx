import { ChangeEvent, useState } from "react";
import Form from "./components/Form";
import { useNavigate, useParams } from "react-router-dom";


interface ReviewFormTypes {
    rating?:number;
    comment?:string;
}


const Review = () => {
    const [reviewForm, setReviewForm] = useState<ReviewFormTypes>();
    const {productID} = useParams();
    const navigate = useNavigate();
    
    const formFields = [
        {type:"number", name:"rating", placeHolder:"Rating", value:reviewForm?.rating},
        {type:"text", name:"comment", placeHolder:"Comment", value:reviewForm?.comment}
    ];




    const reviewChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setReviewForm({...reviewForm, [e.target.name]:e.target.value});
    };


    const reviewSubmitHandler = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/product/review`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body:JSON.stringify({productID, rating:Number(reviewForm?.rating), comment:reviewForm?.comment})
            });

            const data = await res.json();
            
            console.log("------  Review.tsx  reviewSubmitHandler");
            console.log(data);
            if (data.success) {
                navigate(`/product/${productID}`);
            }
            console.log("------  Review.tsx  reviewSubmitHandler");
            
        } catch (error) {
            console.log("------  Review.tsx  reviewSubmitHandler");
            console.log(error);
            console.log("------  Review.tsx  reviewSubmitHandler");
        }
    };
    
    return(
        <>
            <Form formHeading="Write A Review" formFields={formFields} onChangeFunc={reviewChangeHandler} onClickFunc={reviewSubmitHandler}  />
        </>
    )
};

export default Review;