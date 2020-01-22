import React, { useState } from 'react'
import { Divider, Grid, Dialog, DialogContent, Stepper, Step, StepLabel, IconButton, Button, Typography, CircularProgress, DialogTitle, Table, TableRow, TableCell } from "@material-ui/core"
import currency from 'currency.js'
import makeEthBlockie from 'ethereum-blockies-base64'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles';

const PaymentModal = props => {
    const { transferReducer, requestTransfer, closeModalTransfer, closeModalAndCleanTransferReduce } = props
    const { pendingAprove, runningAprove, pendingTransfer, runningTransfer, transferComplete, error } = transferReducer
    
    let initTransfer = (!pendingAprove && !runningAprove && !pendingTransfer && !runningTransfer && !transferComplete)
    
    
    return(
        <Dialog open={props.openModal}>
        <DialogContent style={{padding:0, backgroundColor:'rgb(18, 19, 24)'}}>
        <Grid container direction="column" alignContent="center" alignItems="center" justify="center" style={{ padding: 10, maxWidth: 500 }}>
            {error && 
                <>
                <p style={{color:'white', margin: 5}} align="center">Some error occurred on the transaction</p>
                <Button variant="contained" onClick={() => closeModalTransfer()}>OK</Button>
                </>
            }

           

            {(!error) &&
            <>
                <div style={{width:300}}>
                    <Stepper style={{backgroundColor:'rgb(18, 19, 24)'}} activeStep={transferReducer.step} alternativeLabel>
                        <Step>
                            <StepLabel>Aprove</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel style={{color:"grey !important"}}>Transfer</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                {!(transferComplete) && 
                    <p style={{color:"grey"}} align="center">For make the payment first you need to aprove the value and after that confirm the transfer.</p>
                }
                <Grid container alignContent="center" alignItems="center" justify="center" direction="column" style={{margin:10}}>
                    <p style={{fontSize: 14, color:'grey'}}>Payment Value</p>
                    <p style={{color:"white"}}>{props.selectedToken.symbol} {props.totalToken}</p>
                </Grid>
                {initTransfer &&
                <Grid container direction="row" alignContent="center" alignItems="center" justify="center">
                    <Button style={{margin:5}} color="primary" variant="contained" onClick={() => requestTransfer()}>Aprove and Pay</Button>
                    <Button style={{margin:5}} variant="outlined" color="secondary" onClick={() => closeModalTransfer()}>Cancel</Button>
                </Grid>
                }
                {pendingAprove &&
                <Typography style={{color:"white"}}>Check your wallet and confirm the aprove transaction</Typography>
                }
                {pendingTransfer &&
                <Typography style={{color:"white"}}>Check your wallet and the confirm the transfer of the tokens</Typography>
                }
                {(runningAprove || runningTransfer) &&
                <CircularProgress style={{color:'grey'}}/>
                }

                {transferComplete && 
                <>
                <p align="center" style={{color:'white', fontSize:16, fontWeigth: 700, margin:5}}>Payment Confirmed</p>
                <Button variant="contained" style={{margin:10}} onClick={() => closeModalAndCleanTransferReduce()}>Back to dApp</Button>
                </>
                }
            </>
            }
        </Grid>
        </DialogContent>
        </Dialog>
    )
}


const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    cellActualBalance:{
        color:  'grey',
        padding:5,
        border: 'none'
    },
    cellNewBalance:{
        color:'white',
        padding:5,
        border:'none'
    }
  });
  

