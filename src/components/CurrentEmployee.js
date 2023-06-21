import React, { useState } from 'react';
//import { useSelector } from "react-redux";
import '../styles/Employee/Employee.css';
import { data } from '../data/data.js';
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import Header from './Header.js';
import '../styles/EmployeeTable/EmployeeTable.css';
import '../styles/ShowNumberEntries/ShowNumberEntries.css';
import '../styles/EmployeeTableInfo/EmployeeTableInfo.css';
import '../styles/EmployeeTablePaginate/EmployeeTablePaginate.css';
import '../styles/SearchBar/SearchBar.css';



/*------ Component ShowNumberEntries ------*/

function ShowNumberEntries({ numberEntries, setNumberEntries }) {
    const [isShowNumberEntriesOpen, setIsShowNumberEntriesOpen] = useState(false);
    const numberEntriesValues = [10, 25, 50, 100];
    return isShowNumberEntriesOpen ? (
        <div id='employee-table-length' className='dataTables-length'>
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
        <div id='employee-table-length' className='dataTables-length'>
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

/*------ Component SearchBar ------*/

function SearchBar({ keywords, setKeywords }) {
    // Voir quoi mettre...
    return(
        <div className='searchbar'>
            <input 
                placeholder='Search' 
                onChange={(e) => {
                    let keyword = [];
                    const word = e.target.value;
                    for(let i=0; i<keywords.length; i++) {
                        if(keywords[i].includes(word.toLowerCase()) === true) {
                            keyword.push(keywords[i])
                        }
                    }
                    setKeywords(keyword)
                }}
            />
            <HiOutlineSearch />
        </div>
    ) 
}


/*------ Component EmployeeTable ------*/

function setCategory(category, a, b) {
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
    return {
        'elementA': elementA,
        'elementB': elementB
    }
}

function setTabAriaLabel (isAscending) {
    let tabAriaLabel = "descending";
    if(isAscending){
        tabAriaLabel = "ascending";
    }
    return tabAriaLabel
}

function setOddEvenClass (number) {
    if(number % 2 === 0) {
        return 'even'
    }
    return 'odd'
}

function setUpArrowClass(data, activeIndex, isAscending) {
    let arrowClassTab = [];
    for(let i=0; i<data.length; i++) {
        if(i === activeIndex && isAscending) {
            arrowClassTab.push('arrowWhite');
        }
        arrowClassTab.push('');
    }
    return arrowClassTab
}

function setDownArrowClass(data, activeIndex, isAscending) {
    let arrowClassTab = [];
    for(let i=0; i<data.length; i++) {
        if(i === activeIndex && !isAscending) {
            arrowClassTab.push('arrowWhite');
        }
        arrowClassTab.push('');
    }
    return arrowClassTab
}

function EmployeeTableEmptyMessage({ isTabEmpty }) {
    return isTabEmpty ? (
        <p className='errorMessage'>No matching records found</p>
    ) : (
        null
    )
}

function EmployeeTable({ userData, category, setIsCategory, isAscending, setIsAscending, isTabEmpty }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const tabHeadData = ['First Name', 'Last Name', 'Start Date', 'Department', 'Date of Birth', 'Street', 'City', 'State', 'Zip Code'];
    const columnId = ['FirstName', 'LastName', 'StartDate', 'Department', 'DateOfBirth', 'Street', 'City', 'State', 'ZipCode'];
    const upArrowClassTab = setUpArrowClass(tabHeadData, activeIndex, isAscending);
    const downArrowClassTab = setDownArrowClass(tabHeadData, activeIndex, isAscending);
    return(
      <div className='scroll-window'>
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
                        tabHeadData.map((title, index) => (
                            <th 
                                key={`${title}-${index}`} 
                                className='column-content'
                                tabIndex={0} 
                                aria-controls='employee-table' 
                                rowSpan={1} 
                                colSpan={1}
                                aria-label={title + ': activate to sort column ' + setTabAriaLabel(isAscending)} //fonction au clique 'ascending/descending'
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
                                            <AiFillCaretUp className={upArrowClassTab[index]} />
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
                                            <AiFillCaretDown className={downArrowClassTab[index]} />
                                        </button>
                                    </span> 
                                </div>
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    userData.map((user, index) => { 
                        //const tD = nom de la variable
                        return(

                        <tr 
                            key={`${user}-${index}`} 
                            className={'row-information ' + setOddEvenClass(index)} 
                            role='row'
                        >
                            <td className='row-information-text'>{user.FistName}</td>
                            <td className='row-information-text'>{user.LastName}</td>
                            <td className='row-information-text'>{user.StartDate}</td>
                            <td className='row-information-text'>{user.Department}</td>
                            <td className='row-information-text'>{user.DateOfBirth}</td>
                            <td className='row-information-text'>{user.Street}</td>
                            <td className='row-information-text'>{user.City}</td>
                            <td className='row-information-text'>{user.State}</td>
                            <td className='row-information-text'>{user.ZipCode}</td>
                        </tr>
                    )}
                    )
                }
            </tbody>
        </table>
        <EmployeeTableEmptyMessage isTabEmpty={isTabEmpty} />
      </div>
    )
}

/*------ Component EmployeeTableInfo ------*/

function EmployeeTableInfo({ startIndex, endIndex, userData }) {
    return(
        <div 
            id='employee-table_info' 
            className='dataTables-info' 
            role='status' 
            aria-live='polite'
        >
            Showing {startIndex} to {endIndex} of {userData.length} entries
        </div>
    ) 
}

/*------ Component EmployeeTablePaginate ------*/

function EmployeeTablePaginate({ numberEntries, setStartIndex, userData }) {
    const [indexPage, setIndexPage] = useState(0);
    //const tabTest = [1, 2, 3, 4];

    //const N1 = userData.length; // nombre total de lignes
    //const N2 = numberEntries; // nombre de lignes à afficher
    let tabTest = [];
    for(let i=0; i<Math.ceil(userData.length / numberEntries); i++) {
        tabTest.push({
            'pageNumber': i+1,
            'startIndexPage': i*numberEntries
        });
    }
    return(
        <div 
            id='employee-table_paginate' 
            className='paginate'
        >
            <button 
                id="employee-table_previous" 
                className='paginate-btn-arrow'
                data-dt-idx={0}
                aria-controls='employee-table'
                tabIndex={0} // -1 si flou ?
                type='button'
                onClick={(e) => {
                    if(indexPage-1<0) {
                        e.preventDefault();
                    } else{
                        setStartIndex(tabTest[indexPage-1].startIndexPage);
                        setIndexPage(indexPage-1);
                    }
                }}
            >
                <IoIosArrowBack />
            </button>
            {
                tabTest.map((tabElement, index) => (
                    <button 
                        key={`${tabElement}-${index}`} 
                        className='paginate-btn-number'
                        data-dt-idx={index+1}
                        aria-controls='employee-table'
                        tabIndex={0} // -1 si flou ?
                        type='button'
                        onClick={() => {
                            setStartIndex(tabElement.startIndexPage);
                            setIndexPage(index);
                        }}
                    >
                        {tabElement.pageNumber}
                    </button>
                ))
            }
            <button 
                id="employee-table_next" 
                className='paginate-btn-arrow'
                data-dt-idx={tabTest.length+1}
                aria-controls='employee-table'
                tabIndex={0} // -1 si flou ?
                type='button'
                onClick={(e) => {
                    if(indexPage+1>tabTest.length-1) {
                        e.preventDefault();
                    } else{
                        setStartIndex(tabTest[indexPage+1].startIndexPage);
                        setIndexPage(indexPage+1);
                    }
                }}
            >
                <IoIosArrowForward />
            </button>
        </div>
    ) 
}


/*function EmployeeTablePaginate({ numberEntries, setStartIndex }) {
    return(
        <div 
            id='employee-table_paginate' 
            className='paginate'
        >
            <button 
                id="employee-table_previous" 
                className='paginate-btn-arrow'
                data-dt-idx={0}
                aria-controls='employee-table'
                tabIndex={0} // -1 si flou ?
                type='button'
                onClick={() => {
                    setStartIndex(0);
                }}
            >
                <IoIosArrowBack />
            </button>
            <button 
                className='paginate-btn-number'
                data-dt-idx={1}
                aria-controls='employee-table'
                tabIndex={0} // -1 si flou ?
                type='button'
                onClick={() => {
                    setStartIndex(0);
                }}
            >
                1
            </button>
            <button 
                className='paginate-btn-number'
                data-dt-idx={2}
                aria-controls='employee-table'
                tabIndex={0} // -1 si flou ?
                type='button'
                onClick={() => {
                    setStartIndex(numberEntries);
                }}
            >
                2
            </button>
            <button 
                id="employee-table_next" 
                className='paginate-btn-arrow'
                data-dt-idx={3}
                aria-controls='employee-table'
                tabIndex={0} // -1 si flou ?
                type='button'
                onClick={() => {
                    setStartIndex(numberEntries);
                }}
            >
                <IoIosArrowForward />
            </button>
        </div>
    ) 
}*/

/*------ Component CurrentEmployee ------*/

function setEndIndex(startIndex, numberEntries, data) {
    let endIndex = startIndex + numberEntries;
    if(endIndex > data.length) {
        endIndex = data.length;
    } 
    return endIndex
}

function setUserDataDisplayed(data, startIndex, endIndex) {
    let setUserDataDisplayed = [];
    for(let i=startIndex; i<endIndex; i++) {
        setUserDataDisplayed.push(data[i]);
    }
    return setUserDataDisplayed
}

function sortDataElements(data, category, isAscending) {
    let factor = -1;
    if(isAscending) {
        factor = 1;
    }
    if(category !== '') {
        data.sort((a, b) => {
            const elementA = setCategory(category, a, b).elementA;
            const elementB = setCategory(category, a, b).elementB;
            if (elementA < elementB) {
              return -1*factor;
            }
            if (elementA > elementB) {
              return 1*factor;
            }
            return 0;
        });
        return data
    }
    return data
}

function getKeywords(data) {
    let keywords = [];
    for(let i=0; i<data.length; i++) {
        keywords.push(data[i].FistName.toLowerCase());
        keywords.push(data[i].LastName.toLowerCase());
        keywords.push(data[i].StartDate.toLowerCase());
        keywords.push(data[i].Department.toLowerCase());
        keywords.push(data[i].DateOfBirth.toLowerCase());
        keywords.push(data[i].Street.toLowerCase());
        keywords.push(data[i].City.toLowerCase());
        keywords.push(data[i].State.toLowerCase());
        keywords.push(data[i].ZipCode.toLowerCase());
    }
    return sortAllElements(keywords)
}
function sortAllElements(tab) {
    let elementSorted = [];
    let allElements = tab;
        
    for(let i=0; i<allElements.length; i++) {
        let count = 0;
        for(let j=0; j<elementSorted.length; j++) {
            if(allElements[i] === elementSorted[j]) {
                count += 1;
            }
        }
        if(count === 0) {
            elementSorted.push(allElements[i]);
        }
    }    
    return elementSorted
}

function sortUserData(data, keywords) {
    let sortedUserData = [];
    for(let j=0; j<keywords.length; j++) {
        for(let i=0; i<data.length; i++) {
            const condition1 = data[i].FistName.toLowerCase() === keywords[j];
            const condition2 = data[i].LastName.toLowerCase() === keywords[j];
            const condition3 = data[i].StartDate.toLowerCase() === keywords[j];
            const condition4 = data[i].Department.toLowerCase() === keywords[j];
            const condition5 = data[i].DateOfBirth.toLowerCase() === keywords[j];
            const condition6 = data[i].Street.toLowerCase() === keywords[j];
            const condition7 = data[i].City.toLowerCase() === keywords[j];
            const condition8 = data[i].State.toLowerCase() === keywords[j];
            const condition9 = data[i].ZipCode.toLowerCase() === keywords[j];
            if(condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7 || condition8 || condition9) {
                sortedUserData.push(data[i]);
            }
        }
    }
    return sortUserDataMultipleElement(sortedUserData)
}

function sortUserDataMultipleElement (data) {
    let sortUserDataMultipleElement = [];
    for(let i=0; i<data.length; i++) {
        let count = 0;
        for(let j=0; j<sortUserDataMultipleElement.length; j++) {
            const condition1 = data[i].FistName === sortUserDataMultipleElement[j].FistName;
            const condition2 = data[i].LastName === sortUserDataMultipleElement[j].LastName;
            if(condition1 || condition2) {
                count += 1;
            }
        }
        if(count === 0) {
            sortUserDataMultipleElement.push(data[i]);
            count = 0;
        }
    }
    return sortUserDataMultipleElement
}

export default function CurrentEmployee() {
    let userData = data;
    const keywords = getKeywords(userData);
    const [sortedKeywords, setKeywords] = useState(getKeywords(userData));

    const [isTabEmpty, setIsTabEmpty] = useState(false);





    userData = sortUserData(userData, sortedKeywords);

    const [category, setIsCategory] = useState(null);
    const [isAscending, setIsAscending] = useState(null);

    userData = sortDataElements(userData, category, isAscending);

    const [startIndex, setStartIndex] = useState(0);
    let [numberEntries, setNumberEntries] = useState(10);
    const endIndex = setEndIndex(startIndex, numberEntries, userData);
    const userDataDisplayed = setUserDataDisplayed(userData, startIndex, endIndex);

    if(userData.length === 0 && isTabEmpty === false) {
        setIsTabEmpty(true);
    } 

    if(userData.length !== 0 && isTabEmpty === true) {
        setIsTabEmpty(false);
    } 


    return(
        <div id="employee-div" className="container">
            <Header />
            <div className='employees-page-banner'>
                <ShowNumberEntries numberEntries={numberEntries} setNumberEntries={setNumberEntries} />
                <SearchBar keywords={keywords} setKeywords={setKeywords} />
            </div>
            <EmployeeTable userData={userDataDisplayed} category={category} setIsCategory={setIsCategory} isAscending={isAscending} setIsAscending={setIsAscending} isTabEmpty={isTabEmpty} />
            <div className='employees-page-footer'>
                <EmployeeTableInfo startIndex={startIndex+1} endIndex={endIndex} userData={userData} />
                <EmployeeTablePaginate numberEntries={numberEntries} setStartIndex={setStartIndex} userData={userData} />
            </div>
        </div>
    )
}