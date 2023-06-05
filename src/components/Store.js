import { createStore } from "redux";

// state
const initialState = {
  isModalOpen: false,

  //isSelectMenuButtonOpen: false,
  //isSelectMenuOpen: false,

  //listName: '',

  isSelectStateMenuButtonOpen: false,
  isSelectStateMenuOpen: false,

  isSelectDepartmentMenuButtonOpen: false,
  isSelectDepartmentMenuOpen: false,

  isClassActive: '',

  statesIndex: '',
  statesMenuItemId: 'ui-id-0',
  statesMenuItemIdSelected: 'ui-id-0',
  statesMenuItemNameSelected: 'Alabama',

  departmentIndex: '',
  departmentMenuItemId: 'ui-id-0',
  departmentMenuItemIdSelected: 'ui-id-0',
  departmentMenuItemNameSelected: 'Sales',
  
  userData: {},
};

// actions

export const openModal = () => ({ type: "openModal" });

export const closeModal = () => ({ type: "closeModal" });

/*export const setListName = (listName) => ({ 
  type: "setListName",
  listName: listName, 
});*/

export const openSelectMenu = (listName) => ({ 
  type: "openSelectMenu",
  listName: listName,  
});

export const closeSelectMenu = (listName) => ({ 
  type: "closeSelectMenu",
  listName: listName,  
});

export const handleMouseEnter = (listName, menuItemId, index) => ({ 
  type: "handleMouseEnter", 
  listName: listName,
  menuItemId: menuItemId,
  index: index,
});

export const handleMouseLeave = (listName, index) => ({ 
  type: "handleMouseLeave",
  listName: listName,
  index: index, 
});

export const setMenuItemIdSelected = (listName, menuItemIdSelected, menuItemNameSelected) => ({ 
  type: "setMenuItemIdSelected",
  listName: listName, 
  menuItemNameSelected: menuItemNameSelected,
  menuItemIdSelected: menuItemIdSelected,
});

export const setUserData = (userData) => ({ 
  type: "setUserData",
  userData: userData, 
});

function reducer(state = initialState, action) {
  /*if (action.type === "setListName") {
    const listName = action.listName;
    return {
      ...state,
      listName: listName,
    };
  }*/
  if (action.type === "openSelectMenu") {
    const listName = action.listName;
    if(listName === "state") {
      return {
        ...state,
        isSelectStateMenuButtonOpen: true,
        isSelectStateMenuOpen: true,
      };
    } else if (listName === "department") {
      return {
        ...state,
        isSelectDepartmentMenuButtonOpen: true,
        isSelectDepartmentMenuOpen: true,
      };
    }
  }
  if (action.type === "closeSelectMenu") {
    const listName = action.listName;
    if(listName === "state") {
      return {
        ...state,
        isSelectStateMenuButtonOpen: false,
        isSelectStateMenuOpen: false,
      };
    } else if (listName === "department") {
      return {
        ...state,
        isSelectDepartmentMenuButtonOpen: false,
        isSelectDepartmentMenuOpen: false,
      };
    }
  }

  if (action.type === "handleMouseEnter") {
    const listName = action.listName;
    const menuItemId = action.menuItemId;
    const index = action.index;
    if(listName === "state") {
      return {
        ...state,
        isClassActive: 'ui-state-active',
        statesMenuItemId: menuItemId,
        statesIndex: index,
      };
    } else if (listName === "department") {
      return {
        ...state,
        isClassActive: 'ui-state-active',
        departmentMenuItemId: menuItemId,
        departmentIndex: index,
      };
    }
  }
  if (action.type === "handleMouseLeave") {
    const listName = action.listName;
    const index = action.index;
    if(listName === "state") {
      return {
        ...state,
        isClassActive: '',
        statesIndex: index,
      };
    } else if (listName === "department") {
      return {
        ...state,
        isClassActive: '',
        departmentIndex: index,
      };
    }
  }


  /*if (action.type === "setMenuItemIdSelected") {
    const menuItemNameSelected = action.menuItemNameSelected;
    const menuItemIdSelected = action.menuItemIdSelected;
    return {
      ...state,
      menuItemNameSelected: menuItemNameSelected,
      menuItemIdSelected: menuItemIdSelected,
    };
  }*/
  if (action.type === "setMenuItemIdSelected") {
    const listName = action.listName;
    const menuItemNameSelected = action.menuItemNameSelected;
    const menuItemIdSelected = action.menuItemIdSelected;
    if(listName === "state") {
      return {
        ...state,
        statesMenuItemNameSelected: menuItemNameSelected,
        statesMenuItemIdSelected: menuItemIdSelected,
      };
    } else if (listName === "department") {
      return {
        ...state,
        departmentMenuItemNameSelected: menuItemNameSelected,
        departmentMenuItemIdSelected: menuItemIdSelected,
      };
    }
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