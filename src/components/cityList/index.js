import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncByName } from '../../actions/getWatherByCityNameAction';
import { showInput } from '../../actions/showInputSearchAction';
import { asyncByNameToLocalStoradge } from '../../actions/getWeatherByCityNameToLocalStoradgeAction';
import './cityList.css';

class CityList extends Component {    

    componentDidMount() {
        this.props.fetchWeatherByCityName()       
    }    

    removeFromLocal = (name) => {
        let list = JSON.parse(localStorage.getItem('cityList')).filter(el => el !== name);
        localStorage.setItem('cityList', JSON.stringify(list));
    }

    render() {        
        return (            
            <div className='cityContainer'>
                {this.props.isLoadingToLS ? null : this.props.responce.map(el=> 
                    <React.Fragment className='fragment'>
                    <div className='test'>
                        <p onClick={()=>{this.props.hideInputSearchAction(); this.props.WeatherByCityName(el.data.name)}} key={el.data.name} className='cityListItems'>
                            {el.data.name}
                                <span key ={el.data.coord.lon} className='listWeather'>
                                    {Math.ceil(el.data.main.temp-273.15)}°
                                </span> 
                                
                        </p>
                        <i onClick={()=>{this.removeFromLocal(el.data.name); this.props.fetchWeatherByCityName()}} className="closeItems fas fa-times"></i>
                    </div>
                    </React.Fragment>
                )}
            </div> 
            
        );
    }
}

const MDTP = (dispatch) => {
    return {        
      fetchWeatherByCityName: function(cityName){
          dispatch(asyncByNameToLocalStoradge())
      },

      hideInputSearchAction: function(){
        dispatch(showInput())
    },

    WeatherByCityName: function(cityName){
        dispatch(asyncByName(cityName))
    },
    }
  }

const MSTP = (state) => {
    return {
        responce: state.byCityNameLocalStoradge,
        isLoadingToLS: state.isLoadinToLS,
    }
}

export default connect(MSTP, MDTP)(CityList);