const initialState = {
    products:[],
    isLoading: false,
    error: null,
  };
  
  const ParticularCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PARTICULARCATEGORY_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'PARTICULARCATEGORY_SUCCESS':
        return {
          ...state,
          products: action.payload,
          isLoading: false,
          error: null,
        };
      case 'PARTICULARCATEGORY_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default ParticularCategoryReducer;