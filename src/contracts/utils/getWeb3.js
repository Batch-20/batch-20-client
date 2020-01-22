import Web3 from 'web3'

const getWeb3 = () => new Promise(async (resolve, reject) => {
  if (!window.ethereum && !window.web3) {
    reject('NO_WEB3')
  } else if (window.ethereum) {
    const web3 = new Web3(window.ethereum)
    try {
      await window.ethereum.enable()
      resolve(web3)
    } catch (err) {
      reject('USER_DENY')
    }
  } else if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider)
    resolve(web3)
  } else {
    reject('ERROR')
  }
})

export default getWeb3