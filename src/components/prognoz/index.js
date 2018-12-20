import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import './prognoz.css';

class Prognoz extends Component {

    render() {

        const { weatherRespons } = this.props;
        const { list } = weatherRespons;

        let arr = [];

        list.forEach((el) => {
            if(new Date(el.dt_txt).getDay() !== (new Date().getDay())){
                arr.push(el);
            }
        });

        const getDays = (arr, numberDay) => {
            return arr.filter(el => moment.unix(el.dt).format('dddd') === (moment().add(numberDay, 'days')).format('dddd'));
        };

        let day1 = getDays(arr, 1);
        let day2 = getDays(arr, 2);
        let day3 = getDays(arr, 3);
        let day4 = getDays(arr, 4);

        const weatherObj = [
            {day: day1},
            {day: day2},
            {day: day3},
            {day: day4},
        ];

        return (
            <div className='daysWeather'>
                {weatherObj.map((el, i)=>
                <NavLink className='navLink' key={i} to={{
                    pathname: `/threeHours/${moment.unix(el.day[0].dt).format('dddd')}`,
                    fiveDay: {el}
                    }}>
                    <div className='oneDay'>
                        <span className='dayName'>{moment.unix(el.day[0].dt).format('dddd')}</span>
                        <img className='dayImg' alt='img' src={`http://openweathermap.org/img/w/${el.day[1].weather[0].icon}.png`}></img>
                        <span className='day'>{Math.floor(el.day[4].main.temp-273.15)}°</span>                       
                        <span className='nigth'>{Math.floor(el.day[el.day.length-1].main.temp-273.15)}°</span>
                    </div>
                </NavLink>)
                }
            </div>
        );
    }
}

const MSTP = state => {
    return {
      weatherRespons: state.fiveDayHistory,
      isLoading: state.isLoading,
    }
  };

export default connect(MSTP) (Prognoz);