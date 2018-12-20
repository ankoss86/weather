import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../store';
import { asyncByCoord } from '../../actions/byCoord';
import { asyncHistory } from '../../actions/fiveDay';
import { showInput } from '../../actions/showInputSearchAction';
import InputByName from '../../components/InputByName';
import WiewWeather from '../../components/wiewWeather';
import Prognoz from '../../components/prognoz';
import ThreeHourWeather from '../../components/threeHourWeather';
import CityList from '../../components/cityList';
import './backGround.css';


class BackGround extends Component {

    render() {    
     

        const { weatherRespons } = this.props; 
        const { weather } = weatherRespons;
        const { main } = weather[0];
        
        let weatheUrl;

            switch (main) {
                case 'Rain':
                    weatheUrl = 'https://img4.postila.ru/storage/9696000/9669683/757b5fa96376f5adae29350c5dcd4168.gif';
                        break;
                case 'Clouds':
                    weatheUrl = 'https://i.gifer.com/1ox7.gif';  
                        break;  
                case 'Snow':
                    weatheUrl = 'https://www.meteovesti.ru/pictures/63556480273.gif';
                        break;
                case 'Clear':
                    weatheUrl = 'https://i.gifer.com/OxU.gif';
                        break;
                case 'Wind':
                    weatheUrl = 'https://i.gifer.com/3bx.gif'; 
                        break;
                case 'Mist':
                    weatheUrl = 'https://99px.ru/sstorage/86/2016/05/image_861505161544186310095.gif';
                        break;
                case 'Drizzle':
                    weatheUrl = 'http://4.bp.blogspot.com/-b7XbIo9V_qo/VfcRJeIh1sI/AAAAAAAAA5w/aRLLMKM5icQ/s1600/109725093_4603781_0a1db98eaced00a8ac9482548a19ec66.gif';
                        break;
                case 'Fog':
                    weatheUrl = 'https://99px.ru/sstorage/86/2016/05/image_861505161544186310095.gif';
                        break;
                default:
                    weatheUrl = 'https://i.gifer.com/3bx.gif';
                        break;
            };

        return (                         
            <div className='backGroundImg' style={{backgroundImage: `url("${weatheUrl}")`}}>

                <i onClick={this.props.showInputAction} className={`${this.props.showInputState === false ? 'showSearchInput' : 'hideInput'} fas fa-bars`}></i>

                {this.props.showInputState && 
                    <React.Fragment>
                        <InputByName/>                        
                        <CityList/>
                    </React.Fragment>                   
                }        
                
                {!this.props.showInputState &&
                    <React.Fragment>
                        <WiewWeather/>
                            <ConnectedRouter history={history}>
                                <Switch>
                                    <Route exact path='/' render={props =><Prognoz {...props}/>}/>
                                    <Route path='/threeHours/:day' render={props =><ThreeHourWeather {...props}/>}/>
                                </Switch>
                            </ConnectedRouter>
                    </React.Fragment>
                }
                        
            </div>           
        );
    }
}

const MSTP = state => {
    return {
      weatherRespons: state.byCityName.length === 0 ? state.byCityCoord : state.byCityName,
      isLoading: state.isLoading,
      isLoadingToLS: state.isLoadinToLS,
      fiveDay: state.fiveDayHistory,
      showInputState: state.showInputSearch,
    }
  };

const MDTP = (dispatch) => {
    return {

      fetchWeatherByCoord: function(lat, lon){
          dispatch(asyncByCoord(lat, lon))
      },

      fethHistory: function(cityName){
          dispatch(asyncHistory(cityName))
      },

      showInputAction: function(){
          dispatch(showInput())
      },
    }
  }

export default connect(MSTP, MDTP)(BackGround);