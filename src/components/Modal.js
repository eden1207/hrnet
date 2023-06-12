import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import '../styles/Home/Home.css'
//import '../styles/Modal/Modal.css'
import { closeModal } from './Store';


export default function Modal() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.isModalOpen);
    return isModalOpen ? (
        <div className='jquery-modal blocker current'>
            <div 
                id="confirmation" 
                className="modal" 
                style = {{display: 'inline-block'}}
            >
                Employee Created!
                <button 
                type='button'
                    className='close-modal' 
                    onClick={() => {
                        dispatch(closeModal())
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    ) : (
        null
    )   
}