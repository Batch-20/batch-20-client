import React from 'react'
import { Dialog, List, ListItem, ListItemIcon, ListItemText, DialogTitle, DialogContent } from '@material-ui/core'
import { tokenInfo } from '../../contracts/utils/tokenInfo'

const SelectToken = ({open, setTokenParams}) => {
    return(
        <Dialog open={open} style={{padding: 25}}>
            <DialogTitle style={{backgroundColor: 'rgba(0, 0, 0, 0.88)', color:'white'}}>Select Token</DialogTitle>
            <DialogContent style={{backgroundColor:'rgb(18, 19, 24)' , padding:10}}>
            <List component="nav">
                {tokenInfo.map((token) => (
                    <ListItem onClick={() => setTokenParams(token)} button>
                    <ListItemIcon>
                        <img src={token.logo} style={{width:40, heigth: 40, paddingRight: 5, fontWeigth: 300}} alt={token.name} />
                    </ListItemIcon>
                    <ListItemText primary={<p style={{paddingTop: 5, color:'white', }}>{`${token.name} (${token.symbol})`}</p>} />
                    </ListItem>
                ))}
            </List>
            </DialogContent>
        </Dialog>
    )
}

export default SelectToken