import React from 'react'


function setUiStateActiveTab(listItems, index) {
    let isClassActiveTab = [];
    for(let i=0; i<listItems.length; i++) {
        isClassActiveTab.push('')
    }
    isClassActiveTab[index]='ui-state-active';
    return isClassActiveTab
}


function switchMenuParameters(isOpen) {
    if(isOpen === true) {
        return {
            class: 'ui-selectmenu-menu ui-front ui-selectmenu-open',
            ariaHidden: false,
        }
    } 
    return {
        class: 'ui-selectmenu-menu ui-front',
        ariaHidden: true,
    }
}


function ListItems({ isOpen, listItems, indexMenuItemFocused, setIsOpen, setMenuItemId, setMenuItemIdSelected, setMenuItemNameSelected, setIndexMenuItemFocused, setIndex }) {
    /**
     * uiStateActiveTab: provides a tab of elements, which are the class of each items of a list.
     *                   It provides for each item a class uiStateActiveTab(index) = ''/'ui-state-active'
     */
    const uiStateActiveTab = setUiStateActiveTab(listItems, indexMenuItemFocused);
    return isOpen ? (
        listItems.map((listElement, index) => (
            <li 
                key={'ui-id-'+ index} 
                className='ui-menu-item'
            >
                <div 
                    id={'ui-id-' + index} 
                    className={'ui-menu-item-wrapper ' + uiStateActiveTab[index]}
                    tabIndex={-1} // makes the element focusable (0) or not (-1) for sequential focus navigation
                    role='option'
                    aria-selected={false} // indicates the current "selected" state of various widgets
                    onMouseEnter={() => {
                        setIndexMenuItemFocused(index);
                        setMenuItemId(index);
                        setIndex(index)
                    }}
                    onClick={() => {
                        setMenuItemIdSelected('ui-id-' + index);
                        setMenuItemNameSelected(listItems[index]);
                        setIsOpen(false);
                    }}
                >
                    {listElement}
                </div>
            </li>
        ))
        
    ) : (
        listItems.map((listElement, index) => (
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
    )
}


export default function DrawMenu({ ids, isOpen, listStyle, menuItemId, listItems, indexMenuItemFocused, setIsOpen, setMenuItemId, setMenuItemIdSelected, setMenuItemNameSelected, setIndexMenuItemFocused, setIndex, offset }) {
    const parameters = switchMenuParameters(isOpen)
    return (
        <div 
            className={parameters.class}
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
                aria-hidden={parameters.ariaHidden} // indicates whether the element is exposed to an accessibility API
                aria-labelledby={ids.button} // identifies the element id selected
                aria-activedescendant={menuItemId} // identifies the currently active element when focus is on a composite
                aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
            >
                <ListItems 
                    isOpen={isOpen} 
                    listItems={listItems} 
                    indexMenuItemFocused={indexMenuItemFocused}
                    setIsOpen={setIsOpen}
                    setMenuItemId={setMenuItemId} 
                    setMenuItemIdSelected={setMenuItemIdSelected} 
                    setMenuItemNameSelected={setMenuItemNameSelected} 
                    setIndexMenuItemFocused={setIndexMenuItemFocused}
                    setIndex={setIndex}
                    offset={offset}
                />
            </ul>
        </div>
    ) 
}