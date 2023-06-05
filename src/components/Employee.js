import React from 'react'
import { useSelector } from "react-redux";
import '../styles/Employee/Employee.css'
import { Link } from 'react-router-dom'


function EmployeeTab({ userData }) {
    return(
        <React.Fragment>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Start Date</th>
                    <th>Department</th>
                    <th>Date of Birth</th>
                    <th>Street</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip Code</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{userData.firstName}</td>
                    <td>{userData.lastName}</td>
                    <td>{userData.dateOfBirth}</td>
                    <td>{userData.startDate}</td>
                    <td>{userData.department}</td>
                    <td>{userData.street}</td>
                    <td>{userData.city}</td>
                    <td>{userData.state}</td>
                    <td>{userData.zipCode}</td>
                </tr>
            </tbody>
        </React.Fragment>
    )
}

export default function Employee() {
    const userData = useSelector((state) => state.userData);
    return(
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <table id="employee-table" className="display">
                <EmployeeTab userData={userData} />
            </table>
            <Link to={'/'}>Home</Link>
        </div>
    )
}