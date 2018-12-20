import axios from 'axios';
import { asyncHistory } from './fiveDay';

const getByCoord = (data) => ({
    type: 'GET_BY_COORD',
    data, 
})

function fetchByCoord(lat, lon){
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=f9309e2cd6d1456b7357e1316b09ae22`)
}

export const asyncByCoord = (lat, lon) => dispatch => {
    fetchByCoord(lat, lon)
    .then(res => dispatch(getByCoord(res.data)))
    .then(res => dispatch(asyncHistory(res.data.id)))
    // .then(res => dispatch(isLoading()))
    .catch(err => console.log(err))
}