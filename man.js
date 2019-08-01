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
    data: '0x',
    chainId: 3,
    v: '0x3',
    r: '0x',
    s: '0x',
    TxEnterType: '0x',
    IsEntrustTx: '0x',
    CommitTime: 1564545105,
    extra_to: [[0, 0 , [['MAN.2WeBpo7BxfUxVmryJrqLSAKwxMW2U', '0x2c68af0bb140000', '0x'], ['MAN.2izwMiCSYWjTKfazv1qUaoQzDFJPG', '0x2c68af0bb140000', '0x']]]],
};

TransportNodeHid.default.isSupported().then(isSupported => {
    if (isSupported) {
        TransportNodeHid.default.list().then(list => {
            if (list.length > 0) {
                TransportNodeHid.default.create().then(transport => {
                    transport.setDebugMode(false);
                    const matrix = new MatrixAIApp(transport);
                    matrix.getAddress(0, 0, 0, false).then(addr => {
                        aiman.man.getTransactionCount(addr.address, (err, nonce) => {
                            rawTx.nonce = web3.utils.toHex(nonce);
                            let tx = new Transaction(rawTx).serialize();
                            console.log(tx.toString('hex'));
                            matrix.sign(0, 0, 0, tx).then(response => {
                                if (response.return_code === 0x9000) {
                                    let v = '0x' + (parseInt(response.v.toString('hex'), 16) + (rawTx.chainId * 2 + 8)).toString(16);
                                    let r = '0x' + response.r.toString('hex');
                                    let s = '0x' + response.s.toString('hex');
                                    let newTxData = {
                                        v: v,
                                        r: r,
                                        s: s,
                                        to: rawTx.to,
                                        data: rawTx.data,
                                        gasPrice: rawTx.gasPrice,
                                        gas: rawTx.gasLimit,
                                        value: rawTx.value,
                                        nonce: rawTx.nonce,
                                        currency: 'MAN',
                                        txType: rawTx.extra_to[0][0],
                                        lockHeight: rawTx.extra_to[0][1],
                                        isEntrustTx: 0,
                                        txEnterType: 0,
                                        commitTime: rawTx.CommitTime,
                                        extra_to: rawTx.extra_to[0][2]
                                    };
                                    console.log(newTxData);
                                    aiman.man.sendRawTransaction(newTxData, (err, data) => {
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







