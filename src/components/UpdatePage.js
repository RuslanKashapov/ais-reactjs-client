import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, CITY_NAMES, POWER_NUMBERS } from "./constants";
import Select from 'react-select';
import UpdateMonitor from "./UpdateMonitor";


function UpdatePage() {
    const [selectNumber, setSelectedNumber] = useState('');
    const [selectHydrogen, setSelectedHydrogen] = useState('');

    const updateData = (event) =>{
        console.log('PUT Request to: ' + API_URL)
        event.preventDefault();  
        let data = {
        number: parseInt(selectNumber), 
        hydrogen: parseInt(selectHydrogen), 
        };
        axios.put(API_URL, data, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        })
        .then(response => {
        console.log('Response: ' + response.status);
        }, error => {
            console.log(error);
            alert(error);
        });
    }

    return (
      <div className="uk-margin uk-card uk-card-default uk-card-body uk-text-center">
        <div>
        <div className="uk-margin-strict">
        <div className="uk-margin">
          <label className="uk-form-label">Number:</label>
          <input className="uk-input" type="number" onChange={(e) => setSelectedNumber(e.currentTarget.value)} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Hydrogen:</label>
          <input className="uk-input" type="number" onChange={(e) => setSelectedHydrogen(e.currentTarget.value)}  onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} />
        </div>
        </div>
        <input onClick={updateData} type="submit" value="Update data" className="uk-button uk-button-primary"/>
        </div>
        <UpdateMonitor number={selectNumber} />
      </div>
    );

}
export default UpdatePage;






