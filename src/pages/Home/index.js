import React from 'react'
import { Paper, Grid, Typography, Table, TableCell, TableRow, Button, CircularProgress } from "@material-ui/core"
import { connect } from 'react-redux'
import makeEthBlockie from 'ethereum-blockies-base64'
import { getBalances, getEtherBalance } from '../../contracts/api/contracts'
import { tokenInfo } from '../../contracts/utils/tokenInfo'
import { withStyles } from '@material-ui/core/styles';
import instantBuy from '../../components/InstantBuy'

const styles = theme => ({
    cellActualBalance:{
        color:  'grey',
        padding:10,
        borderColor: 'grey',
        
    },
    cellEther:{
        color:  'white',
        padding:10,
        border: 'none'
    },
    buttonNetwork: {
        fontSize:12, 
        width: 180, 
        margin: 10,
        textTransform:'none', 
        borderRadius:25,
        color: 'grey',
        borderColor:'#238a23',
        '&:hover': {
          borderColor:'green',
          color:'white'
        },
    },
    buttonBuy: {
        fontSize:12, 
        width: 160, 
        marginBottom: 10,
        textTransform:'none', 
        borderRadius:25,
        color: 'white',
        borderColor:'grey',
        '&:hover': {
          borderColor:'white',
          color:'white'
        },
    },
    blockieUser:{
        width: 60, height: 60, margin: 5, borderRadius: 15
    },
    box:{
        maxWidth: 800, borderRadius: 10, padding: 10, margin: 10, marginLeft: 40, marginRight: 40, backgroundColor: 'rgb(18, 19, 24)'
    },
    userAddressText:{
        wordBreak:'break-all', color:'white'
    }
  });

const Home = props => {
    const { classes } = props
    const [balances, setBalances] = React.useState([])
    const [etherBalance, setEtherBalance] = React.useState(0)
    const [loading, setLoading] = React.useState(true)


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getInfo = async() => {
        const info = await getBalances(props.web3Account.accountAddress)
        const ethBalance = await getEtherBalance(props.web3Account.accountAddress)
        setLoading(false)
        setBalances(info)
        setEtherBalance(ethBalance)
    }
    
    React.useEffect(() => {
        getInfo()
    },[])

    return(
        <Grid container direction="column" alignContent="center" justify="center">
          <Paper className={classes.box}>
          <Grid container alignItems="center" alignContent="center" justify="center">
                            <Button align="center" variant="outlined" className={classes.buttonNetwork}>
                                Ethereum Main Network
                            </Button>
                        </Grid>
          <Grid container direction="column" alignContent="center" justify="center" alignItems="center">
                    <Grid item alignContent="center" justify="center">
                           <img src={makeEthBlockie(props.web3Account.accountAddress)} className={classes.blockieUser} alt="User Avatar"/>
                    </Grid>
                    <Grid item>
                        <Typography align="center" className={classes.userAddressText}>{props.web3Account.accountAddress}</Typography>
                    </Grid>
            </Grid>
          </Paper>

          <Paper className={classes.box}>
          <Typography style={{color:'white', marginTop:5}} align="center">Balance</Typography>
          {loading ? <Grid container alignItems="center" alignContent="center" justify="center"><CircularProgress style={{color:'grey', marginTop: 30}}/></Grid> :
          <>
          <Grid container alignItems="center" alignContent="center" justify="center">
          <Table>
          <TableRow>
                    <TableCell className={classes.cellEther} component="th" scope="row">
                    Ethereum (ETH)
                    </TableCell>
                    <TableCell className={classes.cellEther} align="right">{etherBalance}</TableCell>
                </TableRow>
          </Table>
          <Button onClick={() => instantBuy()} className={classes.buttonBuy} variant="outlined">Buy Assets with ETH</Button>
          </Grid>
          <Table>
                {tokenInfo.map((token, index) => (
                <TableRow>
                    <TableCell className={classes.cellActualBalance} component="th" scope="row">
                    {token.name} ({token.symbol})
                    </TableCell>
                    <TableCell className={classes.cellActualBalance} align="right">{balances[index]}</TableCell>
                </TableRow>
                ))}
          </Table>
          </>
          }
            </Paper>
        </Grid>
    )
}

const mapStateToProps = ({web3Account}) => ({ web3Account })


export default connect(mapStateToProps)(withStyles(styles)(Home))