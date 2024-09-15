import IconServerError from "../../assets/svg/icon-serverError"

function ServerNotResponding(props)
{
    return(
        <>
            {props.img?<IconServerError />:null}
            {props.message?<p style={{color:`red`,fontSize:`1.6rem`,margin:`1.5rem`}}>{props.message}</p>:null}
            
        </>
    )
}

export default ServerNotResponding