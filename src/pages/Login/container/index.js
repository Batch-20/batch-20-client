import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid,
  Button,
  Typography,
  Divider,
  CircularProgress
} from '@material-ui/core'
import logo from '../../../assets/img/batch-logo.png'
import styles from './styles'
import boxPayImg from '../../../assets/img/connection.png'
import boxBuyImg from '../../../assets/img/digital-wallet.png'


const LoginContainer = props => {
    const { classes, web3Account, requestFetchWeb3 } = props
    const { error, loading } = web3Account
    return (
      <>
        <Grid container className={classes.mainDiv}>
          <Grid
            container
            className={classes.box}
            justify="center"
            alignContent="center"
            direction="column"
          >
            <Grid container justify="center" direction="column" alignContent="center">
              <img src={logo} align="center" alt="Logo" className={classes.logo} />
              <Typography variant="h6" align="center">Buy and Send ERC-20 Payments for several addresses in an secure and agile way</Typography>
            </Grid>
            <Divider variant="middle" />
            {(error === 'noWeb3') && (
              <Grid container justify="center" alignContent="center" alignItems="center" style={{ padding: 10 }}>
                <Grid item className={classes.boxError}>
                  <Typography align="center" style={{ fontSize: 12, color: '#b22f2f' }}>Not Detected any Ethereum Provider</Typography>
                </Grid>
              </Grid>
            )}
            {(error === 'notAuthorize') && (
              <Grid container justify="center" alignContent="center" alignItems="center" style={{ padding: 10 }}>
                <Grid item className={classes.boxError}>
                  <Typography align="center" style={{ fontSize: 12, color: '#b22f2f' }}>You not authorize Batch 20 to connect with your Ethereum Wallet.<span onClick={this.loadWallet} style={{ color: 'blue' }}>Try Again</span></Typography>
                </Grid>
              </Grid>
            )}
     
            <Grid style={{ paddingTop: 10 }} item>
              <Grid container justify="center" alignContent="center">
              <Button
                  onClick={() => requestFetchWeb3()}
                  className={classes.buttonConfirm}
                  align="center"
                  variant="contained"
                >{loading ?
                  <CircularProgress size={22} style={{color:'grey'}} />
                :
                  "Login with a Ethereum Wallet"
                }
                </Button>
              </Grid>
            </Grid>
  
          </Grid>
        </Grid>
        <Grid container direction="row" style={{marginTop: 15, marginBottom: 15}} justify="center" alignContent="center" alignItems="center">
          <Grid item direction="column" style={{padding:10, margin:10}}>
            <div style={{maxWidth: 350}} justify="center" alignContent="center" alignItems="center" >
            <Grid container justify="center" alignContent="center" alignItems="center">
              <img src={boxPayImg} style={{width: 70, height: 70, margin: 10}} />
              </Grid>
              <Typography align="center" style={{color: 'white'}}>Batch Payments</Typography>
              <Typography align="center" style={{color: 'grey'}}>Use Batch 20 to send ERC-20 payments to multiple address in a non-custodial process</Typography>
            </div>
          </Grid>
          <Grid item direction="column" style={{padding:10, margin:10}} justify="center" alignContent="center" alignItems="center">
            <div style={{maxWidth: 350}} >
              <Grid container justify="center" alignContent="center" alignItems="center">
              <img src={boxBuyImg} style={{width: 70, height: 70, margin: 10}} />
              </Grid>
              <Typography align="center" style={{color: 'white'}}>Buy ERC-20</Typography>
              <Typography align="center" style={{color: 'grey'}}>Buy a variety of ERC-20 tokens with Ether in a instantly, safely and non-custodial way</Typography>
            </div>
            </Grid>
        </Grid>
        <Grid container direction="column" style={{backgroundColor:'black', padding: 20}} justify="center" alignContent="center" alignItems="center">
        <img src={logo} align="center" alt="Logo" style={{width: 150,height: 50}} />
        <a  style={{textDecoration: 'none'}} href="https://github.com/senarma/batch-20" target="_blank" rel="noopener noreferrer">
        <Typography style={{color:'grey', textDecoration: 'none'}}>Github</Typography>
        </a>
        </Grid>
        </>
      )
}

export default withStyles(styles, { withTheme: true })(LoginContainer)
