import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Grid } from "@material-ui/core"
import currency from 'currency.js'
import Web3 from 'web3'
import CreatePayment from './container/CreatePayment'
import ConfirmPayment from './container/ConfirmPayment'
import { getErc20Balance } from '../../contracts/api/contracts'
import  { requestTransfer, cleanTransferReduce } from '../../redux/tokenPay/actions'

const PaymentIndex = props => {
    const [selectTokenModal, setSelectTokenModal] = useState(false)
    const [selectedToken, setToken] = useState(false)
    const [balance, setBalance] = useState(0)
    //New Signer State
    const [newSignerAddress, setNewSignerAddress] = useState('')
    const [newSignerAmount, setNewSignerAmount] = useState('')
    //Signers List
    const [listSigners, setListSigners] = useState([])
    const [totalToken, setTotalToken] = useState(0)
    //Page ID
    const [confirmPayModal, setConfirmPayModal] = useState(false)

    const setTokenParams = (token) => {
        setToken(token)
        setSelectTokenModal(false)
    }

    const addNewSigner = () => {
        try{
            if(!Web3.utils.isAddress(newSignerAddress)){
                alert("Invalid Address")
                return
            }
            if(!newSignerAmount || newSignerAmount === ""){
                alert('Invalid Amount')
                return
            }
            const total = currency(totalToken, { precision: 3 }).add(newSignerAmount, { precision: 3 }).format()
            const signer = {
                user: newSignerAddress,
                tokenValue:newSignerAmount
            }
            setTotalToken(total)
            setListSigners([...listSigners, signer])
            setNewSignerAddress('')
            setNewSignerAmount('')
        }catch(err){
            console.log(err)
        }
    }

    const removeReceipt = receipt => {
        try{
            const data = listSigners.filter((signer) =>signer !== receipt)
            setListSigners(data)
        }catch(err){
            console.log(err)
        }
    }

    const advanceToDeploy = async() => {
        if(listSigners.length === 0 && selectedToken === false){
            alert('Select a Token and put Receivers')
            return
        }
        if(listSigners.length === 0){
            alert('You need to put Receivers')
            return
        }
        if(selectedToken === false){
            alert('Select a Token for the payment')
            return
        }
        let balance = await getErc20Balance(selectedToken.address, props.web3Account.accountAddress)
        if(!(balance === 0)){
            balance = currency(balance).divide(selectedToken.divider).format()
        }
        setBalance(balance)
        setConfirmPayModal(true)

    }


    const initTransfer = () => props.requestTransfer(selectedToken, totalToken, listSigners)
    
    const closeModalAndCleanTransferReduce = () => {
        props.cleanTransferReduce()
        setConfirmPayModal(false)
        props.backToHome()
    }

    const closeModalTransfer = () => {
        props.cleanTransferReduce()
        setConfirmPayModal(false)
    }

    return(
        <Grid container direction="column" alignContent="center" justify="center" elevation={5} style={{ minHeight: 400 }}>
            <CreatePayment 
            removeReceipt={removeReceipt}
                selectedToken={selectedToken} setSelectTokenModal={setSelectTokenModal} 
                selectTokenModal={selectTokenModal} setTokenParams={setTokenParams} 
                newSignerAddress={newSignerAddress} newSignerAmount={newSignerAmount}
                setNewSignerAddress={setNewSignerAddress} setNewSignerAmount={setNewSignerAmount} 
                addNewSigner={addNewSigner} listSigners={listSigners} advance={advanceToDeploy} totalToken={totalToken}
            />
            {confirmPayModal &&
                <ConfirmPayment
                open={confirmPayModal}
                selectedToken={selectedToken}
                totalToken={totalToken}
                listSigners={listSigners}
                balance={balance}
                transferReducer={props.transferReducer}
                requestTransfer={initTransfer}
                closeModalTransfer={closeModalTransfer}
                closeModalAndCleanTransferReduce={closeModalAndCleanTransferReduce}
                />
            }
        </Grid>
    )
}

const mapStateToProps = ({web3Account, transferReducer}) => ({ web3Account, transferReducer })

const mapDispatchToProps = { requestTransfer, cleanTransferReduce }

export default connect(mapStateToProps, mapDispatchToProps)(PaymentIndex)