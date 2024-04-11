import "../styles/loader.scss";


const Loader = ({size, borderWidth, color}:{size?:number; borderWidth?:number; color?:string;}) => {

    return(
        <>
            <div className="loader_border" style={{width:size?`${size}px`:"30px", height:size?`${size}px`:"30px", border:borderWidth?`${borderWidth}px solid #f4f4f4`:"6px solid #f4f4f4", borderRight:borderWidth?`${borderWidth}px solid ${color?color:"#3182ce"}`:`6px solid ${color?color:"#3182ce"}`}}>

            </div>
        </>
    )
};

export default Loader;