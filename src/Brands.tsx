import ProductCategories from "./components/ProductCategories";
import "./styles/brands.scss";




const Brands = ({homeCheck}:{homeCheck:boolean;}) => {

    
    return(
        <>
            <div className="brands_cont">
                {JSON.stringify(homeCheck)}
                Brands
                <ProductCategories heading="Search By Categories" apiUrl={`/group/category`} />
                <ProductCategories heading="Search By Brands" apiUrl={`/group/brand`} />
            </div>
        </>
    )
};

export default Brands;