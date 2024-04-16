// import { BiStar } from "react-icons/bi";
import "../styles/ratingstar.scss";
// import { BsStarFill, BsStarHalf } from "react-icons/bs";

const RatingStar = ({rating}:{rating:number;}) => {
  const stars = [];
  
  // Create an array of JSX elements for the star icons
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i} className="star_icon">&#9733;</span>); // Full star
    } else if (i < Math.ceil(rating)) {
      stars.push(<span key={i} className="star_icon">&#9733;&#189;</span>); // Half star
    } else {
      stars.push(<span key={i} className="star_icon">&#9734;</span>); // Empty star
    }
  }
  
  return (
    <div className="star_rating">
      {stars}
    </div>
  );
};

export default RatingStar;