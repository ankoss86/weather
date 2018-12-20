import axios from 'axios';
import { asyncHistory } from './fiveDay';

const getByCityName = (data) => ({
    type: 'GET_BY_CITY_NAME',
    data, 
})

export const isLoading = () => ({
    type: 'IS_LOADING'
})

function fetchByName(cityName){
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=f9309e2cd6d1456b7357e1316b09ae22`)
}

export const asyncByName = (cityName) => dispatch => {
    fetchByName(cityName)
    .then(res => dispatch(getByCityName(res.data)))
    .then(res => dispatch(asyncHistory(res.data.id)))
    .catch(err => console.log(err))
}
