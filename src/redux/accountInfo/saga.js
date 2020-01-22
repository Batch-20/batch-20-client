import { put, call, all, takeLatest } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import Web3 from 'web3'
import { errorFetchWeb3, fetchWeb3 } from './actions'

export function* getWeb3AccountSaga() {
    yield all([
      takeLatest('REQUEST_FETCH_WEB3', getWeb3Account)
    ])
} 

function* getWeb3Account(){
    if (!window.ethereum && !window.web3) {
      yield put(errorFetchWeb3('noWeb3'))
    } else if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
      try {
        yield call(window.ethereum.enable)
        const network = yield call(web3.eth.eth.getChainId)
        if(network !== 1){
          console.log('Invalid Network')
          alert('Connect on Main Net')
          return
        }
        const accounts = yield call(web3.eth.getAccounts)
        yield put(fetchWeb3(accounts[0]))
        yield put(push('/dashboard'))
      } catch (err) {
        yield put(errorFetchWeb3('notAuthorized'))
      }
    } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider)
        const network = yield call(web3.eth.eth.getChainId)
        if(network !== 1){
          console.log('Invalid Network')
          alert('Connect on Main Net')
          return
        }
        const accounts = yield call(web3.eth.getAccounts)        
        yield put(fetchWeb3(accounts[0]))
        yield put(push('/dashboard'))
    } else {
        yield put(errorFetchWeb3('notAuthorized'))
    }
}