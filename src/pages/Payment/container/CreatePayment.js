import React from 'react'
import { Grid, Paper, Button, Tooltip, Typography, Divider, Fab } from "@material-ui/core"
import SelectToken from '../../../components/SelectToken'
import CurrencyInput from 'react-currency-input'
import AddIcon from '@material-ui/icons/Add';
import makeEthBlockie from 'ethereum-blockies-base64'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'


const CreatePayment = props => {
    const {
        selectedToken, setSelectTokenModal, selectTokenModal, setTokenParams, newSignerAddress, newSignerAmount,
        setNewSignerAddress, setNewSignerAmount, addNewSigner, listSigners, advance, totalToken, classes, removeReceipt
    } = props
    return(
        <Paper elevation={2} style={{backgroundColor:'#121318', maxWidth: 800, borderRadius: 10, padding: 20, margin: 10, marginLeft: 40, marginRight: 40}}>

        <Grid container direction="column">
           
            <Tooltip title="Select the asset that will be made the payment" placement="bottom-end">
                <Typography style={{color:'white'}} variant="subtitle1">Payment Asset</Typography>
            </Tooltip>
            <Divider />
            {selectedToken ?
            <>
            <Grid container align="center" alignContent="center" justify="center" alignItems="center"  style={{marginTop: 10}} direction="row">
                <Grid item>
                    <img src={selectedToken.logo} style={{width:40, heigth: 40, paddingRight: 10}} alt={selectedToken.name} />
                </Grid>
                <Grid item>
                    <p style={{color:'grey', marginTop: 5, marginRight: 5}}>{selectedToken.name}({selectedToken.symbol}) </p>
                </Grid>
                <Grid item>
                <Button className={classes.buttonAsset} onClick={() => setSelectTokenModal(true)} variant="outlined" color="primary">
                    Change Asset
                </Button>
                </Grid>
            </Grid>
            </>
            :
            <Button className={classes.buttonAsset} onClick={() => setSelectTokenModal(true)} variant="outlined" color="primary">
                Select Asset
            </Button>
            }
            <SelectToken open={selectTokenModal} setTokenParams={setTokenParams} />

            <Tooltip title="Select an Address and a amount of tokens to receive" placement="bottom-end">
                <Typography style={{marginTop:10,color:'white'}} variant="subtitle1">Add a Payment Recipient</Typography>
            </Tooltip>
            <Divider />
            <Grid container align="center" alignContent="center" justify="center" alignItems="center" direction="row" style={{marginTop: 10}}>
                <Grid item style={{margin:10}}>
                    <p style={{color:'grey'}}>Signer Address</p>
                    <input className={classes.input} value={newSignerAddress} onChange={e => setNewSignerAddress(e.target.value)}/>
                </Grid>
                <Grid item style={{margin:10}}>
                    <p style={{color:'grey'}}>Amount</p>
                    <CurrencyInput
                        className={classes.input}
                        precision="3"
                        value={newSignerAmount}
                        onChange={(event, value) => setNewSignerAmount(value)}
                    />
                </Grid>
                <Grid item>
                    <Fab onClick={() => addNewSigner()} className={classes.addReceiptFab}>
                        <AddIcon/>
                    </Fab>
                </Grid>
            </Grid>

            <Tooltip title="Select the Token that will be made the payments" placement="bottom-end">
                <Typography style={{marginTop:10,color:'white'}} variant="subtitle1">Recipients({listSigners.length})</Typography>
            </Tooltip>
            <p style={{fontSize: 10, color:'grey'}}>Total Amount: {totalToken}</p>
            <Grid container direction="row" style={{marginTop: 10}}>
            {listSigners.map((signer) => (
                <Grid container direction="row" style={{margin:10}}>
                    <Grid item>
                        <Button onClick={() => removeReceipt(signer)} style={{marginTop: 15, minWidth: 10, width: 10, height: 30}} color="secondary" variant="outlined">X</Button>
                    </Grid>
                    <Grid item>
                        <img src={makeEthBlockie(signer.user)} className={classes.blockieReceiptItem} alt="User Blockie"/>
                    </Grid>
                    <Grid item>
                    <p className={classes.labelReceiptItem}>Address</p>
                    <p style={{wordBreak:'break-all', color:'grey'}}>{signer.user}</p>
                    <p className={classes.labelReceiptItem}>Amount</p>
                    <p style={{color:'grey'}}>{signer.tokenValue}</p>
                    </Grid>
                </Grid>
            ))}
            </Grid>
            <Grid container align="center" alignContent="center" justify="center" alignItems="center" style={{marginTop:10}}>
                <Divider/>
                <Button onClick={() => advance()} variant="contained">Advance</Button>
            </Grid>

            </Grid>
            </Paper>
           
    )
}

export default withStyles(styles, { withTheme: true })(CreatePayment)
