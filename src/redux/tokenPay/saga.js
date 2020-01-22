import { put, call, select, take, all, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { generateErc20Contract, generatePayContract, PAY_CONTRACT_ADDRESS } from '../../contracts/api/contracts';
import formatTokenValue from '../../contracts/utils/formatTokenValue';
import { requestTransferInit, requestTransferRunningAprove, requestTransferPending, requestTransferError, requestTransferRunning, requestTransferComplete } from './actions';

export function* tokenPaySaga() {
  yield all([
    takeLatest('REQUEST_TRANSFER', tokenPay)
  ])
} 


function* tokenPay({payload}) {
  const {
    selectedToken, value, receiversData
  } = payload;

  try {
    yield put(requestTransferInit())
    const valueInvest = yield call(formatTokenValue, value, selectedToken.decimals)
    const listSigners = yield all(receiversData.map(signer => {
      const tokenValue = formatTokenValue(signer.tokenValue, selectedToken.decimals)
      return { user: signer.user, tokenValue} 
    }))
    const ErcContract = yield call(generateErc20Contract, selectedToken.address)
    const allowData = yield call(ErcContract.methods.approve, PAY_CONTRACT_ADDRESS, valueInvest)
    const txAllowReceipt = yield call(TransactionSaga, allowData, requestTransferRunningAprove, requestTransferPending)
    console.log(txAllowReceipt)
    const PayContract = yield call(generatePayContract)
    const payData = yield call(PayContract.methods.newTokenPayment, listSigners, valueInvest, selectedToken.address)
    const txInvestReceipt = yield call(TransactionSaga, payData, requestTransferRunning, requestTransferComplete)
    console.log(txInvestReceipt)
  } catch (err) {
    console.log(err)
    yield put(requestTransferError())
  }
}



function* TransactionSaga(transactionData, onTxDeploy, onTxMined) {
  let userAddress
  let tx
  let channels
  try {
    userAddress = yield select(state => state.web3Account.accountAddress)
    tx = transactionData.send({ from: userAddress })

    channels = new eventChannel(emit => {
      tx.once('transactionHash', tx => {
        console.log(`TX_DEPLOY: ${tx}`)
        emit({
          tx,
          type: 'TX_DEPLOY',
        })
      })
      tx.once('receipt', receipt => {
        emit({
          receipt,
          type: 'TX_MINED',
        })
        console.log(receipt)
      })
      tx.on('error', error => {
        console.log(error)
        emit({
          error,
          type: 'TX_ERROR',
        })
      })
      return () => {}
    })

    while (true) {
      const chan = yield take(channels)
      if (chan.type === 'TX_DEPLOY') yield put(onTxDeploy(chan.tx))
      if (chan.type === 'TX_MINED') {
        yield put(onTxMined(chan.receipt))
        return chan
      }
      if (chan.type === 'TX_ERROR') {
        throw chan.error
      }
    }
  } catch (err) {
    throw err
  }
}

export default tokenPaySaga;
