import { createStore } from "redux";
import { data } from '../data/data.js';

/**
 * States to manage different elements of the website
 * isHomePage is a state to set the good header as function of the web site page
 * isModalOpen is the state to open/close the modal when the user clicks on the save button
 * data is the state containing all user data
 */
const initialState = {
  isHomePage: true,
  isModalOpen: false,
  data: data,
};

/**
 * Actions 
 * 
 * switchHeader: to control the header configuration
 * openModal/closeModal: to open/close the modal after the user click on the save button
 * setUserData: to update the user data after user's sign up
 */
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
      data: data,
    };
  }
  return state;
}

export const store = createStore(reducer);