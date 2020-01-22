import getWeb3 from "../utils/getWeb3"
import PAY_CONTRACT_ABI from "../abi/PayContractABI.json"
import ERC20_ABI from "../abi/IERC20ABI.json"
import { tokenInfo } from "../utils/tokenInfo"
import currency from 'currency.js'

export const PAY_CONTRACT_ADDRESS = "0x0a3c2723381573fedc238f0bb68a1899eb437384"

export const generatePayContract = () => new Promise(async (resolve, reject) => {
    try {
      const web3 = await getWeb3()
      const contract = new web3.eth.Contract(PAY_CONTRACT_ABI, PAY_CONTRACT_ADDRESS)
      resolve(contract)
    } catch (err) {
      console.log(err)
      reject(err)
    }
})

export const getPaymentsHistory = (address) => new Promise(async(resolve, reject) => {
  try{
      const contract = await generatePayContract()
      const history = await contract.getPastEvents('payment', {filter:{payer:address},fromBlock:9328805,toBlock: 'latest'})
      resolve(history)
  }catch(err){
      console.log(err)
      reject(err)
  }
})


export const generateErc20Contract = tokenAddress => new Promise(async (resolve, reject) => {
    try {
      const web3 = await getWeb3()
      const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress)
      resolve(contract)
    } catch (err) {
      console.log(err)
      reject(err)
    }
})

export const getErc20Balance = (tokenAddress, balanceAddress) => new Promise(async (resolve, reject) => {
    try {
      const web3 = await getWeb3()
      const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress)
      const balance = await contract.methods.balanceOf(balanceAddress).call()
      resolve(balance)
    } catch (err) {
      console.log(err)
      reject(err)
    }
})


export const getBalances = (balanceAddress) =>  new Promise(async (resolve, reject) => {
  try{
    const balances = tokenInfo.map(async (token) => {
      const balance = await getErc20Balance(token.address, balanceAddress)
      return currency(balance).divide(token.divider).format()
    })
    const result = await Promise.all(balances)
    resolve(result)
  }catch(err){
    reject(err)
  }
})

export const getEtherBalance = (balanceAddress) => new Promise(async(resolve, reject) => {
  try{
    const web3 = await getWeb3()
    const weiBalance = await web3.eth.getBalance(balanceAddress)
    const balance = await web3.utils.fromWei(weiBalance, 'ether')
    resolve(balance)
  }catch(err){
    console.log(err)
    reject(err)
  }
}) 



