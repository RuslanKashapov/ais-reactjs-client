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
import React, { useState } from "react";

import CityWeatherMonitor from "./CityWeatherMonitor";
import CityWeatherForm from "./CityWeatherForm";


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
function HomePage() {
  const [city, setCity] = useState('UFA');
  // Рендерим контент.
  // Функция map позволяет рендерить элементы массивов.
  return (
    <div className="uk-section uk-section-muted">
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
        <div className="uk-width-expand@m uk-card uk-card-default uk-card-body"><CityWeatherMonitor cityName={'UFA'}/></div>
      </div>
    </div>
  );
}

export default HomePage;