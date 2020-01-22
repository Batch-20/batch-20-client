const styles = theme => ({
    buttonAsset: {
      fontSize:12, 
      width: 120, 
      textTransform:'none', 
      borderRadius:25,
      color: 'grey',
      borderColor:'grey',
      '&:hover': {
        borderColor:'grey',
        color:'white'
      },
    },
    input:{
        padding:10, backgroundColor:'grey', borderColor:'grey', borderRadius: 10
    },
    blockieReceiptItem:{
        width: 40, height: 40, margin: 10,
        borderRadius: 10
    },
    labelReceiptItem:{
        fontSize: 10,
        color: 'white'
    },
    addReceiptFab:{
        width: 40,
        height: 40,
        margin: 15,
        marginTop: 25,
        backgroundColor:'#4a4b53',
        '&:hover': {
            backgroundColor:'#727379'
          },

    }
  })
  
  export default styles
  