import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './wiewWeather.css';

const WiewWeather = ({weatherRespons}) => {

    const { main, sys, weather, name } = weatherRespons;
    
    const { 
        humidity,
        pressure,
        temp } = main;
    
    const { 
        sunrise,
        sunset,
        country } = sys;

    const icons = weather.map(el=>el.icon);
    
    const addToLocalStoradge = () => {
        let cityList = [];
        // eslint-disable-next-line no-unused-expressions
        localStorage.getItem('cityList') === null ? localStorage.setItem('cityList', JSON.stringify(cityList)) : null 
        let arr = JSON.parse(localStorage.getItem('cityList'));
        // eslint-disable-next-line no-unused-expressions
        arr.length === 0 ? arr.push(name) : arr.includes(name) ? null : arr.push(name);
        localStorage.setItem('cityList', JSON.stringify(arr));
    }

    return (
        <div className='mainWiew'>
        <p onClick={addToLocalStoradge} className='weatherIn'><span className='cityName'>{name},{country}</span></p>
        <div className='weatherImgContainer'>
        {icons.length > 0 
            ? icons.map((el, i)=><img className='weatherImg' key={i} src={`http://openweathermap.org/img/w/${el}.png`} alt='img'/>) 
            : <img className='weatherImg' src={`http://openweathermap.org/img/w/${icons[0]}.png`} alt='img'/>
        }
        <span className='temp'>{Math.ceil(temp-273.15)}°</span>        
        </div>
        <div className='mainWeatherContainer'>
            <div className='weatherItems'>
                <div className='spanItem'>Humidity</div><div className='item'>{humidity} %</div>
            </div>
            <div className='weatherItems'>
                <div className='spanItem'>Pressure</div><div className='item'>{pressure} hpa</div>
            </div>
            <div className='weatherItems'>
                <div className='spanItem'>Sunrise</div><div className='item'>{moment.unix(sunrise).format('hh:mm')}</div>
            </div>
            <div className='weatherItems'>
                <div className='spanItem'>Sunset</div><div className='item'>{moment.unix(sunset).format('kk:mm')}</div>
            </div>
        </div>
        </div>
    );
};

const MSTP = state => {
    return {
      weatherRespons: state.byCityName.length === 0 ? state.byCityCoord : state.byCityName,
    }
  };

export default connect(MSTP)(WiewWeather);