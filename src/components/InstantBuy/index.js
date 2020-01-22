const instantBuy = () => {
    window.zeroExInstant.render({
        orderSource: 'https://api.0x.org/sra/',
        affiliateInfo: {
            feeRecipient: '0xabd10b45c69ab2c020265ecfb1220e51908cac8a',
            feePercentage: 0.005
        },
        availableAssetDatas: [
            '0xf47261b0000000000000000000000000514910771af9ca656af840dff83e8264ecf986ca', 
            '0xf47261b000000000000000000000000089d24a6b4ccb1b6faa2625fe562bdd9a23260359', 
            '0xf47261b0000000000000000000000000e41d2489571d322189246dafa5ebde1f4699f498', 
            '0xf47261b00000000000000000000000006b175474e89094c44da98b954eedeac495271d0f', 
            '0xf47261b00000000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef', 
            '0xf47261b0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
        ]        
        }, '#zeroX');
}

export default instantBuy