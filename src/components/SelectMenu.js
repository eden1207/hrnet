import React, { useEffect, useState } from 'react';


export default function SelectMenu({ options, SelectMenuID, setData }) {
    const ids = {
        element: SelectMenuID,    
        button: SelectMenuID + "-button",
        menu: SelectMenuID + "-menu"
    };

    /**
     * isOpen: open/close the select menu
     * indexMenuItemSelected: index of the list item selected
     * indexMenuItemFocused: index of the list item focused (to change his class on mousse enter/leave)
     */
    const [isOpen, setIsOpen] = useState(false);
    const [indexMenuItemSelected, setIndexMenuItemSelected] = useState(0);
    const [indexMenuItemFocused, setIndexMenuItemFocused] = useState(0);

    //const [isMounted, setIsMounted] = useState(true);
    //const [count, setCount] = useState(0);





    // useEffect pour la navigation clavier
    useEffect(() => {
        //if(isMounted) {
            document.addEventListener('keydown', detectKeydown);
            //setIsMounted(false)
            //setCount(count+1)
            //return () => document.removeEventListener('keydown', detectKeydown);
        //}
    });

    /*useEffect(() => {
        if(!isMounted) {
            setIsMounted(true)
        }
    });*/

    
    function detectKeydown(event) {
        const keyCode = {
            BACKSPACE: 'Backspace',
            COMMA: ',',
            DELETE: 'Delete',
            DOWN: 'ArrowDown',
            END: 'End',
            ENTER: 'Enter',
            ESCAPE: 'Escape',
            HOME: 'Home',
            LEFT: 'ArrowLeft',
            PAGE_DOWN: 'PageDown',
            PAGE_UP: 'PageUp',
            PERIOD: '.',
            RIGHT: 'ArrowRight',
            SPACE: ' ',
            TAB: 'Tab',
            UP: 'ArrowUp'
        };
        let preventDefault = true;
        let index = indexMenuItemFocused;
        switch (event.key) {
            case keyCode.TAB:
            case keyCode.ESCAPE:
                //if(event.target.id === ids.button) {
                    if (isOpen === false) {
                        return;
                    }
                    if(event.target.id === ids.button) {
                        setIsOpen(false);
                    }
                    preventDefault = false;
                //}
                break;
            case keyCode.ENTER:
                /*if ( this.isOpen ) {
                    this._selectFocusedItem( event );
                }*/
                if(event.target.id === ids.button) {
                    if(isOpen === true) {
                        setIndexMenuItemSelected(indexMenuItemFocused);
                        setIsOpen(false);
                    }
                }
                break;
            case keyCode.UP:
                /*if ( event.altKey ) {
                    this._toggle( event );
                } else {
                    this._move( "prev", event );
                }*/
                if(event.target.id === ids.button) {
                    if(isOpen === true) {
                        let index = indexMenuItemFocused;
                        if(index !== 0) {
                            index = index - 1;
                            setIndexMenuItemFocused(index);
                        }
                    } else{
                        if(index !== 0) {
                            index = index - 1;
                            setIndexMenuItemFocused(index);
                        }
                    }
                }
                break;
            case keyCode.DOWN:
                /*if ( event.altKey ) {
                    this._toggle( event );
                } else {
                    this._move( "next", event );
                }*/
                if(event.target.id === ids.button) {
                    if(isOpen === true) {
                        let index = indexMenuItemFocused;
                        if(index !== options.length-1) {
                            index = index + 1;
                            setIndexMenuItemFocused(index);
                        }
                    } else{
                        if(index !== options.length-1) {
                            index = index + 1;
                            setIndexMenuItemFocused(index);
                        }
                    }
                }
                break;
            case keyCode.SPACE:
                if(event.target.id === ids.button) {
                    if (isOpen === true) {
                        setIndexMenuItemSelected(indexMenuItemFocused);
                        setIsOpen(false);
                    } else {
                        setIsOpen(true);
                    }
                }
                break;
            case keyCode.LEFT:
                if(event.target.id === ids.button) {
                    if(isOpen === true) {
                        let index = indexMenuItemFocused;
                        if(index !== 0) {
                            index = index - 1;
                            setIndexMenuItemFocused(index);
                        }
                    }
                }
                break;
            case keyCode.RIGHT:
                if(event.target.id === ids.button) {
                    if(isOpen === true) {
                        let index = indexMenuItemFocused;
                        if(index !== options.length-1) {
                            index = index + 1;
                            setIndexMenuItemFocused(index);
                        }
                    }
                }
                break;
            case keyCode.HOME:
            case keyCode.PAGE_UP:
                index = 0;
                setIndexMenuItemFocused(index);
                break;
            case keyCode.END:
            case keyCode.PAGE_DOWN:
                index = options.length-1;
                setIndexMenuItemFocused(index);
                break;
            default:
                //this.menu.trigger( event );
                preventDefault = false;
        }

        if ( preventDefault ) {
            event.preventDefault();
        }
    }

    const drawButtonClass = isOpen ? "ui-selectmenu-button-open ui-corner-top" : "ui-selectmenu-button-closed ui-corner-all";
    const uiSelectmenuOpen = isOpen ? " ui-selectmenu-open" : "";
    return (
        <React.Fragment>
            <select name={SelectMenuID} id={SelectMenuID} style={{display: 'none'}}>
                {
                    options.map((option, index) => (
                        <option key={`${option.name}-${index}`} value={option.abbreviation}>
                            {option.name}
                        </option>
                    ))
                }
            </select>
            <span 
                id={ids.button}
                className={"ui-selectmenu-button ui-button ui-widget " + drawButtonClass}
                tabIndex={0} // makes the element focusable (0) or not (-1) for sequential focus navigation
                role={"combobox"}
                aria-expanded={isOpen} // Indicate if the menu is open or closed
                aria-controls={ids.element + 'list'} // Indicate that this element controles the element which has the same id
                aria-autocomplete={"list"} // indicates whether inputting text could trigger display of one or more predictions
                aria-owns={ids.menu} // defines a relationship between parent and its child elements
                aria-haspopup={true} // indicates the availability
                aria-activedescendant={options[indexMenuItemFocused].name.toLowerCase()+ "-" + indexMenuItemFocused} // identifies the currently active element when focus is on a composite
                aria-labelledby={options[indexMenuItemSelected].name.toLowerCase()+ "-" + indexMenuItemSelected} // identifies the element id selected
                aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                <span className='ui-selectmenu-icon ui-icon ui-icon-triangle-1-s'></span>
                <span className='ui-selectmenu-text'>
                    {options[indexMenuItemSelected].name}
                </span>
            </span>
            <div 
                className={"ui-selectmenu-menu ui-front" + uiSelectmenuOpen}
                //style = {listStyle}
            > 
                <ul 
                    id={ids.menu}
                    className='ui-menu ui-corner-bottom ui-widget ui-widget-content'
                    style = {{
                        width: 256
                    }}
                    tabIndex={0} // makes the element focusable (0) or not (-1) for sequential focus navigation
                    role='listbox'
                    aria-hidden={!isOpen} // indicates whether the element is exposed to an accessibility API
                    aria-labelledby={ids.button} // identifies the element id selected
                    aria-activedescendant={options[indexMenuItemFocused].name.toLowerCase()+ "-" + indexMenuItemFocused} // identifies the currently active element when focus is on a composite
                    aria-disabled={false} // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
                >
                    {
                        isOpen ? (
                            options.map((listElement, index) => {
                                const uiStateActiveClass = index === indexMenuItemFocused ? "ui-state-active" : "";
                                return(
                                <li 
                                    key={options[index].name.toLowerCase()+ "-" + index} 
                                    className='ui-menu-item'
                                >
                                    <div 
                                        id={options[index].name.toLowerCase()+ "-" + index} 
                                        className={'ui-menu-item-wrapper ' + uiStateActiveClass}
                                        tabIndex={-1} // makes the element focusable (0) or not (-1) for sequential focus navigation
                                        role='option'
                                        aria-selected={false} // indicates the current "selected" state of various widgets
                                        onMouseEnter={() => {
                                            setIndexMenuItemFocused(index);
                                        }}
                                        onClick={() => {
                                            setIndexMenuItemSelected(index);
                                            setData(listElement.abbreviation);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {listElement.name}
                                    </div>
                                </li>
                            )})
                        ) : (
                            options.map((listElement, index) => (
                                <li 
                                    key={options[index].name.toLowerCase()+ "-" + index} 
                                    className='ui-menu-item'
                                >
                                    <div 
                                        id={options[index].name.toLowerCase()+ "-" + index}
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
                </ul>
            </div>
        </React.Fragment>
    )
}