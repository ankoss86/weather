import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncByName } from '../../actions/getWatherByCityNameAction';
import { showInput } from '../../actions/showInputSearchAction';
import './inputName.css';

class InputByName extends Component {

state = {
    inputValue: '',
    showInput: false,
}

onChange = (e) => {
    this.setState({inputValue: e.target.value})
}

clearInput = () => {
    this.setState({inputValue: ''})
}

showInput = () => {
    this.setState({showInput: !this.state.showInput})
}

    render() {
        return (
            <div>
                <i onClick={this.showInput} className="addCity fas fa-plus"></i>
            <form className={this.state.showInput ? 'formInput' : 'hideForm'} action='#' onSubmit={(event)=>{event.preventDefault(); this.props.fetchWeatherByCityName(this.state.inputValue); this.clearInput(); this.props.hideInputSearchAction()}}>
                <input className='search' type='text' onChange={this.onChange} value={this.state.inputValue} placeholder='input city'></input> 
                <input className='submit' type='submit' value='search'></input>
            </form>
            </div>
        );
    }
}

const MSTP = (state) => {
    return {
        hideInputSearchState: state.showInputSearch,
    }
}

const MDTP = (dispatch) => {
    return {
        
      fetchWeatherByCityName: function(cityName){
          dispatch(asyncByName(cityName))
      },

      hideInputSearchAction: function(){
          dispatch(showInput())
      },
    }
  }

export default connect(MSTP, MDTP)(InputByName);