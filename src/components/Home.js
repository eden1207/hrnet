import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { openModal, setUserData } from "./Store.js";
import '../styles/Home/Home.css'
import '../styles/SelectMenu/SelectMenu.css'
import Modal from './Modal.js';
import SelectMenu from './SelectMenu.js';



export default function Home() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [startDate, setStartDate] = useState('');
    const department = useSelector((state) => state.departmentMenuItemNameSelected);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const state = useSelector((state) => state.statesMenuItemNameSelected);
    const [zipCode, setZipCode] = useState('');
    return(
        <React.Fragment>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to={'/employee'}>View Current Employees</Link>
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input 
                        type="text" 
                        id="first-name" 
                        onChange={(e) => {setFirstName(e.target.value)}} 
                    />

                    <label htmlFor="last-name">Last Name</label>
                    <input 
                        type="text" 
                        id="last-name" 
                        onChange={(e) => {setLastName(e.target.value)}} 
                    />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input 
                        id="date-of-birth" 
                        type="text" 
                        onChange={(e) => {setDateOfBirth(e.target.value)}} 
                    />

                    <label htmlFor="start-date">Start Date</label>
                    <input 
                        id="start-date" 
                        type="text" 
                        onChange={(e) => {setStartDate(e.target.value)}} 
                    />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input 
                            id="street" 
                            type="text" 
                            onChange={(e) => {setStreet(e.target.value)}} 
                        />

                        <label htmlFor="city">City</label>
                        <input 
                            id="city" 
                            type="text" 
                            onChange={(e) => {setCity(e.target.value)}} 
                        />

                        <label htmlFor="state">State</label>
                        <SelectMenu selectmenuId={"state"} />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input 
                            id="zip-code" 
                            type="number" 
                            onChange={(e) => {setZipCode(e.target.value)}} 
                        />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <SelectMenu selectmenuId={"department"} />
                </form>

                <button 
                    type='button' 
                    onClick={(e) => {
                        e.preventDefault();
                        const userData = {
                            'firstName': firstName,
                            'lastName': lastName,
                            'dateOfBirth': dateOfBirth,
                            'startDate': startDate,
                            'department': department,
                            'street': street,
                            'city': city,
                            'state': state,
                            'zipCode': zipCode
                        }
                        dispatch(setUserData(userData));
                        dispatch(openModal());
                    }}
                >
                    Save
                </button>
            </div>
            <Modal />
        </React.Fragment>
    )
}