const ConfirmPayment = props => {
    const [openModal , setOpenModal] = useState(false)
    const {
        classes, open, listSigners, selectedToken, balance, totalToken, transferReducer, requestTransfer, closeModalAndCleanTransferReduce, closeModalTransfer
    } = props

    const suficientBalance = (currency(balance, { precision:3 }).intValue >= currency(totalToken,{precision:3}).intValue)
    const newBalance = currency(balance).subtract(totalToken).format()
    return(
        <Dialog open={open}>
        <DialogTitle onClose={closeModalTransfer} style={{backgroundColor: 'rgba(0, 0, 0, 0.88)', color:'white'}}>
          Payment Review
                <IconButton aria-label="close" className={classes.closeButton} onClick={closeModalTransfer}>
                <CloseIcon />
                </IconButton>

        </DialogTitle>
        <DialogContent style={{padding:0,backgroundColor:'rgb(18, 19, 24)' }}>
        <Grid container direction="column">
            <PaymentModal 
                openModal={openModal}
                totalToken={totalToken}
                selectedToken={selectedToken}
                transferReducer={transferReducer}
                requestTransfer={requestTransfer}
                closeModalTransfer={closeModalTransfer}
                closeModalAndCleanTransferReduce={closeModalAndCleanTransferReduce}
            />
            <Grid container alignItems="center" justify="center"  style={{padding:10}}>
            <Typography align="center" style={{fontWeight: 600, color: 'white'}}>Asset</Typography>
            <Grid container alignContent="center" alignItems="center" justify="center" direction="row">
                <Grid item>
                    <img src={selectedToken.logo} style={{width:40, heigth: 40, paddingRight: 10}} alt={selectedToken.name} />
                </Grid>
                <Grid item>
                    <Typography align="center" style={{fontSize:20, color:'grey'}}>{selectedToken.name} ({selectedToken.symbol}) </Typography>
                </Grid>
            </Grid>
            <Grid container alignContent="center" style={{margin:10}} alignItems="center" justify="center" direction="column">
                <Typography style={{fontWeight: 600, color:'white'}}>Payment Value</Typography>
                <Typography align="center"  style={{fontSize:20, color:'grey'}}>{selectedToken.symbol} {totalToken}</Typography>
            </Grid>
            <Grid container alignContent="center" alignItems="center" justify="center" direction="row">
                <Table style={{color:"white", border:'none'}}>
                    <TableRow>
                        <TableCell className={classes.cellActualBalance} component="th" scope="row">Actual Balance</TableCell>
                        <TableCell className={classes.cellActualBalance} align="right">{selectedToken.symbol} {balance}</TableCell>
                    </TableRow>
                    {suficientBalance &&
                    <TableRow>
                        <TableCell className={classes.cellNewBalance} component="th" scope="row">New Balance</TableCell>
                        <TableCell className={classes.cellNewBalance} align="right">{selectedToken.symbol} {newBalance}</TableCell>
                    </TableRow>
                    }
                </Table>
                {suficientBalance ?
                    <>
                    <Divider/>
                    <Button variant="contained" style={{margin:5}} onClick={() => setOpenModal(true)}>Init Transfer Process</Button>
                    <Divider/>
                    </>
                    :
                    <Button color="secondary" style={{fontSize:16,margin:5}}>Insuficient Balance</Button>
                }
            </Grid>

            </Grid>


            <Typography align="center" style={{marginTop:10,fontWeight:600,color:'white'}} variant="subtitle1">Recipients({listSigners.length})</Typography>
            <Grid container alignContent="center" alignItems="center" justify="center" direction="row" style={{marginTop: 10}}>
                {listSigners.map((signer) => (
                    <Grid container alignItems="center" justify="center" direction="row" style={{margin:10}}>
                        <Grid item>
                            <img src={makeEthBlockie(signer.user)} style={{width: 40, height: 40, margin: 10}} alt="ETH Address Avatar"/>
                        </Grid>
                        <Grid item>
                        <p style={{fontSize: 12, color:'white'}}>Address</p>
                        <p style={{wordBreak:'break-all', color:'grey'}}>{signer.user}</p>
                        <p style={{fontSize: 12, color:'white'}}>Amount</p>
                        <p style={{color:'grey'}}>{selectedToken.symbol} {signer.tokenValue}</p>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
        </DialogContent>
        </Dialog>
           
    )
}

export default withStyles(styles, { withTheme: true })(ConfirmPayment)
