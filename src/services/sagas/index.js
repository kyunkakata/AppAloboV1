import { all } from 'redux-saga/effects'
import {accountSagas,accountSaga2,accountSagaLogin,autoLoginSaga} from './account-saga'
export default function* rootSaga(){
    yield all([
        accountSagas(),
        accountSaga2(),
        accountSagaLogin(),
        autoLoginSaga()
    ]);
}