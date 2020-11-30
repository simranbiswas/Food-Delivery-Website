
const cartConstants = {
  ADD_TO_CART_REQUEST: "ADD_TO_CART_REQUEST",
  ADD_TO_CART_SUCCESS: "ADD_TO_CART_SUCCESS",
  ADD_TO_CART_FAILURE: "ADD_TO_CART_FAILURE",
  RESET_CART: "RESET_CART",
  ADD_TO_CART: "ADD_TO_CART"
};

const initState = {
    cartItems: {
        user_id: {
            _id: '',
            name: '',
            img: '',
            price:'',
            qty: '',
        }
    },
    updatingCart: false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case cartConstants.ADD_TO_CART:
            state = {
                ...state,
                cartItems: action.payload.cartItems
            }
            break;
        
        case cartConstants.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initState
            }
    }
    return state;
}