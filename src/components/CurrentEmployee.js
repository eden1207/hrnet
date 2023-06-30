import React, { useState } from 'react';
import { useSelector } from "react-redux";
import '../styles/Employee/Employee.css';
import '../animations/translationsEmployeePage/translationsEmployeePage.css'
//import { data } from '../data/data.js';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import Header from './Header.js';
import '../styles/EmployeeTable/EmployeeTable.css';
import '../styles/ShowNumberEntries/ShowNumberEntries.css';
import '../styles/EmployeeTableInfo/EmployeeTableInfo.css';
import '../styles/EmployeeTablePaginate/EmployeeTablePaginate.css';
import '../styles/SearchBar/SearchBar.css';



function setUserDataDisplayed(data, startIndex, endIndex) {
    let setUserDataDisplayed = [];
    for(let i=startIndex; i<endIndex; i++) {
        setUserDataDisplayed.push(data[i]);
    }
    return setUserDataDisplayed
}

function sortAlphabetElements(data, category, isAscending) {
    if(category !== '') {
        data.sort((a, b) => {
            let elementA = null;
            let elementB = null;
            switch (category) {
                case "FirstName":
                    elementA = a.FistName.toUpperCase();
                    elementB = b.FistName.toUpperCase();
                break;
                case "LastName":
                    elementA = a.LastName.toUpperCase();
                    elementB = b.LastName.toUpperCase();
                break;
                case "StartDate":
                    elementA = new Date(a.StartDate).getTime();
                    elementB = new Date(b.StartDate).getTime();
                break;
                case "Department":
                    elementA = a.Department.toUpperCase();
                    elementB = b.Department.toUpperCase();
                break;
                case "DateOfBirth":
                    elementA = new Date(a.DateOfBirth).getTime();
                    elementB = new Date(b.DateOfBirth).getTime();
                break;
                case "Street":
                    elementA = a.Street.toUpperCase();
                    elementB = b.Street.toUpperCase();
                break;
                case "City":
                    elementA = a.City.toUpperCase();
                    elementB = b.City.toUpperCase();
                break;
                case "State":
                    elementA = a.State.toUpperCase();
                    elementB = b.State.toUpperCase();
                break;
                case "ZipCode":
                    elementA = a.ZipCode;
                    elementB = b.ZipCode;
                break;
                default:
            }
            if (elementA < elementB) {
              return isAscending ? -1 : 1;
            }
            if (elementA > elementB) {
              return isAscending ? 1 : -1;
            }
            return 0;
        });
        return data
    }
    return data
}

function setKeywords(data, word) {
    let allUserDataWords = [];
    for(let i=0; i<data.length; i++) {
        allUserDataWords.push(data[i].FistName.toLowerCase());
        allUserDataWords.push(data[i].LastName.toLowerCase());
        allUserDataWords.push(data[i].StartDate.toLowerCase());
        allUserDataWords.push(data[i].Department.toLowerCase());
        allUserDataWords.push(data[i].DateOfBirth.toLowerCase());
        allUserDataWords.push(data[i].Street.toLowerCase());
        allUserDataWords.push(data[i].City.toLowerCase());
        allUserDataWords.push(data[i].State.toLowerCase());
        allUserDataWords.push(data[i].ZipCode.toLowerCase());
    }
    let keywordsTab = []; 
    for(let i=0; i<allUserDataWords.length; i++) {
        let count = 0;
        for(let j=0; j<keywordsTab.length; j++) {
            if(allUserDataWords[i] === keywordsTab[j]) {
                count += 1;
            }
        }
        if(count === 0) {
            keywordsTab.push(allUserDataWords[i]);
        }
    }    
    let keywords = [];
    for(let i=0; i<keywordsTab.length; i++) {
        if(keywordsTab[i].includes(word.toLowerCase()) === true) {
            keywords.push(keywordsTab[i])
        }
    }
    return keywords
}

