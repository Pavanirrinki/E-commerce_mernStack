import React, { useState, useEffect } from 'react';
import "./HomePage.css"
import { useSelector,useDispatch } from 'react-redux';
import { ParticularCategoryAction, categoriesActions } from '../../Redux/MiddlewareActions';
import  Carousel  from '../../Components/Carousel';
import CategoryProducts from '../../Components/Category_products/CategoryProducts';
import Dropdown from '../../Components/Dropdowns/Dropdown';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import "../../Components/Category_products/CategoryProducts.css";

function HomePage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const dispatch = useDispatch();
  const [slide, setSlide] = useState(0);
  const categoriesdata = useSelector((state)=>state.CategoriesReducer.categories.category);
  // REDUX STATE FOR CATEGORY(ALL CATEGORIES DATA)

  useEffect( ()=>{
    const responsedata = async () =>{
await dispatch(categoriesActions())

    }
    responsedata();
   },[])
  const handleMouseOver = (category) => {
    setActiveCategory(category);
  }

  const handleMouseOut = () => {
    setActiveCategory(null);
  }

 

  const forwardimages = () => {
    setSlide((prevSlide) => (prevSlide + 1) % categoriesdata.length);
  };

  const previousimages = () => {
    setSlide((prevSlide) => (prevSlide - 1 + categoriesdata.length) % categoriesdata.length);
  };




  return (
    <div>
    <ul style={{listStyleType:"none",marginTop:"10px"}} className='categories-types'>
    {categoriesdata && categoriesdata?.length >9  &&
<BsArrowLeftCircleFill className="arrow1"  onClick={previousimages} style={{margin:"auto 0"}}/> }
  {categoriesdata && categoriesdata?.map((category,idx)=>{
    console.log(category.name,"pavannnnnn kumrrrrrr")
    return(
      <div style={{position:"relative",cursor:"pointer"}}  onMouseOver={() => handleMouseOver(category.name.toLowerCase())} 
      onMouseOut={handleMouseOut} className={idx >= slide && idx < slide + 9 ? 'visible' : 'hidden'}>
      <img src={category.Image} style={{width:"100px",height:"100px"}} />
  <li style={{textAlign:"center",fontWeight:"bold",fontSize:"12px",marginTop:"5px"}}>{category?.name}</li>
  {activeCategory == category.name.toLowerCase() && <Dropdown activeCategory={activeCategory}/>}
  </div>
    )
  })}
{categoriesdata && categoriesdata?.length >9 &&
    <BsArrowRightCircleFill className='arrow1' style={{margin:"auto 0",zIndex:"100px"}} onClick={forwardimages} />   }
          </ul>
<div>
<Carousel />
</div>
<CategoryProducts categoryproduct='ELECTRONICS'/>
<CategoryProducts categoryproduct='ELECTRONICS'/>
<CategoryProducts categoryproduct='ELECTRONICS'/>


</div>
  )
}

export default HomePage
