export const byCityCoord = (state=[], action) => {
    switch (action.type) {
        case 'GET_BY_COORD':            
            return action.data;    
        default:
            return state;
    }
}