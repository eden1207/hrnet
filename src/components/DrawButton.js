import React from 'react'


function switchButtonParameters(isOpen) {
    if(isOpen === true) {
        return {
            class: 'ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-open ui-corner-top',
            ariaExpanded: true,
            setIsOpen: false
        }
    } 
    return {
        class: 'ui-selectmenu-button ui-button ui-widget ui-selectmenu-button-closed ui-corner-all',
        ariaExpanded: false,
        setIsOpen: true
    }   
}

export default function DrawButton({ ids, menuItemId, menuItemIdSelected, menuItemNameSelected, isOpen, setIsOpen }) {
    const parameters = switchButtonParameters(isOpen)
    return (
        <span 
            id={ids.button}
            className={parameters.class}
            tabIndex={0} // makes the element focusable (0) or not (-1) for sequential focus navigation
            role={"combobox"}
            aria-expanded={parameters.ariaExpanded} // Indicate if the menu is open or closed
            aria-controls={ids.element + 'list'} // Indicate that this element controles the element which has the same id
            aria-autocomplete={"list"} // indicates whether inputting text could trigger display of one or more predictions
            aria-owns={ids.menu} // defines a relationship between parent and its child elements
            aria-haspopup={true} // indicates the availability
            aria-activedescendant={menuItemId} // identifies the currently active element when focus is on a composite
            aria-labelledby={menuItemIdSelected} // identifies the element id selected
            aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
            onClick={() => {
                setIsOpen(parameters.setIsOpen);
            }}
        >
            <span className='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s'></span>
            <span className='ui-selectmenu-text'>
                {menuItemNameSelected}
            </span>
        </span>
    )
}