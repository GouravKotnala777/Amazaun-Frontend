import "../styles/not_found.scss";

const NotFound = ({subject}:{subject:string}) => {

    return(
        <>
            <div className="not_found_cont">
                {subject} Not Found!
            </div>
        </>
    )
};

export default NotFound;