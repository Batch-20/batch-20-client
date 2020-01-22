const initialData =  {
  pendingAprove: false,
  runningAprove: false,
  pendingTransfer: false,
  runningTransfer: false,
  transferComplete: false,
  error: false
}
export const transferReducer = (state = {...initialData}, { type, payload }) => {
    switch (type) {
      case 'REQUEST_TRANSFER_INIT':
        return { ...payload }
      case 'REQUEST_TRANSFER_RUNNING_APROVE':
        return { ...payload }
      case 'REQUEST_TRANSFER_PENDING':
        return { ...payload }
      case 'REQUEST_TRANSFER_RUNNING':
        return { ...payload }
      case 'REQUEST_TRANSFER_COMPLETE':
        return { ...payload }
      case 'REQUEST_TRANSFER_ERROR':
        return { ...payload }
      case 'CLEAN_TRANSFER_REDUCE':
        return { ...payload }
      default:
        return state
    }
  }