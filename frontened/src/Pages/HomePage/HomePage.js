import React, { useState, useEffect, useRef } from 'react';
import "./HomePage.css"
import { API } from '../../API/API';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { categoriesActions } from '../../Redux/MiddlewareActions';
import  Carousel  from '../../Components/Carousel';
import CategoryProducts from '../../Components/Category_products/CategoryProducts';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import "../../Components/Category_products/CategoryProducts.css";
import { Link } from 'react-router-dom';

function HomePage() {

  const searchstate = useSelector((state)=>(state.SearchReducer))
  const dispatch = useDispatch();
  const [searchresults,setSearchresults] = useState(null)
  const [slide, setSlide] = useState(0);
  const categoriesdata = useSelector((state)=>state.CategoriesReducer.categories.category);
  // REDUX STATE FOR CATEGORY(ALL CATEGORIES DATA)

  useEffect( ()=>{
    const responsedata = async () =>{
await dispatch(categoriesActions())

    }
    responsedata();
   },[])
 useEffect(()=>{
  if(searchstate.searchdata){
axios.get(API+`search/${searchstate?.searchdata}`).then((res)=>setSearchresults(res?.data)).catch((err)=>err.message)
  }
 },[searchstate.searchdata]) 
const forwardimages = () => {
    setSlide((prevSlide) => (prevSlide + 1) % categoriesdata.length);
  };

  const previousimages = () => {
    setSlide((prevSlide) => (prevSlide - 1 + categoriesdata.length) % categoriesdata.length);
  };




  return (
    <div>
      {searchstate.loading && searchstate?.searchdata ?
      <div style={{zIndex:"1000000",backgroundColor:"white",width:"100%",paddingTop:"30px"}}>
      
          {searchresults && searchresults?.map((data,index)=>{
            return(
              <div key ={index} >
              <p style={{border:"1px solid black",width:"80%",borderRadius:"10px",textAlign:"center",margin:"6px auto"}}>{data.name}</p>
              </div>
            )
          })}
    

    </div> :
    <div>
    <ul style={{listStyleType:"none",marginTop:"10px"}} className='categories-types'>
    {categoriesdata && categoriesdata?.length >9  &&
<BsArrowLeftCircleFill className="arrow1"  onClick={previousimages} style={{margin:"auto 0"}}/> }
  {categoriesdata && categoriesdata?.map((category,idx)=>{
    return(
      <Link to={`/particularcategory/${category?.name}`} style={{textDecoration:"none",color:"black"}}>
      <div style={{position:"relative",cursor:"pointer"}}  
       className={idx >= slide && idx < slide + 9 ? 'visible' : 'hidden'}>
      <img src={category.Image} style={{width:"100px",height:"100px"}} />
  <li style={{textAlign:"center",fontWeight:"bold",fontSize:"12px",marginTop:"5px"}}>{category?.name}</li>
 
  </div>
  </Link>
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
</div>  }

</div>
  )
}

export default HomePage;
