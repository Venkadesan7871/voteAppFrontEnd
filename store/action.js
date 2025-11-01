// action types
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

// action creators
export const increment = () => {
  return { type: INCREMENT };
};

export const decrement = () => {
  return { type: DECREMENT };
};

export const reset = () => {
  return { type: RESET };
};

export const updateUserDetails = (data) => {
  return { type: "UPDADE_USER_DETAILS", data: data }
}
