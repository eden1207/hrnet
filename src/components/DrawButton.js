import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { openSelectMenu, closeSelectMenu } from "./Store.js";


export default function DrawButton({ selectmenuId, ids }) {
    const dispatch = useDispatch();

    const isSelectMenuButtonOpen = useSelector((state) => {
        if(selectmenuId === "state") {
            return state.isSelectStateMenuButtonOpen
        } else if(selectmenuId === "department") {
            return state.isSelectDepartmentMenuButtonOpen
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

    const menuItemIdSelected = useSelector((state) => {
        if(selectmenuId === "state") {
            return state.statesMenuItemIdSelected
        } else if(selectmenuId === "department") {
            return state.departmentMenuItemIdSelected
        } else{
            return null
        }
    });

    const menuItemNameSelected = useSelector((state) => {
        if(selectmenuId === "state") {
            return state.statesMenuItemNameSelected
        } else if(selectmenuId === "department") {
            return state.departmentMenuItemNameSelected
        } else{
            return null
        }
    });


    useEffect(() => {
        document.addEventListener('keydown', detectKeydown)
    });
    
    function detectKeydown(e) {
        /*const keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        };*/
        //console.log("Clicked key: ", e.key)
        //console.log(e.target.id)
        /*if(e.target.id === 'state') {
            console.log('state')
        }*/

        if(e.key === ' ') {
            console.log(e.target.id)
            if(e.target.id === "state-button") {
                dispatch(openSelectMenu('state'));
            } else if (e.target.id === "department-button") {
                dispatch(openSelectMenu('department'));
            } else{
                console.log('Unknown Id')
            }
        }

        if(e.key === 'Escape') {
            if(e.target.id === "state-button") {
                dispatch(closeSelectMenu('state'));
            } else if (e.target.id === "department-button") {
                dispatch(closeSelectMenu('department'));
            } else{
                console.log('Unknown Id')
            }
        }
    }


    return isSelectMenuButtonOpen ? (
        <span 
            id={ids.button}
            className='ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-open ui-corner-top'
            tabIndex={0} // makes the element focusable (0) or not (-1) for sequential focus navigation
            role={"combobox"}
            aria-expanded={true} // Indicate if the menu is open or closed
            aria-controls={'stateslist'} // Indicate that this element controles the element which has the same id
            aria-autocomplete={"list"} // indicates whether inputting text could trigger display of one or more predictions
            aria-owns={ids.menu} // defines a relationship between parent and its child elements
			aria-haspopup={true} // indicates the availability
            aria-activedescendant={menuItemId} // identifies the currently active element when focus is on a composite
            aria-labelledby={menuItemIdSelected} // identifies the element id selected
            aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
            onClick={() => {
                dispatch(closeSelectMenu(selectmenuId));
            }}
        >
            <span className='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s'></span>
            <span className='ui-selectmenu-text'>
                {menuItemNameSelected}
            </span>
        </span>
    ) : (
        <span 
            id={ids.button}
            className='ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-closed ui-corner-all'
            tabIndex={0} // makes the element focusable (0) or not (-1) for sequential focus navigation
            role={"combobox"}
            aria-expanded={false} // Indicate if the menu is open or closed
            aria-controls={'stateslist'} // Indicate that this element controles the element which has the same id
            aria-autocomplete={"list"} // indicates whether inputting text could trigger display of one or more predictions
            aria-owns={ids.menu} // defines a relationship between parent and its child elements
            aria-haspopup={true} // indicates the availability
            aria-activedescendant={menuItemId} // identifies the currently active element when focus is on a composite
            aria-labelledby={menuItemIdSelected} // identifies the element id selected
            aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
            onClick={() => {
                dispatch(openSelectMenu(selectmenuId));
            }}
        >
            <span className='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s'></span>
            <span className='ui-selectmenu-text'>
                {menuItemNameSelected}
            </span>
        </span>
    )  
}