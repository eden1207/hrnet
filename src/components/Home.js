import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { openModal, setUserData } from "./Store.js";
import { states } from '../data/states.js'
import { departments } from '../data/departments.js'
import '../styles/Home/Home.css'
import '../styles/Modal/Modal.css'
import '../animations/translationsHomePage/translationHomePage.css'
import Modal from './Modal.js';
import DatePicker from './DatePicker.js';
import Header from './Header.js';

//import SelectMenu from './SelectMenu.js';
//import '../styles/SelectMenu/SelectMenu.css'
import SelectMenu from 'package-select-menu';


/**
 * Function associate to the home page of the web site
 * There are many fields whose values are saved in states and send to the store after the user click
 * on the save button
 */
export default function Home() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [startDate, setStartDate] = useState('');
    const [state, setState] = useState(states[0].abbreviation);
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [department, setDepartment] = useState(departments[0].abbreviation);
    const [zipCode, setZipCode] = useState('');
    return(
        <React.Fragment>
            <Header />
            <div className="container">
                <h2 className="form-title translation3">Create Employee</h2>
                <form action="#" id="create-employee" className='form-content translation4'>
                    <label htmlFor="first-name">First Name</label>
                    <input 
                        type="text" 
                        id="first-name" 
                        placeholder={firstName}
                        onChange={(e) => {setFirstName(e.target.value)}} 
                    />

                    <label htmlFor="last-name">Last Name</label>
                    <input 
                        type="text" 
                        id="last-name"
                        placeholder={lastName}
                        onChange={(e) => {setLastName(e.target.value)}} 
                    />

                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker id={"date-of-birth"} date={dateOfBirth} setDate={setDateOfBirth} />

                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker id={"start-date"} date={startDate} setDate={setStartDate} />

                    <fieldset className="address address-content">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input 
                            id="street" 
                            type="text"
                            placeholder={street}
                            onChange={(e) => {setStreet(e.target.value)}} 
                        />

                        <label htmlFor="city">City</label>
                        <input 
                            id="city" 
                            type="text" 
                            placeholder={city}
                            onChange={(e) => {setCity(e.target.value)}} 
                        />

                        <label htmlFor="state">State</label>
                        <SelectMenu 
                            options={states}
                            SelectMenuID={"state"}
                            setData={setState}
                        />

                        <label htmlFor="zip-code">Zip Code</label>
                        <input 
                            id="zip-code" 
                            type="number" 
                            placeholder={zipCode}
                            onChange={(e) => {setZipCode(e.target.value)}} 
                        />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <SelectMenu 
                        options={departments}
                        SelectMenuID={"department"}
                        setData={setDepartment}
                    />
                </form>
                
                <button 
                    className='form-btn translation5'
                    type='button' 
                    onClick={(e) => {
                        e.preventDefault();
                        const userData = {
                            "FistName": firstName,
                            "LastName": lastName,
                            "StartDate": startDate,
                            "Department": department,
                            "DateOfBirth": dateOfBirth,
                            "Street": street,
                            "City": city,
                            "State": state,
                            "ZipCode": zipCode
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