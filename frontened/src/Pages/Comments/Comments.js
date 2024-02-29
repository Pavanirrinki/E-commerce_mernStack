import React from 'react'
import "./Comments.css"
import Travel from "../../Images/aeroplane.jpg"
import { FaStar } from "react-icons/fa";
const Comments = ({comments,rating}) => {
   console.log("muthayya",comments) 
  return (
    <>
      {comments && comments?.map((commented)=>( 
      <div style={{ marginBottom: "20px",border:"1px solid black" }}>
        <div style={{display:"flex"}}>
             <h6>{rating}</h6>
             <FaStar />
             <h6 style={{margin:"0 auto",fontWeight:"bold"}}>{commented?.postedBy?.firstname}</h6>
             </div>
              <p style={{marginLeft:"10px"}}>{commented?.coment}</p>
              <img src={Travel} style={{ height: "100px", width: "100px" }} />
              <img src={Travel} style={{ height: "100px", width: "100px" }} />
              <img src={Travel} style={{ height: "100px", width: "100px" }} />
          </div>
    ))}
   
    </>
  )
}

export default Comments
