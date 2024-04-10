import React from "react";
import { createStore } from "redux";

const initialState = {
  products: [],
};  

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "UPDATE_PRODUCT":
        return {
            ...state,
            products: [ action.payload],
        }
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
