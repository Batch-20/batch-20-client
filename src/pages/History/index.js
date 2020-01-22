import React from 'react'
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core"
import { connect } from 'react-redux'
import { getPaymentsHistory } from '../../contracts/api/contracts'
import { tokenInfo } from '../../contracts/utils/tokenInfo'
import currency from 'currency.js'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    buttonAsset: {
      fontSize:12, 
      width: 220,
      margin:10, 
      marginLeft: 15,
      marginRight: 15,
      textTransform:'none', 
      borderRadius:25,
      color: 'grey',
      borderColor:'grey',
      '&:hover': {
        borderColor:'grey',
        color:'white'
      },
    },
})

const History = props => {
    const { classes } = props
    const [history, setHistory] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getHistory = async() => {
        let history = await getPaymentsHistory(props.web3Account.accountAddress)
        history.reverse()
        setLoading(false)
        setHistory(history)
    }

    React.useEffect(() => {
        getHistory()
    },[])

    

    return(
        <Grid container direction="row" alignItems="center" style={{marginTop:5}} alignContent="center" justify="center">
              {loading ? <CircularProgress style={{color:'grey', marginTop: 30}}/> :
              history.map((payment) => {
                  console.log(payment)
                  const token = tokenInfo.find(info => info.address.toLowerCase() === payment.returnValues.tokenAddress.toLowerCase())
                  const value = currency(payment.returnValues.tokenAmount).divide(token.divider).format()
                  return(
                    <Grid item style={{margin:5, padding:10, backgroundColor: 'rgb(18, 19, 24)'}}>
                        <Typography style={{color:'white', fontSize:12}}>Asset</Typography>
                        <Typography style={{color:'grey'}}>{token.name} ({token.symbol})</Typography>
                        <Typography style={{color:'white', fontSize:12}}>Value</Typography>
                        <Typography style={{color:'grey'}}>{value}</Typography>
                        <a href={`https://rinkeby.etherscan.io/tx/${payment.transactionHash}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                        <Button variant="outlined" color="primary" className={classes.buttonAsset}>
                            View Details on Block Explorer
                        </Button>
                        </a>
                    </Grid>
                  )
              })
              }
        </Grid>
    )
}

const mapStateToProps = ({web3Account}) => ({ web3Account })


export default connect(mapStateToProps)(withStyles(styles)(History))