export const requestFetchWeb3 = () => ({
    type: 'REQUEST_FETCH_WEB3',
    payload:{
        loading: true,
        error: false
    }
})

export const errorFetchWeb3 = (error) => ({
    type: 'ERROR_FETCH_WEB3',
    payload:{
        error,
        loading: false
    }
})

export const fetchWeb3 = (accountAddress) => ({
    type:'FETCH_WEB3',
    payload:{
        accountAddress
    }
})
