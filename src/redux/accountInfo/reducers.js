export const web3AccountReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case 'REQUEST_FETCH_WEB3':
        return { ...payload }
      case 'ERROR_FETCH_WEB3':
        return { ...payload }
      case 'FETCH_WEB3':
        return { ...payload }
      default:
        return state
    }
  }