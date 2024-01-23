

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default signupReducer;
