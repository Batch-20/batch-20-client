export const requestTransfer = (selectedToken, value, receiversData) => ({
    type: 'REQUEST_TRANSFER',
    payload:{
        selectedToken, value, receiversData
    }
})

export const requestTransferInit = () => ({
    type: 'REQUEST_TRANSFER_INIT',
    payload:{
        step: 0,
        pendingAprove: true,
        runningAprove: false,
        pendingTransfer: false,
        runningTransfer: false,
        transferComplete: false,
        error: false
    }
})

export const requestTransferRunningAprove = () => ({
    type: 'REQUEST_TRANSFER_RUNNING_APROVE',
    payload:{
        step: 0,
        pendingAprove: false,
        runningAprove: true,
        pendingTransfer: false,
        runningTransfer: false,
        transferComplete: false,
        error: false
    }
})

export const requestTransferPending = () => ({
    type: 'REQUEST_TRANSFER_PENDING',
    payload:{
        step: 1,
        pendingAprove: false,
        runningAprove: false,
        pendingTransfer: true,
        runningTransfer: false,
        transferComplete: false,
        error: false
    }
})


export const requestTransferRunning = () => ({
    type: 'REQUEST_TRANSFER_RUNNING',
    payload:{
        step: 1,
        pendingAprove: false,
        runningAprove: false,
        pendingTransfer: false,
        runningTransfer: true,
        transferComplete: false,
        error: false
    }
})


export const requestTransferComplete = () => ({
    type: 'REQUEST_TRANSFER_COMPLETE',
    payload:{
        step: 1,
        pendingAprove: false,
        runningAprove: false,
        pendingTransfer: false,
        runningTransfer: false,
        transferComplete: true,
        error: false
    }
})

export const requestTransferError = () => ({
    type: 'REQUEST_TRANSFER_ERROR',
    payload:{
        step: 0,
        pendingAprove: false,
        runningAprove: false,
        pendingTransfer: false,
        runningTransfer: false,
        transferComplete: false,
        error: true
    }
})

export const cleanTransferReduce = () => ({
    type: 'CLEAN_TRANSFER_REDUCE',
    payload:{
        step: 0,
        pendingAprove: false,
        runningAprove: false,
        pendingTransfer: false,
        runningTransfer: false,
        transferComplete: false,
        error: false
    }
})
