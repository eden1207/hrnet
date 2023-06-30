import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


export default function DatePicker({ id, date, setDate }) {
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    return isDatePickerOpen ? (
        <div className='calendar-position'>
            <Calendar 
                value={date}
                onChange={(e) => {
                    const year = e.getFullYear();
                    const month = e.getMonth()+1;
                    const day = e.getDate();
                    function setTwoDecimalNumber(number) {
                        if(number.toString().length === 1) {
                            number = '0' + number;
                            return number
                        }
                        return number
                    }
                    setIsDatePickerOpen(false);
                    setDate(setTwoDecimalNumber(month) + '/' + setTwoDecimalNumber(day) + '/' + year);
                }} 
            />
        </div>
    ) : (
        <div>
            <input 
                id={id}
                type="text"
                placeholder={date}
                onChange={(e) => {
                    setDate(e.target.value);
                }} 
                onClick={() => {
                    setIsDatePickerOpen(true);
                }}
            />
        </div>
    )
}