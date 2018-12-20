export const fiveDayHistory = (state=[], action) => {
    switch (action.type) {
        case 'GET_HISTORY':            
            return action.data;    
        default:
            return state;
    }
}