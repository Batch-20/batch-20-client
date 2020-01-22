const styles = theme => ({
  mainDiv: {
    backgroundColor: '#171824',
    minHeight: '100vh',
    backgroundImage: "linear-gradient(to right top, #2f3038, #272930, #202228, #191b20, #121419, #0f1217, #0b0f15, #070c13, #0a0f17, #0e121a, #10151d, #121720)",    width: '100%',
    padding: 10
  },
  box: {
    color:'grey',
    margin: 'auto',
    maxWidth: '450px',
  },
  buttonConfirm: {
    textTransform: 'none',
    backgroundColor: '#2a292f',
    margin: 10,
    width: 250,
    heigth: 36.5,
    color: 'white',
    '&:hover': {
      backgroundColor: '#43414d',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
    color:'white',
    '&:focus': {},
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 2.5,
    },
  },
  bootstrapInput: {
    borderRadius: 8,
    backgroundColor: '#5b605838',
    color: 'white',
    border: '1px solid #ced4da',
    fontSize: 10,
    height: '1.6875em',
    width: '250px',
    padding: '5px 6px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
  boxError: {
    backgroundColor: '#f1d0cc',
    maxWidth: 250,
    padding: 15,
    borderRadius: 8
  },
  boxSecondary: {
    backgroundColor: '#ccccff',
    maxWidth: 250,
    padding: 15,
    borderRadius: 8
  },
  logo:{
    margin: 10
  }
})

export default styles
