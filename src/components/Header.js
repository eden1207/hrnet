import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/Header/Header.css';
import { RiTeamFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { switchHeader } from "./Store.js";


export default function Header() {
    const dispatch = useDispatch();
    const isHomePage = useSelector((state) => state.isHomePage);
    // useEffect to update the good header version when the page is uploaded 
    // (especially the employees page...)
    useEffect(() => {
        const endURL = window.location.href.split('/');
        if(endURL[endURL.length-1] === "employee") {
            dispatch(switchHeader('employees'));
        }
    }, [dispatch]);
    return isHomePage ? (
        <nav className="main-nav translation1">
            <img
                className="main-nav-logo-image translation2"
                src={logo}
                alt="Wealth Health Logo"
            />
            <h1 className="main-title translation2">HRnet</h1>
            <Link 
                to={'/employee'}
                className="nav-btn translation2"
                onClick={() => {
                    dispatch(switchHeader('employees'))
                }}
            >
                <RiTeamFill className="nav-btn-logo" />
                <p className="nav-btn-text">View <br/> Current Employees</p>
            </Link>
        </nav>
    ) : (
        <nav className="main-nav translation1">
            <img
                className="main-nav-logo-image translation2"
                src={logo}
                alt="Wealth Health Logo"
            />
            <h1 className="main-title translation2">Current Employees</h1>
            <Link 
                to={'/'}
                className="nav-btn translation2"
                onClick={() => {
                    dispatch(switchHeader('home'))
                }}
            >
                <AiFillHome className="nav-btn-logo" />
                <p className="nav-btn-text">Home</p>
            </Link>
        </nav>
    )
}