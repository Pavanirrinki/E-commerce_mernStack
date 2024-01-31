import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import { SearchproductcategoryAction } from '../../Redux/MiddlewareActions'
function Searchcategoryproducts() {

const {category} = useParams()
const dispatch = useDispatch()
const navigate = useNavigate()
useEffect(()=>{
    dispatch(SearchproductcategoryAction("ELECTRONICS"))
},[category])
const searchcategoryproducts = useSelector((state)=>state.Searchproductcategoryreducer)
console.log(searchcategoryproducts)
  return (
    <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
     {searchcategoryproducts && searchcategoryproducts?.categorieswiseproducts?.map((category)=>{
      return(
        <div style={{border:"1px solid black",padding:"10px 15px",marginLeft:"15px",flexWrap:"wrap",marginBottom:"10px"}} 
        onClick={()=>navigate(`/product/${category?._id}`)}>
          <img src={category?.images[0]} style={{height:"300px",width:"200px"}}/>
          <h6 style={{color:"#cccccc",fontWeight:"bold"}}>category?.Seller</h6>
          <h6>{category?.name}</h6>
          <h6>$ {category?.price}</h6>
          <button style={{border:"none",color:"#008000",fontWeight:"bold",backgroundColor:"#b3ffb3",padding:"0 5px",borderRadius:"10px"}}>Hot Deal</button>
          </div>
      )
     })}
    </div>
  )
}

export default Searchcategoryproducts
