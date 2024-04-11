import "../styles/skeleton.scss";


const Skeleton = ({width, height}:{width?:number; height?:number}) => {

    return(
        <>
            <div className="skeleton" style={{width:width?`${width}%`:"100%", height:height?`${height}px`:"30px"}}></div>
        </>
    )
};

export default Skeleton;