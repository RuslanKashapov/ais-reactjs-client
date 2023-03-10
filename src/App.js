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
import HomePage from "./components/HomePage";
import UpdatePage from "./components/UpdatePage";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';


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
function App() {

  // Рендерим контент.
  // Функция map позволяет рендерить элементы массивов.
  return (
    <BrowserRouter>
        <nav class="uk-navbar-container">
          <div class="uk-navbar-center">
            <ul class="uk-navbar-nav">
              <li><NavLink to="/">Calculate</NavLink></li>
              <li><NavLink to="/update">Update</NavLink></li>
            </ul>
          </div>
        </nav>
        <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/update' element={<UpdatePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;