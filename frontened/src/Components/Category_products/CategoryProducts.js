import React, { useEffect, useState } from 'react';
import './CategoryProducts.css';
import { useSelector,useDispatch } from 'react-redux';
import { ParticularCategoryAction} from '../../Redux/MiddlewareActions';
import {useNavigate} from "react-router-dom";
import {BsArrowLeftCircleFill,BsArrowRightCircleFill} from "react-icons/bs"
function CategoryProducts({categoryproduct}) {
 const particularcategoryproducts = useSelector((state)=>(state.ParticularCategoryReducer.products))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categoryproductsforslider,setCategoryproductsforslide] = useState(null)
  useEffect(()=>{
dispatch(ParticularCategoryAction(categoryproduct))
  },[])
 useEffect(()=>{

 },[])
const forwardimages = ()=>{
  
}
const backwardimages =() =>{
  
}
  return (
    <div style={{marginBottom:"50px"}}>
      <h5 className="category_heading">Best Of {categoryproduct}</h5>
      <div style={{display:"flex",alignItems:"center"}}>
        <BsArrowLeftCircleFill className="arrow1"  onClick={()=>backwardimages()}/>
        <div className='image-slider'>
  {particularcategoryproducts?.map((product, idx) => {
    return (
      <img
        key={idx}
        src={product.images[0]}
        alt={`image-${idx}`}
        
        style={{ width: "200px", height: "200px", border: "1px black solid", marginLeft: "10px" }}
        onClick={()=>navigate(`/product/${product?._id}`)}
      />
    );
  })}
</div>

        <BsArrowRightCircleFill className="arrow1"   onClick={()=>forwardimages()} />
      </div>
    </div>
  );
}

export default CategoryProducts;
