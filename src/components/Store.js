import { createStore } from "redux";
import { data } from '../data/data.js';

// state
const initialState = {
  isHomePage: true,

  isModalOpen: false,

  numberOfMenuItems: [],

  data: data,


  
  //userData: [],
  category: '',
};

// actions

export const switchHeader = (page) => ({ 
  type: "switchHeader",
  page: page, 
});

export const openModal = () => ({ type: "openModal" });

export const closeModal = () => ({ type: "closeModal" });








export const setUserData = (userData) => ({ 
  type: "setUserData",
  userData: userData, 
});

function reducer(state = initialState, action) {





  if (action.type === "switchHeader") {
    const page = action.page;
    if(page === 'home') {
      return {
        ...state,
        isHomePage: true,
      };
    }
    return {
      ...state,
      isHomePage: false,
    };
  }
  if (action.type === "openModal") {
    return {
      ...state,
      isModalOpen: true,
    };
  }
  if (action.type === "closeModal") {
    return {
      ...state,
      isModalOpen: false,
    };
  }
  if (action.type === "setUserData") {
    const userData = action.userData;
    let data = state.data;
    data.push(userData);
    return {
      ...state,
      //userData: userData,
      data: data,
    };
  }
  return state;
}

export const store = createStore(reducer);