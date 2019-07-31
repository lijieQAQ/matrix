var manUtil = require('matrixjs-util');

const ledgerMatrix = require('ledger-matrix');
const Transaction = require('matrixjs-tx');
const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid');
const ethWallet = require("@ledgerhq/hw-app-eth");
const Web3 = require('web3');
const Man = require('aiman');
var Tx = require('ethereumjs-tx');

let web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/473f108e531843db9529fd549e61ad6e"));
let aiman = new Man(new Man.providers.HttpProvider('https://testnet.matrix.io'));


let Eth = ethWallet.default;
let MatrixAIApp = ledgerMatrix.default;

var rawTx = {
    nonce: '0x00',
    gasPrice: '0x0430e23400',
    gasLimit: '0x033450',
    to: 'MAN.5xYzBHrJfXeJi9yQ8Qq8hvm19bU4',
    value: '0x00',
    data: '',
    chainId: 3,
    v: '0x3',
    r: '0x00',
    s: '0x00',
    TxEnterType: 0,
    IsEntrustTx: 0,
    CommitTime: 1564109708687,
    extra_to: [[0, 0 , []]],
}

TransportNodeHid.default.isSupported().then(isSupported => {
    if (isSupported) {
        TransportNodeHid.default.list().then(list => {
            if (list.length > 0) {
                TransportNodeHid.default.create().then(transport => {
                    transport.setDebugMode(false);
                    const matrix = new MatrixAIApp(transport);

                    // now it is possible to access all commands in the app
                    // const eth = new Eth(transport);
                    // eth.getAddress("m/44'/60'/0'/0/0").then(addr => {
                    //    console.log('eth', addr);
                    // });
                    matrix.getAddress(0, 0, 0, false).then(addr => {
                        aiman.man.getTransactionCount(addr.address, (err, nonce) => {
                            rawTx.nonce = web3.utils.toHex(nonce);
                            let tx = new Transaction(rawTx).serialize();
                            matrix.sign(0, 0, 0, tx).then(response => {
                                if (response.return_code === 0x9000) {
                                    let v = '0x' + (parseInt(response.v.toString('hex'), 16) + (rawTx.chainId * 2 + 8)).toString(16);
                                    let r = '0x' + response.r.toString('hex');
                                    let s = '0x' + response.s.toString('hex');
                                    let newTxData = {
                                        v: v,
                                        r: r,
                                        s: s,
                                        data: rawTx.data,
                                        gasPrice: rawTx.gasPrice,
                                        gas: rawTx.gasLimit,
                                        value: rawTx.value,
                                        nonce: rawTx.nonce,
                                        currency: 'MAN',
                                        txType: rawTx.extra_to[0][0],
                                        lockHeight: rawTx.extra_to[0][1],
                                        isEntrustTx: rawTx.IsEntrustTx,
                                        txEnterType: rawTx.TxEnterType,
                                        commitTime: rawTx.CommitTime,
                                        extra_to: rawTx.extra_to[0][2]
                                    };
                                    console.log(newTxData);
                                    aiman.man.sendRawTransaction(newTxData).then((err, data) => {
                                        console.log(err);
                                        console.log(data);
                                    });
                                }
                            });
                        });
                    });
                });
            }
        })

    }
});

