import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import '../styles/Modal/Modal.css'
import { closeModal } from './Store';
import close_btn from '../assets/close.svg'


/**
 * Function associate to the modal when the user click on the save button
 * It send the user data to the store after the user click on the save button
 */
export default function Modal() {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.isModalOpen);
    return isModalOpen ? (
        <div className="confirmWindow-bgd confirmWindow-bgd_dimensions" role="dialog">
            <div className="confirmWindow-content confirmWindow-content_dimensions confirmWindow-content_border confirmWindow-content_animation" aria-label="form">
                <button 
                    className="confirmWindow-close-btn" 
                    type="button" 
                    onClick={() => {
                        dispatch(closeModal())
                    }}
                >
                    <img src={close_btn} alt="close button" />
                </button>
                <h3>Employee created !</h3>
                <button 
                    className="ConfirmBtn ConfirmBtn_dimensions ConfirmBtn_border" 
                    type="button" 
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(closeModal());
                    }}
                    onKeyDown={(e) => {
                        e.preventDefault();
                        dispatch(closeModal());
                    }}
                >
                    Close window
                </button>
            </div>
        </div>
    ) : (
        null
    )
}