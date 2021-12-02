export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccessfull = (user) => ({
  type: "LOGIN_SUCCESSFULL",
  payload: user,
});

export const LoginFailed = () => ({
  type: "LOGIN_FAILED",
});

export const Logout = () => ({
  type: "LOGOUT",
});

export const UpdateStart = (userCredentials) => ({
  type: "UPDATE_START",
});

export const UpdateSuccessfull = (user) => ({
  type: "UPDATE_SUCCESSFULL",
  payload: user,
});

export const UpdateFailed = () => ({
  type: "UPDATE_FAILED",
});

export const Follow = (user) => ({
  type: "FOLLOW",
  payload: user,
});
export const Unfollow = (user) => ({
  type: "UNFOLLOW",
  payload: user,
});
