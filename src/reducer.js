const initialState = {
  signinError: false,
  signinLoading: false,
  name: '',
  passwordReset: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN_REQUEST':
    case 'PASSWORD_REQUEST':
      return {
        ...state,
        signinLoading: true
      };
    case 'SIGNIN_REQUEST_SUCCEEDED':
      return {
        ...state,
        signinLoading: false,
        name: action.name
      };
    case 'PASSWORD_REQUEST_SUCCEEDED':
      return {
        ...state,
        signinLoading: false,
        passwordReset: true
      };
    case 'SIGNIN_REQUEST_FAILED':
    case 'PASSWORD_REQUEST_FAILED':
      return {
        ...state,
        signinLoading: false,
        signinError: true
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        signinError: false
      };
    case 'CLEAR_PASSWORD':
      return {
        ...state,
        passwordReset: false
      };
    default:
      return state;
  }
};

export default reducer;
