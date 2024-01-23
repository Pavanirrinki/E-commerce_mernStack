const initialState = {
    user: null,
    isLoading: false,
    error: null,
  };
  
  const UserDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USERDETAILS_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case 'USERDETAILS_SUCCESS':
        return {
          ...state,
          user: action.payload,
          isLoading: false,
          error: null,
        };
      case 'USERDETAILS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default UserDetailsReducer  