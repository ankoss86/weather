import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import './three.css';

class ThreeHourWeather extends Component {
    render() {

        const { fiveDay } = this.props.location;
        const { el } = fiveDay;
        const { day } = el;

        return (
            <div>
                {day.map(el=>
                    <div key={moment.unix(el.dt)}>
                        <span key={el.main.temp*Math.random()}>{moment.unix(el.dt).format('kk:mm')}</span>
                        <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`} alt='img'/>
                        <span>{Math.ceil(el.main.temp-273.15)}°</span>
                        
                    </div>)
            
                }                
            </div>
        );
    }
}

export default connect(null)(ThreeHourWeather);
