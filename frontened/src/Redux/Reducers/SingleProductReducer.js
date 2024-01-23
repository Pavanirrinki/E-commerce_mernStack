const initialState = {
    products:[],
    isLoading: false,
    error: null,
  };
  
  const SingleProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SINGLE_PRODUCT_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'SINGLE_PRODUCT_SUCCESS':
        return {
          ...state,
          products: action.payload,
          isLoading: false,
          error: null,
        };
      case 'SINGLE_PRODUCT_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default SingleProductReducer;