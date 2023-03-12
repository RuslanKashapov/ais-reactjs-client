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
  const [items, setItems] = useState([]);
  const [inputValue, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = value => {
    setValue(value);
  };

  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  const getCities = () => {
    return axios.get("http://127.0.0.1:8000/cities").then(result => {
      const res = result.data.data;
      return res;
    });
  }


  const [select, setSelected] = useState('');
  const [optionList, setOptionList] = useState([]);
  const fetchData = () => {
    axios
      .get('http://127.0.0.1:8000/cities')
      .then((response) => {
        const { data } = response;
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionList(data)
        } else {
          //error handle section 
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [])




  // Рендерим контент.
  // Функция map позволяет рендерить элементы массивов.
  return (
    <div className="uk-section uk-section-muted">
      <div className="uk-margin uk-card uk-card-default uk-card-body uk-text-center">
        {/* <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        //getOptionLabel={e => e.name}
        //getOptionValue={e => e.id}
        loadOptions={getCities}
        onInputChange={handleInputChange}
        onChange={handleChange}
      /> */}
        <select
          className="uk-select"
          disabled={false}
          value={select}
          onChange={(e) => setSelected(e.currentTarget.value)}
        >
          {optionList.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        {/* <select className="uk-select" placeholder='Select city' value={city} onChange={(e) => setCity(e.target.value)}>
         {Object.keys(getCities()).map((cityName) => <option value={cityName}>{cityName}</option>)}
          </select> */}
        <br></br>
        {/* <Select placeholder='Select transformator type' options={state.types_} onChange={handleChange_type.bind(type)}/> */}
      </div>
      <div className="uk-grid uk-text-center">
        <div className="uk-width-expand@m uk-card uk-card-default uk-card-body"><CityWeatherForm /> <br></br></div>
      </div>
      <div className="uk-grid uk-text-center-output">
        <div className="uk-grid uk-text-center-output-contain">
          <div className="uk-grid uk-text-center-output-index-left">
            <p>Health index(%)</p>
            <p className="health_index">76.31</p>
          </div>
          <div className="uk-grid uk-text-center-output-index-right">
            <table>
              <tr>
                <th>HI%</th>
                &ensp;
                <th>Condition</th>
                &ensp;
                <th>Expected Lifetime</th>
                &ensp;
                <th>Requirements</th>
              </tr>
              <tr>
                <td>85-100</td>
                &ensp;
                <td>Very Good</td>
                &ensp;
                <td>More than 15 years</td>
                &ensp;
                <td>Normal maintenance</td>
              </tr>
              <tr>
                <td>75-85</td>
                &ensp;
                <td>Good</td>
                &ensp;
                <td>More than 10 years</td>
                &ensp;
                <td>Normal maintenance</td>
              </tr>
              <tr>
                <td>50-70</td>
                &ensp;
                <td>Fair</td>
                &ensp;
                <td>From 3-10 years</td>
                &ensp;
                <td>Increase diagnostic testing, possible remedial work or replacement needed depending on criticality</td>
              </tr>
              <tr>
                <td>30-50</td>
                &ensp;
                <td>Poor</td>
                &ensp;
                <td>Less than 3 years</td>
                &ensp;
                <td>Start planning process to replace or rebuild considering risk and consequences of failure</td>
              </tr>
              <tr>
                <td>0-30</td>
                &ensp;
                <td>Very Poor</td>
                &ensp;
                <td>Near to the end of life</td>
                &ensp;
                <td>Immediately assess risk; replace or rebuild based on assessment</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="uk-grid uk-text-center">
        <div className="uk-width-expand@m uk-card uk-card-default uk-card-body"><CityWeatherMonitor cityName={'UFA'} /></div>
      </div>
    </div>
  );
}

export default HomePage;