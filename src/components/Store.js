import { createStore } from "redux";

// state
const initialState = {
  isHomePage: true,

  isModalOpen: false,

  numberOfMenuItems: [],
  tab: 0,
  tab2: 0,

  firstIndex: [],
  data: [],


  
  //userData: data,
  category: '',
};

// actions

export const switchHeader = (page) => ({ 
  type: "switchHeader",
  page: page, 
});

export const openModal = () => ({ type: "openModal" });

export const closeModal = () => ({ type: "closeModal" });





export const setMenusItemsIndex = () => ({ type: "setMenusItemsIndex" });

export const sendIndex = () => ({ type: "sendIndex" });

export const setFirstIndex = (number) => ({ 
  type: "setFirstIndex",
  number: number, 
});

export const setData = (selectmenuId) => ({ 
  type: "setData",
  selectmenuId: selectmenuId, 
});


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





  if (action.type === "setFirstIndex") {
    const number = action.number;
    let firstIndex = state.firstIndex;
    firstIndex.push(number);
    return {
      ...state,
      firstIndex: firstIndex,
    };
  }

  if (action.type === "setData") {
    const selectmenuId = action.selectmenuId;
    const selectMenu = document.getElementById(selectmenuId);
    let tab = state.data;
    for (let i = 0; i < selectMenu.length; i++) {
        tab.push(selectMenu.options[i].text);
    }
    return {
      ...state,
      data: tab,
    };
  }








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
    return {
      ...state,
      userData: userData,
    };
  }
  return state;
}

export const store = createStore(reducer);