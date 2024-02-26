import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import { SearchproductcategoryAction } from '../../Redux/MiddlewareActions'
function Searchcategoryproducts() {

const {category} = useParams()
const dispatch = useDispatch()
const navigate = useNavigate()
const [filteredprducts,setFilteredprducts] = useState(null)
useEffect(()=>{
    dispatch(SearchproductcategoryAction("ELECTRONICS"))
},[category])
const searchcategoryproducts = useSelector((state)=>state.Searchproductcategoryreducer)
useEffect(() => {
  const fetchData = async () => {
      try {
          const productsdata = await searchcategoryproducts?.categorieswiseproducts?.slice(0, 10);
          setFilteredprducts(productsdata);
      } catch (error) {
         
          console.error("Error fetching data:", error);
      }
  };

  fetchData(); 
}, []); 


const productsasperpage =(index) =>{
  const products = searchcategoryproducts?.categorieswiseproducts?.slice((index)*10,((index)*10)+10)
  setFilteredprducts(products)
}
console.log(filteredprducts,"fit");
console.log(searchcategoryproducts,"search")
  return (
    <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
     {filteredprducts?.length == 0 ?
  (searchcategoryproducts && searchcategoryproducts?.categorieswiseproducts?.map((category) => {
    return (
      <div style={{ border: "1px solid black", padding: "10px 15px", marginLeft: "15px", flexWrap: "wrap", marginBottom: "10px" }}
        onClick={() => navigate(`/product/${category?._id}`)}>
        <img src={category?.images[0]} style={{ height: "300px", width: "200px" }} />
        <h6 style={{ color: "#cccccc", fontWeight: "bold" }}>category?.Seller</h6>
        <h6>{category?.name}</h6>
        <h6>$ {category?.price}</h6>
        <button style={{ border: "none", color: "#008000", fontWeight: "bold", backgroundColor: "#b3ffb3", padding: "0 5px", borderRadius: "10px" }}>Hot Deal</button>
      </div>
    )
  })) :  (filteredprducts && filteredprducts?.map((category) => {
    return (
      <div style={{ border: "1px solid black", padding: "10px 15px", marginLeft: "15px", flexWrap: "wrap", marginBottom: "10px" }}
        onClick={() => navigate(`/product/${category?._id}`)}>
        <img src={category?.images[0]} style={{ height: "300px", width: "200px" }} />
        <h6 style={{ color: "#cccccc", fontWeight: "bold" }}>category?.Seller</h6>
        <h6>{category?.name}</h6>
        <h6>$ {category?.price}</h6>
        <button style={{ border: "none", color: "#008000", fontWeight: "bold", backgroundColor: "#b3ffb3", padding: "0 5px", borderRadius: "10px" }}>Hot Deal</button>
      </div>
    )
  })) }

   <div style={{display:"flex",width:"100%",justifyContent:"center"}}>


   {(searchcategoryproducts || filteredprducts) && Array.from({ length: Math.ceil((searchcategoryproducts?.categorieswiseproducts?.length) / 10) }, (_, index) => (
  (searchcategoryproducts?.categorieswiseproducts?.length !== 10) && 
    <button 
      style={{ border: 'none', borderRadius: "50%", padding: "0 10px", marginRight: "2px" }} 
      key={index} onClick={()=>productsasperpage(index)}
    >
      {index+1}
    </button>
))}

 
    </div> 
    </div>
  )
}

export default Searchcategoryproducts
