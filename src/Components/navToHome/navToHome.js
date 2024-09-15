import { render } from "@testing-library/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavToHome()
{
    const navigate = useNavigate()
    useEffect(()=>{
        navigate("/")
    },[])

    render(
        <></>
    )
}
export default NavToHome