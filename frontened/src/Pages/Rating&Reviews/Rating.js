import React from 'react'
import { FaStar } from "react-icons/fa";
import "./Rating.css";
import Comments from '../Comments/Comments.js';
function Rating({Rating}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
        <div style={{display:"flex",flexDirection:"column",minWidth:"15%",marginLeft:"5%"}}>
        <h6>Customer Reviews</h6>
        <div style={{display:"flex",justifyContent:"space-between"}}>
         {[1,2,3,4,5].map(()=>{
            return (
                <span>
                    <FaStar />
                </span>
            )
         })}
         <p>{Rating} out 5</p>
        </div>
     <h6><span style={{fontSize:"20px"}}>5</span><FaStar style={{marginBottom:"8px"}}/>
     <input type="range"  name="vol" min="0" max="5"/></h6>
     <h6><span style={{fontSize:"20px"}}>4</span><FaStar style={{marginBottom:"8px"}}/>
     <input type="range"  name="vol" min="0" max="5"/></h6>
     <h6><span style={{fontSize:"20px"}}>3</span><FaStar style={{marginBottom:"8px"}}/>
     <input type="range"  name="vol" min="0" max="5"/></h6>
     <h6><span style={{fontSize:"20px"}}>2</span><FaStar style={{marginBottom:"8px"}}/>
     <input type="range"  name="vol" min="0" max="5"/></h6>
     <h6><span style={{fontSize:"20px"}}>1</span><FaStar style={{marginBottom:"8px"}}/>
     <input type="range"  name="vol" min="0" max="5"/></h6>
    </div>
   
    </div>
  )
}

export default Rating
