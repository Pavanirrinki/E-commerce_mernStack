import React, { useEffect, useState } from 'react';
import './CategoryProducts.css';
import groceries from "../../Images/6ca8f02f56d48f0daf38063da995e763.png"
import mobiles from "../../Images/download.jpeg"
import Travel from "../../Images/aeroplane.jpg"
import Toys_beauty from "../../Images/images.jpeg"
import Two_wheeler from "../../Images/bike-png-from-pngfre-36.png"
import Appliances from "../../Images/Electronics.jpg"
import Electronics from "../../Images/lovepik-computer-notebook.png"
import Home_furniture from "../../Images/Electronic-Kitchen-Appliances.png"
import Fashion from "../../Images/fashion-verge.avif"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { useSelector,useDispatch } from 'react-redux';
import { ParticularCategoryAction} from '../../Redux/MiddlewareActions';
import {useNavigate} from "react-router-dom";

function CategoryProducts({categoryproduct}) {
  const [slide, setSlide] = useState(0);
  const particularcategoryproducts = useSelector((state)=>(state.ParticularCategoryReducer.products))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
dispatch(ParticularCategoryAction(categoryproduct))
  },[])
  const images = [Travel,mobiles,groceries,Fashion,Home_furniture,Electronics,Appliances,Two_wheeler,Toys_beauty];

  const forwardimages = () => {
    setSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const previousimages = () => {
    setSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div style={{marginBottom:"50px"}}>
      <h5 className="category_heading">Best Of {categoryproduct}</h5>
      <div style={{display:"flex",alignItems:"center"}}>
        {/* <BsArrowLeftCircleFill className="arrow1" onClick={previousimages} /> */}
        <div className='image-slider'>
  {particularcategoryproducts?.map((product, idx) => {
    return (
      <img
        key={idx}
        src={product.images[0]}
        alt={`image-${idx}`}
         className={idx >= slide && idx < slide + 6 ? 'visible' : 'hidden'}
        style={{ width: "200px", height: "200px", border: "1px black solid", marginLeft: "10px" }}
        onClick={()=>navigate(`/product/${product?._id}`)}
      />
    );
  })}
</div>

        {/* <BsArrowRightCircleFill className="arrow1"   onClick={forwardimages} /> */}
      </div>
    </div>
  );
}

export default CategoryProducts;
