import { createStore, applyMiddleware, combineReducers}  from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from '../history'
import { getWeb3AccountSaga } from './accountInfo/saga'
import { web3AccountReducer } from './accountInfo/reducers'
import { transferReducer } from './tokenPay/reducers'
import tokenPaySaga from './tokenPay/saga'

const sagaMiddleware = createSagaMiddleware()

const rootReducers = combineReducers({
    router: connectRouter(history),
    //Reducers   
    web3Account: web3AccountReducer,
    transferReducer
})

const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)  
]

const store = createStore(
    rootReducers,
    applyMiddleware(...middlewares)
)

//@@ Sagas
sagaMiddleware.run(getWeb3AccountSaga)
sagaMiddleware.run(tokenPaySaga)

export default store