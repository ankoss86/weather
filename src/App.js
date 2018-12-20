import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncByCoord } from './actions/byCoord';
import BackGround from './components/backGround';
import './App.css';

class App extends Component {  

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
            this.props.fetchWeatherByCoord(position.coords.latitude, position.coords.longitude);
      })             
  }

  render() {
    return (
      <div className="App">

      {this.props.isLoading 
        ? null 
        : <BackGround/> 
      }   
         
      </div>
    );
  }
}

const MSTP = state => {
  return {
    isLoading: state.isLoading,
  }
};

const MDTP = (dispatch) => {
  return {
    fetchWeatherByCoord: function(lat, lon){
        dispatch(asyncByCoord(lat, lon))
    },
  }
};

export default connect(MSTP, MDTP)(App);
