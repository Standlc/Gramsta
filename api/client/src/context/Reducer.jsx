const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESSFULL":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILED":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESSFULL":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILED":
      return {
        user: state.user,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case "FOLLOW":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    /* case 'UNFOLLOW':
            return {
                user: null,
                isFetching: false,
                error: true,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter((following) => following !== action.payload)
                }
            };*/
    default:
      return { ...state };
  }
};
export default Reducer;

/*return {
                user: null,
                isFetching: false,
                error: true,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter((following) => following !== action.payload)
                }
            };*/