function sortUserDataSearched(data, keywords) {
    let allUserDataSelected = [];
    for(let j=0; j<keywords.length; j++) {
        for(let i=0; i<data.length; i++) {
            switch (keywords[j]) {
                case data[i].FistName.toLowerCase():
                    //allUserDataSelected.push(data[i]);
                //break;
                case data[i].LastName.toLowerCase():
                    //allUserDataSelected.push(data[i]);
                //break;
                case data[i].StartDate.toLowerCase():
                    //allUserDataSelected.push(data[i]);
                //break;
                case data[i].Department.toLowerCase():
                 //   allUserDataSelected.push(data[i]);
               // break;
                case data[i].DateOfBirth.toLowerCase():
                 //   allUserDataSelected.push(data[i]);
              // break;
                case data[i].Street.toLowerCase():
                 //   allUserDataSelected.push(data[i]);
                //break;
                case data[i].City.toLowerCase():
                //    allUserDataSelected.push(data[i]);
                //break;
                case data[i].State.toLowerCase():
                   // allUserDataSelected.push(data[i]);
               // break;
                case data[i].ZipCode.toLowerCase():
                    allUserDataSelected.push(data[i]);
                break;
                default:
            }
        }
    }
    let sortUserDataMultipleElements = [];
    for(let i=0; i<allUserDataSelected.length; i++) {
        let count = 0;
        for(let j=0; j<sortUserDataMultipleElements.length; j++) {
            const condition1 = allUserDataSelected[i].FistName === sortUserDataMultipleElements[j].FistName;
            const condition2 = allUserDataSelected[i].LastName === sortUserDataMultipleElements[j].LastName;
            if(condition1 || condition2) {
                count += 1;
            }
        }
        if(count === 0) {
            sortUserDataMultipleElements.push(allUserDataSelected[i]);
            count = 0;
        }
    }
    return sortUserDataMultipleElements
}


