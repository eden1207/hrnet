import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import Header from './Header.js';
import '../styles/Employee/Employee.css';
import '../animations/translationsEmployeePage/translationsEmployeePage.css'
import '../styles/EmployeeTable/EmployeeTable.css';
import '../styles/ShowNumberEntries/ShowNumberEntries.css';
import '../styles/EmployeeTableInfo/EmployeeTableInfo.css';
import '../styles/EmployeeTablePaginate/EmployeeTablePaginate.css';
import '../styles/SearchBar/SearchBar.css';


/**
 * Function to create an array of user data to display on the table as function of the number
 * of users to display on a window and as function of the index of the page selected
 * @param {Array.<Object>} data 
 * @param {number} startIndex 
 * @param {number} endIndex 
 * @returns {Array.<Object>}
 */
function setUserDataDisplayed(data, startIndex, endIndex) {
    let setUserDataDisplayed = [];
    for(let i=startIndex; i<endIndex; i++) {
        setUserDataDisplayed.push(data[i]);
    }
    return setUserDataDisplayed
}

/**
 * Function created to an alphabetic sorting of an array of user data with an ascending/descending way 
 * @param {Array.<Object>} data 
 * @param {string} category 
 * @param {boolean} isAscending 
 * @returns {Array.<Object>}
 */
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

/**
 * Function to get all the words from all the user data in order to create an array of keywords.
 * This array is used to sort user data targeted by the search bar.
 * @param {Array.<Object>} data 
 * @param {string} word 
 * @returns {Array.<string>}
 */
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

/**
 * Function used to sort user data targeted by the search bar
 * @param {Array.<Object>} data 
 * @param {Array.<string>} keywords 
 * @returns {Array.<Object>}
 */
