const initialState ={
    categories:[],
    loading:false,
    error:null
}
const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CATEGORIES_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'CATEGORIES_SUCCESS':
        return {
          ...state,
          categories: action.payload,
          isLoading: false,
          error: null,
        };
      case 'CATEGORIES_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default CategoriesReducer;