const initialState ={
    categorieswiseproducts:[],
    loading:false,
    error:null
}
const Searchproductcategoryreducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCHCATEGORIESWISEPRODUCTS_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'SEARCHCATEGORIESWISEPRODUCTS_SUCCESS':
        return {
          ...state,
          categorieswiseproducts: action.payload,
          isLoading: false,
          error: null,
        };
      case 'SEARCHCATEGORIESWISEPRODUCTS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default Searchproductcategoryreducer;