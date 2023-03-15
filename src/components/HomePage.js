
import React, { useState, useEffect } from "react";

import TransformatorMonitor from "./TransformatorMonitor";
import TransformatorForm from "./TransformatorForm";
import axios from "axios";


function HomePage() {
  

  const [selectCities, setSelectedCities] = useState('UFA');
  const [selectTypes, setSelectedTypes] = useState('');
  const [optionListCities, setOptionListCities] = useState([]);
  const [optionListTypes, setOptionListTypes] = useState([]);
  const fetchCities = () => {
    axios
      .get('http://127.0.0.1:8000/cities')
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionListCities(data)
        } else {
          //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchTypes = () => {
    axios
      .get('http://127.0.0.1:8000/types')
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionListTypes(data)
        } else {
          //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };




  useEffect(() => {
    fetchCities();
    fetchTypes();
  }, [])




  // Рендерим контент.
  // Функция map позволяет рендерить элементы массивов.
  return (
    <div className="uk-section uk-section-muted">
      <div className="uk-margin uk-card uk-card-default uk-card-body uk-text-center">
        <select
          className="uk-select uk-text-center"
          disabled={false}
          value={selectCities}
          onChange={(e) => setSelectedCities(e.currentTarget.value)}
        >
          {optionListCities.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          className="uk-select uk-text-center"
          disabled={false}
          value={selectTypes}
          onChange={(e) => setSelectedTypes(e.currentTarget.value)}
        >
          {optionListTypes.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className="uk-grid uk-text-center">
        <div className="uk-width-expand@m uk-card uk-card-default uk-card-body"><TransformatorForm /> <br></br></div>
      </div>
      <div className="uk-grid uk-text-center">
        <div className="uk-width-expand@m uk-card uk-card-default uk-card-body"><TransformatorMonitor cityName={selectCities}/></div>
      </div>
    </div>
  );
}

export default HomePage;