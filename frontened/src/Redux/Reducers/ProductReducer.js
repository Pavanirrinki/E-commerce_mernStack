

const initialState = {
    products:[],
    isLoading: false,
    error: null,
  };
  
  const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PRODUCTS_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'PRODUCTS_SUCCESS':
        return {
          ...state,
          products: action.payload,
          isLoading: false,
          error: null,
        };
      case 'PRODUCTS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default ProductsReducer;
  