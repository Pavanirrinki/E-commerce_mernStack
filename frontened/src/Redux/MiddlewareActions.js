import { API } from "../API/API.js";
import axios from "axios"

export const signupActions = (payload)=>{
    return async (dispatch) =>{
        dispatch({ type: 'SIGNUP_REQUEST' });

       await axios
          .post(API+"signup", payload)
          .then((response) => {
           
            dispatch({
                type:"SIGNUP_SUCCESS",
                payload:response.data
            });
          })
          .catch((error) => {
             dispatch({
                type:'SIGNUP_FAILURE',
                payload:error.message
            });
            console.log(error.message,"pavan kumar")
          });
    }
}

export const categoriesActions = ()=>{
  return async (dispatch) =>{
      dispatch({ type: 'CATEGORIES_REQUEST' });

     await axios
        .get(API+"all_catgories")
        .then((response) => {
         console.log("response.data",response.data)
          dispatch({
              type:"CATEGORIES_SUCCESS",
              payload:response.data
          });
        })
        .catch((error) => {
           dispatch({
              type:'CATEGORIES_FAILURE',
              payload:error.message
          });
          console.log(error.message,"pavan kumar")
        });
  }
}

export const ProductsActions = ()=>{
  return async (dispatch) =>{
      dispatch({ type: 'PRODUCTS_REQUEST' });

     await axios
        .get(API+"get_all_product")
        .then((response) => {
         console.log("response.data",response.data)
          dispatch({
              type:"PRODUCTS_SUCCESS",
              payload:response.data
          });
        })
        .catch((error) => {
           dispatch({
              type:'PRODUCTS_FAILURE',
              payload:error.message
          });
          console.log(error.message,"pavan kumar")
        });
  }
}

export const ParticularCategoryAction =(category_id)=>{
  return async (dispatch) =>{
    dispatch({ type:'PARTICULARCATEGORY_REQUEST'});

   await axios
      .get(API+`all_products/${category_id}`)
      .then((response) => {
       console.log("response.data",response.data)
        dispatch({
            type:"PARTICULARCATEGORY_SUCCESS",
            payload:response.data
        });
      })
      .catch((error) => {
         dispatch({
            type:'PARTICULARCATEGORY_FAILURE',
            payload:error.message
        });
        console.log(error.message,"pavan kumar")
      });
}

}

export const ParticularProductAction =(product_id)=>{
  return async (dispatch) =>{
    dispatch({ type:'SINGLE_PRODUCT_REQUEST'});

   await axios
      .get(API+`product/${product_id}`)
      .then((response) => {
       console.log("response.data",response.data)
        dispatch({
            type:"SINGLE_PRODUCT_SUCCESS",
            payload:response.data
        });
      })
      .catch((error) => {
         dispatch({
            type:'SINGLE_PRODUCT_FAILURE',
            payload:error.message
        });
        console.log(error.message,"pavan kumar")
      });
}

}

export const loggeduserAction =(user_id)=>{
  return async (dispatch) =>{
    dispatch({ type:'USERDETAILS_REQUEST'});

   await axios
      .get(API+`particular_user/${user_id}`)
      .then((response) => {
       console.log("response.data",response.data)
        dispatch({
            type:"USERDETAILS_SUCCESS",
            payload:response.data
        });
      })
      .catch((error) => {
         dispatch({
            type:'USERDETAILS_FAILURE',
            payload:error.message
        });
        console.log(error.message,"pavan kumar")
      });
}

}