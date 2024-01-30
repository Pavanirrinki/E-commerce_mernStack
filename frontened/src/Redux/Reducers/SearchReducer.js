const initialState ={
 loading:false,
 searchdata:null,
 error:null
}
const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEARCH_REQUEST':
        console.log(action.payload)
        return {
          ...state,
          loading: true,
          searchdata:action.payload,
          error: null,
        };
        default:
        return state;
    }
  };

  export default SearchReducer;