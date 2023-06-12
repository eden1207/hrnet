import { createStore } from "redux";

// state
const initialState = {
  isModalOpen: false,

  numberOfMenuItems: [],
  tab: 0,
  tab2: 0,


  
  userData: {},
};

// actions

export const openModal = () => ({ type: "openModal" });

export const closeModal = () => ({ type: "closeModal" });




export const setMenusItemsIndex = () => ({ type: "setMenusItemsIndex" });

export const sendIndex = () => ({ type: "sendIndex" });


export const setUserData = (userData) => ({ 
  type: "setUserData",
  userData: userData, 
});

function reducer(state = initialState, action) {


  if (action.type === "setMenusItemsIndex") {
    let tab = state.tab;
    tab+=1;
    return {
      ...state,
      tab: tab,
    };
  }

  if (action.type === "sendIndex") {
    //let tab2 = action.tab2;
    let tab2 = state.tab2;
    tab2+=1;
    return {
      ...state,
      tab2: tab2,
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
    return {
      ...state,
      userData: userData,
    };
  }
  return state;
}

export const store = createStore(reducer);