import * as ActionTypes from '../actions/action-type'

const initialState = {
    actionTypes:'',
    signIn: {
        isLoading: false,
        data: null,
        message: ''
    },
    signUp: {
        isLoading: false,
        data: null,
        message: ''
    },
    login: {
        isLoading: false,
        data: null,
        message: ''
    },
    loginFB: {
        isLoading: false,
        data:null,
        message:''
    },
    autoLogin:{
        isLoading:false,
        data:null,
        message:'',
    }
};

export default (state = initialState, action) => {
    state.actionType = action.type;
    switch (action.type) {
        case ActionTypes.SIGN_IN_SUCCEED:
            console.log('Login Success:'+action.message);
            return {
                login: {
                    isLoading:false,
                    data:action.user,
                    message:action.message
                }
            };
        case ActionTypes.SIGN_UP_SUCCEED:
            console.log('Sign Up Success:'+action.message);
            return {
                signUp: {
                    isLoading:false,
                    data:action.user,
                    message:action.message
                }
            }
        case ActionTypes.LOGIN_WITH_FB_REQUEST:
            console.log('Login With Facebook:'+action.message);
            return {
                loginFB:{
                    isLoading:false,
                    data:action.user,
                    message:action.message
                }
            }
        case ActionTypes.AUTO_LOGIN_REQUEST:
            console.log('Try to auto login'+action.message);
            return {
                autoLogin:{
                    isLoading:false,
                    data:action.user,
                    message:action.message
                }
            }
        default:
        return state;
    }
}