function sortUserDataSearched(data, keywords) {
    let allUserDataSelected = [];
    for(let j=0; j<keywords.length; j++) {
        for(let i=0; i<data.length; i++) {
            switch (keywords[j]) {
                case data[i].FistName.toLowerCase():
                case data[i].LastName.toLowerCase():
                case data[i].StartDate.toLowerCase():
                case data[i].Department.toLowerCase():
                case data[i].DateOfBirth.toLowerCase():
                case data[i].Street.toLowerCase():
                case data[i].City.toLowerCase():
                case data[i].State.toLowerCase():
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

/**
 * Function of the component used to display the Employee Page.
 * 
 * It contains 5 elements, which are the number of employees displayed
 * on the table, the searchbar, the table, the employee table informations and the
 * employee table paginate.
 */
export default function CurrentEmployee() {
    const data = useSelector((state) => state.data);
    let userData = data;

    /**
     * Number of employees displayed on the table:
     * 
     * It is displayed thanks to a window on the banner page
     * isShowNumberEntriesOpen: state to open/close the window
     * numberEntriesValues: values available of number of users displayed
     * numberEntries: state containing the value of users displayed on the table
     */
    const [isShowNumberEntriesOpen, setIsShowNumberEntriesOpen] = useState(false);
    const numberEntriesValues = [10, 25, 50, 100];
    const [numberEntries, setNumberEntries] = useState(10);

    /**
     * Searchbar:
     * 
     * It is possible to write a word that you research
     * word: state containing the value of what you write in the searchbar
     * Then, the function setKeywords() set all the words avalaible is the database
     * of users and select the words values close to the state value "word". We obtain 
     * an array of keywords.
     * The function sortUserDataSearched() selects then the users corresponding to the keywords
     * in order to display them in the table
     */
    const [word, setWord] = useState('');
    const keywords = setKeywords(userData, word);
    userData = sortUserDataSearched(userData, keywords);

    /**
     * Table:
     * 
     * It displays all users data avalaible
     * Each rows correspond to a user and each columns, to a user information (firstName, etc)
     * For each columns, you can sort all users data thanks to ascending and descending arrows.
     * It activates the function sortAlphabetElements(), sorting alphabetic elements ascending or 
     * descending.
     * category: state setting the category of information to sort (firstName, etc) 
     * isAscending: state setting the alphabetic sorting configuration (ascending/descending)
     * activeIndex: index of the active column when we click on the alphabet sorting button
     * (to change the color column)
     * tabHeadData: title of each column
     * columnId: id of each column
     */
    const [category, setIsCategory] = useState(null);
    const [isAscending, setIsAscending] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const tabHeadData = ['First Name', 'Last Name', 'Start Date', 'Department', 'Date of Birth', 'Street', 'City', 'State', 'Zip Code'];
    const columnId = ['FirstName', 'LastName', 'StartDate', 'Department', 'DateOfBirth', 'Street', 'City', 'State', 'ZipCode'];
    userData = sortAlphabetElements(userData, category, isAscending);

    /**
     * Employee table information:
     * 
     * When we have all informations about the number of users to display, we need to know the index 
     * of the first user of the table and the last one. The function setUserDataDisplayed() selects the
     * users data to display on the table page.
     * startIndex: index of the first user displayed
     * endIndex: index of the last user displayed
     */
    const [startIndex, setStartIndex] = useState(0);
    const endIndex = startIndex + numberEntries > userData.length ? userData.length : startIndex + numberEntries;
    const userDataDisplayed = setUserDataDisplayed(userData, startIndex, endIndex);

    /**
     * isTabEmpty: state indicate if the table is empty or not, in order to send an error message
     * for the first case
     */
    const [isTabEmpty, setIsTabEmpty] = useState(false);
    if(userData.length === 0 && isTabEmpty === false) {
        setIsTabEmpty(true);
    } 
    if(userData.length !== 0 && isTabEmpty === true) {
        setIsTabEmpty(false);
    } 

    /**
     * Employee table paginate:
     * 
     * This element of the page provide the different number of windows to display in the table.
     * For example, if we have 23 users and we want to display in the table a window of 10 users,
     * there will be two windows of 10 users and a window of three users
     * To do so, we need to know the total number of users (userData.length) and the number of users
     * to display (the state "numberEntries" provided by the element on the top of the employee page).
     * Then, when each windows are created, we want to know what page is selected in order to display it 
     * and also in order to indicate if we are able to use the arrows to go to the previous/next page and
     * to indicate the page selected.
     * This is provided by the state "indexPageSelected" 
     */
    let listPageNumber = [];
    for(let i=0; i<Math.ceil(userData.length / numberEntries); i++) {
        listPageNumber.push({
            'pageNumber': i+1,
            'startIndexPage': i*numberEntries
        });
    }
    const [indexPageSelected, setIndexPageSelected] = useState(0);
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
                                            key={columnId[index]} 
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
                        className={indexPageSelected-1<0 ? 'paginate-btn-arrow paginate-btn-prev-arrow-color' : 'paginate-btn-arrow paginate-btn-prev-arrow-active-color'}
                        data-dt-idx={0}
                        aria-controls='employee-table'
                        tabIndex={indexPageSelected-1<0 ? -1 : 0}
                        type='button'
                        onClick={(e) => {
                            if(indexPageSelected-1<0) {
                                e.preventDefault();
                            } else{
                                setStartIndex(listPageNumber[indexPageSelected-1].startIndexPage);
                                setIndexPageSelected(indexPageSelected-1);
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
                        className={indexPageSelected+1>listPageNumber.length-1 ? 'paginate-btn-arrow paginate-btn-next-arrow-color' : 'paginate-btn-arrow paginate-btn-next-arrow-active-color'}
                        data-dt-idx={listPageNumber.length+1}
                        aria-controls='employee-table'
                        tabIndex={indexPageSelected+1>listPageNumber.length-1 ? -1 : 0}
                        type='button'
                        onClick={(e) => {
                            if(indexPageSelected+1>listPageNumber.length-1) {
                                e.preventDefault();
                            } else{
                                setStartIndex(listPageNumber[indexPageSelected+1].startIndexPage);
                                setIndexPageSelected(indexPageSelected+1);
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