const ledgerMatrix = require('ledger-matrix');
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid');
const ethWallet = require("@ledgerhq/hw-app-eth");
const Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/473f108e531843db9529fd549e61ad6e"));

let Eth = ethWallet.default;
let MatrixAIApp = ledgerMatrix.default;

var Tx = require('ethereumjs-tx');
var privateKey = new Buffer('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

var rawTx = {
    nonce: '0x00',
    gasPrice: '0x3b9aca00',
    gasLimit: web3.utils.toHex(21000),
    to: '0x698022a4b9245f58b8da4161ab6c7a4226dc9d11',
    value: '0x00',
    data: '',
    chainId: 4,
    v: '0x04',
    r: '0x00',
    s: '0x00'
}

TransportNodeHid.default.isSupported().then(isSupported => {
    if (isSupported) {
        TransportNodeHid.default.list().then(list => {
            if (list.length > 0) {
                TransportNodeHid.default.create().then(transport => {
                    transport.setDebugMode(true);
                    const eth = new Eth(transport);
                    eth.getAddress("m/44'/60'/0'/0/0").then(addr => {
                        web3.eth.getTransactionCount(addr.address).then(nonce => {
                            rawTx.nonce = web3.utils.toHex(nonce);
                            var tx = new Tx(rawTx);

                            eth.signTransaction("m/44'/60'/0'/0/0", tx.serialize().toString('hex')).then(result => {
                                tx.v = '0x' + result.v;
                                tx.r = '0x' + result.r;
                                tx.s = '0x' + result.s;
                                console.log(tx.serialize().toString('hex'));
                                web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex')).on('transactionHash', (data) => {
                                    console.log(data);
                                });
                            });
                        });
                    });
                });
            }
        })

    }
});

