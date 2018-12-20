import axios from 'axios';

const getByCityNameToLocalStoradge = (data) => ({
    type: 'GET_BY_CITY_NAME_TO_LOCAL_STORADGE',
    data, 
})

export const isLoading = () => ({
    type: 'IS_LOADING'
})

export const isloadingToLS = () => ({
    type: 'IS_LOADING_TO_LS'
})

function fetchByName(){
    if(localStorage.getItem('cityList') !== null){
        let cityList = JSON.parse(localStorage.getItem('cityList'));
            return Promise.all(
                cityList.map(el => 
                    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${el}&APPID=f9309e2cd6d1456b7357e1316b09ae22`))
            ) 
    }    
}

export const asyncByNameToLocalStoradge = () => dispatch => {
    fetchByName()
        .then(res => dispatch(getByCityNameToLocalStoradge(res)))
            .then(res => dispatch(isloadingToLS()))
            .catch(err => console.log(err))    
}
