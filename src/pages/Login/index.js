import React from 'react'
import LoginContainer from './container/index'
import { connect } from 'react-redux'
import { requestFetchWeb3 } from '../../redux/accountInfo/actions'

const mapStateToProps = ({web3Account}) => ({ web3Account })

const mapDispatchToProps = { requestFetchWeb3 }

const LoginPage = ({ web3Account, requestFetchWeb3 }) => {

    return(
        <LoginContainer web3Account={web3Account} requestFetchWeb3={requestFetchWeb3}/>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)