export default function CurrentEmployee() {
    const data = useSelector((state) => state.data);
    const [word, setWord] = useState('');
    const [isTabEmpty, setIsTabEmpty] = useState(false);
    const [category, setIsCategory] = useState(null);
    const [isAscending, setIsAscending] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [numberEntries, setNumberEntries] = useState(10);

    //Variables de la liste 10, 25, 50, 100
    const [isShowNumberEntriesOpen, setIsShowNumberEntriesOpen] = useState(false);
    const numberEntriesValues = [10, 25, 50, 100];

    //Variable EmployeeTable
    const [activeIndex, setActiveIndex] = useState(null);

    const tabHeadData = ['First Name', 'Last Name', 'Start Date', 'Department', 'Date of Birth', 'Street', 'City', 'State', 'Zip Code'];
    const columnId = ['FirstName', 'LastName', 'StartDate', 'Department', 'DateOfBirth', 'Street', 'City', 'State', 'ZipCode'];

/**------------------------------- */


    let userData = data;

    const keywords = setKeywords(userData, word);
    userData = sortUserDataSearched(userData, keywords);

    userData = sortAlphabetElements(userData, category, isAscending);

    const endIndex = startIndex + numberEntries > userData.length ? userData.length : startIndex + numberEntries;
    const userDataDisplayed = setUserDataDisplayed(userData, startIndex, endIndex);

    if(userData.length === 0 && isTabEmpty === false) {
        setIsTabEmpty(true);
    } 
    if(userData.length !== 0 && isTabEmpty === true) {
        setIsTabEmpty(false);
    } 

        //EmployeeTablePaginate
        const [indexPage, setIndexPage] = useState(0);
        const [indexPageSelected, setIndexPageSelected] = useState(0);
    
        //const N1 = userData.length; // nombre total de lignes
        //const N2 = numberEntries; // nombre de lignes à afficher
        let listPageNumber = [];
        for(let i=0; i<Math.ceil(userData.length / numberEntries); i++) {
            listPageNumber.push({
                'pageNumber': i+1,
                'startIndexPage': i*numberEntries
            });
        }
        const paginateBtnPrevArrowColor = indexPage-1<0 ? 'paginate-btn-prev-arrow-color' : 'paginate-btn-prev-arrow-active-color';
        const paginateBtnNextArrowColor = indexPage+1>listPageNumber.length-1 ? 'paginate-btn-next-arrow-color' : 'paginate-btn-next-arrow-active-color';
        const paginateBtnPrevArrowTabIndex = indexPage-1<0 ? -1 : 0;
        const paginateBtnNextArrowTabIndex = indexPage+1>listPageNumber.length-1 ? -1 : 0;
        /**-------------------------------- */

    return(
        <div id="employee-div" className="container">
            <Header />
            <div className='employees-page-banner'>
                {
                    isShowNumberEntriesOpen ? (
                        <div id='employee-table-length' className='dataTables-length translation2'>
                            <p>Show </p> 
                            <div className='number-entries number-entries-open'>
                                <button 
                                    className='number-entries-btn'
                                    type='button'
                                    onClick={() => setIsShowNumberEntriesOpen(false)}
                                >
                                    {numberEntries} <IoIosArrowUp />
                                </button>
                                <ul className='number-entries-list'>
                                    {
                                        numberEntriesValues.map((value, index) => (
                                            <li 
                                                key={`${value}-${index}`} 
                                                className='number-entries-list-element'
                                                onClick={() => {
                                                    setNumberEntries(value);
                                                    setIsShowNumberEntriesOpen(false);
                                                }}
                                            >
                                                {value}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <p> entries</p> 
                        </div>
                    ) : (
                        <div id='employee-table-length' className='dataTables-length translation2'>
                            <p>Show </p> 
                            <div className='number-entries'>
                                <button 
                                    className='number-entries-btn'
                                    type='button'
                                    onClick={() => setIsShowNumberEntriesOpen(true)}
                                >
                                    {numberEntries} <IoIosArrowDown />
                                </button>
                            </div>
                            <p> entries</p>  
                        </div>
                    )
                }
                <div className='searchbar translation3'>
                    <input 
                        placeholder='Search' 
                        onChange={(e) => {setWord(e.target.value);}}
                    />
                    <HiOutlineSearch />
                </div>
            </div>
            <div className='scroll-window translation4'>
                <table 
                    id="employee-table" 
                    className="main-table" 
                    role='grid' 
                    aria-describedby='employee-table_info'
                    cellSpacing="0" 
                    cellPadding="0"
                >
                    <thead>
                        <tr role='row'>
                            {
                                tabHeadData.map((title, index) => {
                                    const tabAriaLabel = isAscending ? "ascending" : "descending";
                                    const tabAriaSortAscending = index === activeIndex && isAscending ? "ascending" : "";
                                    const tabAriaSortDescending = index === activeIndex && !isAscending ? "descending" : "";
                                    const upArrowClass = index === activeIndex && isAscending ? "arrowWhite" : "";
                                    const downArrowClass = index === activeIndex && !isAscending ? "arrowWhite" : "";;
                                    return(
                                        <th 
                                            key={`${title}-${index}`} 
                                            className='column-content'
                                            tabIndex={0} 
                                            aria-controls='employee-table' 
                                            rowSpan={1} 
                                            colSpan={1}
                                            aria-sort={tabAriaSortAscending + tabAriaSortDescending}
                                            aria-label={title + ': activate to sort column ' + tabAriaLabel} //fonction au clique 'ascending/descending'
                                        >
                                            <div className='column-title-box'>
                                                <h2 className='column-title'>{title}</h2> 
                                                <span className='column-title-arrows'>
                                                    <button 
                                                        className='column-title-single-arrow' 
                                                        type='button'
                                                        onClick={() => {
                                                            setIsCategory(columnId[index])
                                                            setIsAscending(true);
                                                            setActiveIndex(index);
                                                        }}
                                                    >
                                                        <AiFillCaretUp className={upArrowClass} />
                                                    </button>
                                                    <button 
                                                        className='column-title-single-arrow' 
                                                        type='button'
                                                        onClick={() => {
                                                            setIsCategory(columnId[index])
                                                            setIsAscending(false);
                                                            setActiveIndex(index);
                                                        }}
                                                    >
                                                        <AiFillCaretDown className={downArrowClass} />
                                                    </button>
                                                </span> 
                                            </div>
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userDataDisplayed.map((user, index) => { 
                                const rowInformationTextClass = 'row-information-text';
                                const columnInformationTextClassSelected = 'row-information-text-selected ';
                                const columnInformationTextClass = '';
                                const oddEvenClass = index % 2 === 0 ? "even" : "odd";
                                return(
                                    <tr 
                                        key={`${user}-${index}`} 
                                        className={'row-information ' + oddEvenClass} 
                                        role='row'
                                    >
                                        <td 
                                            className={activeIndex === 0 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.FistName}
                                        </td>
                                        <td 
                                            className={activeIndex === 1 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.LastName}
                                        </td>
                                        <td 
                                            className={activeIndex === 2 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.StartDate}
                                        </td>
                                        <td 
                                            className={activeIndex === 3 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.Department}
                                        </td>
                                        <td 
                                            className={activeIndex === 4 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.DateOfBirth}
                                        </td>
                                        <td 
                                            className={activeIndex === 5 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.Street}
                                        </td>
                                        <td 
                                            className={activeIndex === 6 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.City}
                                        </td>
                                        <td 
                                            className={activeIndex === 7 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.State}
                                        </td>
                                        <td 
                                            className={activeIndex === 8 ? columnInformationTextClassSelected + rowInformationTextClass : columnInformationTextClass + rowInformationTextClass}
                                        >
                                            {user.ZipCode}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    isTabEmpty ? (
                        <p className='errorMessage'>No matching records found</p>
                    ) : (
                        null
                    )
                }
            </div>
            <div className='employees-page-footer'>
                <div 
                    id='employee-table_info' 
                    className='dataTables-info translation5' 
                    role='status' 
                    aria-live='polite'
                >
                    Showing {startIndex+1} to {endIndex} of {userData.length} entries
                </div>
                <div 
                    id='employee-table_paginate' 
                    className='paginate translation6'
                >
                    <button 
                        id="employee-table_previous" 
                        className={'paginate-btn-arrow ' + paginateBtnPrevArrowColor}
                        data-dt-idx={0}
                        aria-controls='employee-table'
                        tabIndex={paginateBtnPrevArrowTabIndex}
                        type='button'
                        onClick={(e) => {
                            if(indexPage-1<0) {
                                e.preventDefault();
                            } else{
                                setStartIndex(listPageNumber[indexPage-1].startIndexPage);
                                setIndexPage(indexPage-1);
                                setIndexPageSelected(indexPage-1);
                            }
                        }}
                    >
                        <IoIosArrowBack />
                    </button>
                    {
                        listPageNumber.map((tabElement, index) => { 
                            const paginateBtnNumberColor = index === indexPageSelected ? 'paginate-btn-number-selected-color' : 'paginate-btn-number-color';
                            const paginateBtnNumberTabIndex = index === indexPageSelected ? 0 : -1;
                            return(
                                <button 
                                    key={`${tabElement}-${index}`} 
                                    className={'paginate-btn-number ' + paginateBtnNumberColor}
                                    data-dt-idx={index+1}
                                    aria-controls='employee-table'
                                    tabIndex={paginateBtnNumberTabIndex}
                                    type='button'
                                    onClick={() => {
                                        setStartIndex(tabElement.startIndexPage);
                                        setIndexPage(index);
                                        setIndexPageSelected(index);
                                    }}
                                >
                                    {tabElement.pageNumber}
                                </button>
                            )
                        })
                    }
                    <button 
                        id="employee-table_next" 
                        className={'paginate-btn-arrow ' + paginateBtnNextArrowColor}
                        data-dt-idx={listPageNumber.length+1}
                        aria-controls='employee-table'
                        tabIndex={paginateBtnNextArrowTabIndex}
                        type='button'
                        onClick={(e) => {
                            if(indexPage+1>listPageNumber.length-1) {
                                e.preventDefault();
                            } else{
                                setStartIndex(listPageNumber[indexPage+1].startIndexPage);
                                setIndexPage(indexPage+1);
                                setIndexPageSelected(indexPage+1);
                            }
                        }}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    )
}