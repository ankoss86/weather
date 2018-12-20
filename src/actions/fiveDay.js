import axios from 'axios';
import { isLoading } from './getWatherByCityNameAction';

const getHistory = (data) => ({
    type: 'GET_HISTORY',
    data, 
})

function fetchHistory(cityName){
    return axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityName}&APPID=f9309e2cd6d1456b7357e1316b09ae22`)
}

export const asyncHistory = (cityName) => dispatch => {
    fetchHistory(cityName)
        .then(res => dispatch(getHistory(res.data)))
        .then(res => dispatch(isLoading()))
        .catch(err => console.log(err))
}