const initState = {
    error: '',
    message: '',
    loading: false
}

const userConstants = {
    USER_REGISTER_REQUEST : 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS : 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILURE : 'USER_REGISTER_FAILURE'
}

export default (state = initState, action) => {
    switch(action.type){
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}