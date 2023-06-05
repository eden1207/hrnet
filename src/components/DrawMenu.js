import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { states } from '../data/states.js'
import { departments } from '../data/departments.js'
import { handleMouseEnter, handleMouseLeave, setMenuItemIdSelected } from "./Store.js";


function giveListStyle(selectmenuId) {
    if(selectmenuId === "state") {
        return {
            top: 679.5,
            left: 630
        }
    } else if(selectmenuId === "department") {
        return {
            top: 833.9,
            left: 614.4
        }
    } else{
        return null
    }
}

function setListData(selectmenuId) {
    if(selectmenuId === "state") {
        return states
    } else if(selectmenuId === "department") {
        return departments
    } else{
        return null
    }
}


export default function DrawMenu({ selectmenuId, ids }) {
    const dispatch = useDispatch();

    const isSelectMenuOpen = useSelector((state) => {
        if(selectmenuId === "state") {
            return state.isSelectStateMenuOpen
        } else if(selectmenuId === "department") {
            return state.isSelectDepartmentMenuOpen
        } else{
            return null
        }
    });

    const index = useSelector((state) => {
        if(selectmenuId === "state") {
            return state.statesIndex
        } else if(selectmenuId === "department") {
            return state.departmentIndex
        } else{
            return null
        }
    });

    const menuItemId = useSelector((state) => {
        if(selectmenuId === "state") {
            return state.statesMenuItemId
        } else if(selectmenuId === "department") {
            return state.departmentMenuItemId
        } else{
            return null
        }
    });

    function setUiStateActiveTab(isClassActiveTab, index) {
        isClassActiveTab[index]='ui-state-active';
        return isClassActiveTab
    }

    const list = setListData(selectmenuId);

    let isClassActiveTab = [];
    for(let i=0; i<list.length; i++) {
        isClassActiveTab.push('')
    }

    const uiStateActiveTab = setUiStateActiveTab(isClassActiveTab, index);

    const listStyle = giveListStyle(selectmenuId);
    
    return isSelectMenuOpen ? (
        <div 
            className='ui-selectmenu-menu ui-front ui-selectmenu-open' // change ui-select-open ajouté
            style = {listStyle}
        > 
            <ul 
                id={ids.menu}
                className='ui-menu ui-corner-bottom ui-widget ui-widget-content'
                style = {{
                    width: 256
                }}
                tabIndex={0} // makes the element focusable (0) or not (-1) for sequential focus navigation
                role='listbox'
                aria-hidden={false} // indicates whether the element is exposed to an accessibility API
                aria-labelledby={ids.button} // identifies the element id selected
                aria-activedescendant={menuItemId} // identifies the currently active element when focus is on a composite
                aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
            >
                {
                    list.map((listElement, index) => (
                        <li 
                            key={'ui-id-'+ index} 
                            className='ui-menu-item'
                        >
                            <div 
                                id={'ui-id-' + index}
                                className={'ui-menu-item-wrapper ' + uiStateActiveTab[index]} // change // ui-state-active en plus au survol
                                tabIndex={-1} // makes the element focusable (0) or not (-1) for sequential focus navigation
                                role='option'
                                aria-selected={false} // indicates the current "selected" state of various widgets
                                onMouseEnter={() => {
                                    dispatch(handleMouseEnter(selectmenuId, 'ui-id-' + index, index))
                                }}
                                onMouseLeave={() => {
                                    dispatch(handleMouseLeave(selectmenuId, index))
                                }}
                                onClick={() => {
                                    dispatch(setMenuItemIdSelected(selectmenuId, 'ui-id-' + index, list[index].name))
                                }}
                            >
                                {listElement.name}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    ) : (
        <div 
            className='ui-selectmenu-menu ui-front'
            style = {listStyle}
        > 
            <ul 
                id={ids.menu}
                className='ui-menu ui-corner-bottom ui-widget ui-widget-content'
                style = {{
                    width: 256
                }}
                tabIndex={0} // makes the element focusable (0) or not (-1) for sequential focus navigation
                role='listbox'
                aria-hidden={true} // indicates whether the element is exposed to an accessibility API
                aria-labelledby={ids.button} // identidies the element id selected
                aria-activedescendant={menuItemId} // identifies the currently active element when focus is on a composite
                aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
            >
                {
                    list.map((listElement, index) => (
                        <li 
                            key={'ui-id-'+ index} 
                            className='ui-menu-item'
                        >
                            <div 
                                id={'ui-id-'+ index}
                                className='ui-menu-item-wrapper'
                                tabIndex={-1} // makes the element focusable (0) or not (-1) for sequential focus navigation
                                role='option'
                                aria-selected={false} // indicates the current "selected" state of various widgets
                            >
                                {listElement.name}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )  
}