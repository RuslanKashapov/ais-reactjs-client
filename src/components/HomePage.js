/**
 * import './App.css';
 * 
 * Стили по умолчанию App.css и index.css отключены, т.к. в данном приложении 
 * используется пакет со сторонними стилями UIKit (стили с префиксом uk-*).
 * 
 * Стили UIKit подключены через public/index.html:
 * 
 *   <link rel="stylesheet" href="%PUBLIC_URL%/uikit/css/uikit.min.css" />
 *   <script src="%PUBLIC_URL%/uikit/js/uikit.min.js"></script>
 *   <script src="%PUBLIC_URL%/uikit/js/uikit-icons.min.js"></script>
 *
 * Таким же образом можно подключать стили собственной разработки.
 * Подробнее о пакете UIKit см.: https://getuikit.com/docs/installation
 */
import React, { useState, useEffect } from "react";

import CityWeatherMonitor from "./CityWeatherMonitor";
import CityWeatherForm from "./CityWeatherForm";
import Info from "./Info";
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import axios from "axios";
import { CITY_NAMES } from "./constants";

/**
 * Корневой компонент App.js по умолчанию реализован в виде 
 * функционального компонента, для хранения состояния таких 
 * компонентов используется функция (хук) useState().
 * 
 * Зависимые компоненты (CityWeatherMonitor и CityWeatherForm) 
 * реализованы в виде классов и сохраняют состояние в специальном 
 * атрибуте state. Атрибут cityName={city} передаёт в данные компоненты
 * значение населённого пункта через объект props и соответствующий атрибут:
 * props.cityName
 * 
 * Подробнее о возможных реализациях React компонентов см.:
 * https://reactjs.org/docs/hooks-state.html
 * 
 */


async function getTypes() {
  const data = await axios.get("http://127.0.0.1:8000/types")
  const tmp = data.data
  const options = tmp.map(d => ({
    "value": d.id,
    "label": d.name
  }))
  this.setState({ types_: options })
}

function componentDidMount() {
  this.getCities()
  this.getTypes()
}

function handleChange_city(e) {
  this.setState({ city_id: e.value })
}

function handleChange_type(e) {
  this.setState({ types: e.value })
}


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
        <div className="uk-width-expand@m uk-card uk-card-default uk-card-body"><CityWeatherForm /> <br></br></div>
      </div>
      <div className="uk-grid uk-text-center">
        <div className="uk-width-expand@m uk-card uk-card-default uk-card-body"><CityWeatherMonitor cityName={selectCities}/></div>
      </div>
    </div>
  );
}

export default HomePage;