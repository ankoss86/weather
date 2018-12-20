
export const byCityName = (state=[], action) => {
    switch (action.type) {
        case 'GET_BY_CITY_NAME':            
            return action.data;    
        default:
            return state;
    }
}