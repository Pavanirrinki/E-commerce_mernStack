import React,{useState} from 'react'
import "./Dropdown.css"
import { FASHION } from '../../Data/Data.js'
function Dropdown({activeCategory}) {
  const [subactiveCategory,setSubactiveCategory] = useState(null);
  const [subactiveCategoryid,setSubactiveCategoryid] = useState(0);
  const Selectsubcategory = (category) => {
    setSubactiveCategory(category);
   const daata = FASHION.findIndex((category1)=>category1?.reference?.toString() === category);
   setSubactiveCategoryid(daata)
    
  }
//  console.log(subactiveCategoryid)

  return (
<div>

<div  className='dropdown-content-products dropdown-content-container'>
    <ul style={{display:"flex",flexDirection:"column",listStyleType:"none"}}>
      {activeCategory === "fashion" &&
        <div>
{FASHION?.map((fashion)=>(
   <li onMouseOver={() => {Selectsubcategory(fashion.reference)}} >{fashion?.category}</li>
))}
 </div>}


{activeCategory === "electronics" &&
        <><li>Electronic</li><li>Electronic</li><li>Electronic</li><li>Electronic</li><li>Electronic</li></>}


{activeCategory === "home & furniture" &&
        <><li>home&furniture</li><li>home&furniture</li><li>home&furniture</li><li>home&furniture</li>
        <li>home&furniture</li></>}


{activeCategory === "beauty & toys" &&
        <><li>Beauty&Toys</li><li>Beauty&Toys</li><li>Beauty&Toys</li><li>Beauty&Toys</li>
        <li>Beauty&Toys</li></>}
    </ul>


  <ul style={{display:"flex",flexDirection:"column",listStyleType:"none"}}>
    {FASHION[subactiveCategoryid].subcategory?.map((subcat)=>(<li>{subcat}</li>))}
    </ul>
    </div>
</div>
  )
}

export default Dropdown
