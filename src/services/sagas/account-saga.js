// saga
import { call, put, takeLatest } from 'redux-saga/effects'
import * as ActionTypes from '../../actions/action-type'
import {Alert } from 'react-native'
//service
import firebaseApp from '../../configs/firebase-config'
import {AccessToken,LoginManager} from 'react-native-fbsdk'
import Store from '../../configs/store'
import firebase from 'react-native-firebase';
 function* loginFacebook(params){
     /*
    
        /*
        const result = yield LoginManager.logInWithReadPermissions('public_profile','email');
        if (result.isCancelled){
            throw new Error('User cancelled request');    
        }
        //console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`)
        
        // Get the access token
        const data = yield AccessToken.getCurrentAccessToken();
        if(!data){
            throw new Error('Something went wrong obtaining the users access token ')//
        } 
        
        //Create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(params.payload);
        */
        // Login with credential
    try {
        const user =params.payload.user;
        console.log('User log:'+user);
        Store.dispatch({type: ActionTypes.LOGIN_WITH_FB_SUCCEED,message:'Sign In with FB',user:user})
    } catch (error) {
        Store.dispatch({type: ActionTypes.LOGIN_WITH_FB_FAILED,message:error})
    }
    
  
   
}
// Login from email and pass
export function* loginUser(params) {
    try{
        console.log('Login with Saga');
        if(params.payload.email===''||params.payload.pass===''){
            Alert.alert(
                'Thông báo',
                'Vui lòng điền mật khẩu và email.'
            )
            return;
        }
        else if (!(params.payload.email).includes('@gmail.com')){
            Alert.alert(
                'Thông báo',
                'Vui lòng điền đúng định dạnh email.\n Ví dụ : abc@gmail.com'
            )
            return;
        }
        firebase.app().auth().signInWithEmailAndPassword(params.payload.email,params.payload.pass)
        .then(lgUser =>{
            Store.dispatch({type: ActionTypes.SIGN_IN_SUCCEED,message:'sign in success',user:lgUser})
        })
        .catch(error=>{
            Store.dispatch({type: ActionTypes.SIGN_IN_FAILED,message:error})
            Alert.alert(
                'Thông báo',
                'Tên đăng nhập hoặc mật khẩu sai hoặc không tồn tại.\n Vui lòng kiểm tra lại'
            )
            });
    }catch( error ) {
        console.log('Login failed with error: ',error);
        yield put({type: ActionTypes.SIGN_IN_FAILED,message:error});
    }
}
export function* autoLogin(){
    firebase.app().auth().onAuthStateChanged((user)=>{
        if(user){
            Store.dispatch({type: ActionTypes.AUTO_LOGIN_SUCCEED,message:'sign in success',user:user})
        }else{
            Store.dispatch({type: ActionTypes.AUTO_LOGIN_FAILED,message:''})
        }
    })
}
// Create account
export function* signUpUser(params){
    try {
        
        firebase.app().auth().createUserWithEmailAndPassword(params.payload.email,params.payload.pass)
        .then(signUpUser => {
            Store.dispatch({type: ActionTypes.SIGN_UP_SUCCEED,message:'Sign up success',user:signUpUser});
            Alert.alert(
                'Thông báo',
                'Đăng kí thành công.Đã tự động đăng nhập',
                
              )
        }).catch(err=>{
            Store.dispatch({type:ActionTypes.SIGN_UP_FAILED,message:err})
            Alert.alert(
                'Thông báo',
                'Tên đăng nhập đã tồn tại. Vui lòng thử lại'
            )
        })
    } catch (error) {
        console.log('Sign Up failed with error: ',error);
        yield put({type: ActionTypes.SIGN_UP_FAILED,message:error})
    }
}
export function* accountSagas(){
    yield takeLatest(ActionTypes.SIGN_IN_REQUEST,loginUser);
}
export function* accountSaga2(){
    yield takeLatest(ActionTypes.SIGN_UP_REQUEST,signUpUser)
}
export function* accountSagaLogin(){
    yield takeLatest(ActionTypes.LOGIN_WITH_FB_REQUEST,loginFacebook)
}
export function* autoLoginSaga(){
    yield takeLatest(ActionTypes.AUTO_LOGIN_REQUEST,autoLogin)
}
