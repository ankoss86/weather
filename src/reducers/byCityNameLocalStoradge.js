export const byCityNameLocalStoradge = (state=[], action) => {
    switch (action.type) {
        case 'GET_BY_CITY_NAME_TO_LOCAL_STORADGE':            
            return action.data;    
        default:
            return state;
    }
}