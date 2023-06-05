import React from 'react'
import DrawButton from './DrawButton.js';
import DrawMenu from './DrawMenu.js';




/*function keydown(event) {
    const preventDefault = true;

    switch ( event.keyCode ) {
    case keyCode.TAB:
    case keyCode.ESCAPE:
        close( event );
        preventDefault = false;
    break;
    case $.ui.keyCode.ENTER:
        if ( this.isOpen ) {
            this._selectFocusedItem( event );
        }
    break;
    case keyCode.UP:
        if ( event.altKey ) {
            this._toggle( event );
        } else {
            this._move( "prev", event );
        }
    break;
    case keyCode.DOWN:
        if ( event.altKey ) {
            this._toggle( event );
        } else {
            this._move( "next", event );
        }
    break;
    case keyCode.SPACE:
        if ( this.isOpen ) {
            this._selectFocusedItem( event );
        } else {
            this._toggle( event );
        }
    break;
    case keyCode.LEFT:
        this._move( "prev", event );
    break;
    case keyCode.RIGHT:
        this._move( "next", event );
    break;
    case keyCode.HOME:
    case keyCode.PAGE_UP:
        this._move( "first", event );
    break;
    case keyCode.END:
    case keyCode.PAGE_DOWN:
        this._move( "last", event );
    break;
    default:
        this.menu.trigger( event );
        preventDefault = false;
    }

    if ( preventDefault ) {
        event.preventDefault();
    }
}*/






export default function SelectMenu({ selectmenuId }) {
    //const selectmenuId = "state"; //(ou "department") // var selectmenuId = this.element.uniqueId().attr( "id" );
    const ids = {
        element: selectmenuId,    
        button: selectmenuId + "-button",
        menu: selectmenuId + "-menu"
    };

    return(
        <React.Fragment>
            <DrawButton selectmenuId={selectmenuId} ids={ids} />
            <DrawMenu selectmenuId={selectmenuId} ids={ids} />
        </React.Fragment>
    )  
}