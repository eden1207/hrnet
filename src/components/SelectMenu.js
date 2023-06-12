import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setMenusItemsIndex, sendIndex } from "./Store.js";
import DrawButton from './DrawButton.js';
import DrawMenu from './DrawMenu.js';



export default function SelectMenu({ selectmenuId, listStyle }) {
    const ids = {
        element: selectmenuId,    
        button: selectmenuId + "-button",
        menu: selectmenuId + "-menu"
    };
    const dispatch = useDispatch();

    useEffect(() => {
        const selectMenu = document.getElementById(selectmenuId);
        let tab = [];
        for (let i = 0; i < selectMenu.length; i++) {
            tab.push(selectMenu.options[i].text);

            dispatch(setMenusItemsIndex())
            dispatch(sendIndex());
        }
        setListItem(tab);
    }, [selectmenuId, dispatch]);

    /**
     * isOpen: open/close the select menu
     * listItems: provides the list of menu items to display
     * menuItemId: id of the list item focused (for aria-descendant)
     * menuItemIdSelected: id of the list item selected (for aria-labelledby)
     * menuItemNameSelected: name of the list item selected
     * indexMenuItemFocused: index of the list item focused (to change his class on mousse enter/leave)
     */
    const [isOpen, setIsOpen] = useState(false);
    const [listItems, setListItem] = useState([]);
    const [menuItemId, setMenuItemId] = useState(0);
    const [menuItemIdSelected, setMenuItemIdSelected] = useState(['ui-id-0']);
    const [menuItemNameSelected, setMenuItemNameSelected] = useState(listItems[0]);
    const [indexMenuItemFocused, setIndexMenuItemFocused] = useState(0);

    const listIndex = useSelector((state) => state.tab);
    let tab2=[];
    for(let i=1; i<listIndex; i++) {
        tab2.push(i);
    }
    //dispatch(sendIndex(tab2));
    //const tab3 = useSelector((state) => state.tab2);
    //console.log(listIndex)
    //console.log(selectmenuId)

    const listIndex2 = useSelector((state) => state.tab2);
    //console.log(listIndex2)

    function test(listItems, tab2) {
        let tab3 = [];
        for(let i=0; i<listItems.length; i++) {
            tab3.push(tab2[i]);
            tab2.splice(i, 1);
        }
        //return [tab2, tab3]
        return tab2
    }

    const res = test(listItems, tab2);
    //console.log(res)







    useEffect(() => {
        document.addEventListener('keydown', detectKeydown);
    });


    let [index, setIndex] = useState(indexMenuItemFocused);

    
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
                        setMenuItemIdSelected('ui-id-' + index);
                        setMenuItemNameSelected(listItems[index]);
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
                        if(index !== 0) {
                            index = index - 1;
                            setIndex(index)
                            setIndexMenuItemFocused(index);
                            setMenuItemId(index);
                        }
                    } else{
                        if(index !== 0) {
                            index = index - 1;
                            setIndex(index)
                            setMenuItemIdSelected('ui-id-' + index);
                            setMenuItemNameSelected(listItems[index]);
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
                        if(index !== listItems.length-1) {
                            index = index + 1;
                            setIndex(index)
                            setIndexMenuItemFocused(index);
                            setMenuItemId(index);
                        }
                    } else{
                        if(index !== listItems.length-1) {
                            index = index + 1;
                            setIndex(index)
                            setMenuItemIdSelected('ui-id-' + index);
                            setMenuItemNameSelected(listItems[index]);
                        }
                    }
                }
                break;
            case keyCode.SPACE:
                if(event.target.id === ids.button) {
                    if (isOpen === true) {
                        setMenuItemIdSelected('ui-id-' + index);
                        setMenuItemNameSelected(listItems[index]);
                        setIsOpen(false);
                    } else {
                        setIsOpen(true);
                    }
                }
                break;
            case keyCode.LEFT:
                if(event.target.id === ids.button) {
                    if(isOpen === true) {
                        if(index !== 0) {
                            index = index - 1;
                            setIndex(index)
                            setIndexMenuItemFocused(index);
                            setMenuItemId(index);
                        }
                    }
                }
                break;
            case keyCode.RIGHT:
                if(event.target.id === ids.button) {
                    if(isOpen === true) {
                        if(index !== listItems.length-1) {
                            index = index + 1;
                            setIndex(index)
                            setIndexMenuItemFocused(index);
                            setMenuItemId(index);
                        }
                    }
                }
                break;
            case keyCode.HOME:
            case keyCode.PAGE_UP:
                index = 0;
                setIndex(index)
                setIndexMenuItemFocused(index);
                setMenuItemId(index);
                break;
            case keyCode.END:
            case keyCode.PAGE_DOWN:
                index = listItems.length-1;
                setIndex(index)
                setIndexMenuItemFocused(index);
                setMenuItemId(index);
                break;
            default:
                //this.menu.trigger( event );
                preventDefault = false;
        }

        if ( preventDefault ) {
            event.preventDefault();
        }
    }


    return (
        <React.Fragment>
            <DrawButton 
                ids={ids} 
                isOpen={isOpen} 
                menuItemId={menuItemId} 
                menuItemIdSelected={menuItemIdSelected} 
                menuItemNameSelected={menuItemNameSelected} 
                setIsOpen={setIsOpen} 
            />
            <DrawMenu 
                ids={ids} 
                isOpen={isOpen}
                menuItemId={menuItemId} 
                indexMenuItemFocused={indexMenuItemFocused}
                listStyle={listStyle}  
                listItems={listItems} 
                setIsOpen={setIsOpen}
                setMenuItemId={setMenuItemId} 
                setMenuItemIdSelected={setMenuItemIdSelected} 
                setMenuItemNameSelected={setMenuItemNameSelected} 
                setIndexMenuItemFocused={setIndexMenuItemFocused}
                setIndex={setIndex}
            />
        </React.Fragment>
    )
}