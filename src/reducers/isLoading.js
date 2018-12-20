export const isLoading = (state=true, action) => {
    switch (action.type) {
        case 'IS_LOADING':            
            return false;    
        default:
            return state;
    }
}

export const isLoadinToLS = (state=true, action) => {
    switch (action.type) {
        case 'IS_LOADING_TO_LS':            
            return false;    
        default:
            return state;
    }
}