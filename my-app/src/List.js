import React from "react";
import{Link,Outlet,useNavigate} from 'react-router-dom'
function List(){
    const navigate=useNavigate();
    return(
        <>
        <div className="button">
            <button onClick={()=>navigate("List")}>Alice</button>
            <div className="details">
                <h1>Roll:"Frontend Developer"</h1>
                <h1>Department:"CSE"</h1>
            </div>
            <Outlet/>
        </div>
        </>
    )
}
export default List;