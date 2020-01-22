import currency from 'currency.js'

function formatTokenValue(value, decimals){
    const intValue = currency(value, { precision: 3}).intValue
    const tokenValue = {
        '8': `${intValue}00000`,
        '18': `${intValue}000000000000000`
    }
    return tokenValue[decimals]
}

export default formatTokenValue