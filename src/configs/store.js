import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger'

// component
import reducers from '../reducers'
import rootSagas from '../services/sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create store
const store = createStore(reducers,applyMiddleware(createLogger,sagaMiddleware));

// run saga
sagaMiddleware.run(rootSagas);

// export 
export default store;