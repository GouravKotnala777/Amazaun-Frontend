// import { BiStar } from "react-icons/bi";
import { MdStar, MdStarHalf, MdStarOutline } from "react-icons/md";
import "../styles/ratingstar.scss";
// import { BsStarFill, BsStarHalf } from "react-icons/bs";

const RatingStar = ({rating}:{rating:number;}) => {
  const stars = [];
  
  // Create an array of JSX elements for the star icons
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i} className="star_icon"><MdStar /></span>); // Full star
    } else if (i < Math.ceil(rating)) {
      stars.push(<span key={i} className="star_icon"><MdStarHalf /></span>); // Half star
    } else {
      stars.push(<span key={i} className="star_icon"><MdStarOutline /></span>); // Empty star
    }
  }
  
  return (
    <div className="star_rating">
      {stars}
    </div>
  );
};

export default RatingStar;