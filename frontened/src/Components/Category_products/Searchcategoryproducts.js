import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SearchproductcategoryAction } from '../../Redux/MiddlewareActions'
function Searchcategoryproducts() {

const {category} = useParams()
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(SearchproductcategoryAction(category))
},[category])
const searchcategoryproducts = useSelector((state)=>state.Searchproductcategoryreducer)
console.log(searchcategoryproducts)
  return (
    <div>
     
    </div>
  )
}

export default Searchcategoryproducts
