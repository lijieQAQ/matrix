const manUtil = require('matrixjs-util');
const Transaction = require('matrixjs-tx');
const Man = require('aiman');
let aiman = new Man(new Man.providers.HttpProvider('https://testnet.matrix.io'));

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
    extra_to: [[0, 0 , []]],
};
aiman.man.getTransactionCount('MAN.5xYzBHrJfXeJi9yQ8Qq8hvm19bU4', (err, nonce) => {
    rawTx.nonce = aiman.toHex(nonce);
    let tx = new Transaction(rawTx, true);
    let privateKey = Buffer.from('3ec3678077a79400081e525f516d722bce7d19f80b7288d0992c84c2481c5faa', 'hex')
    tx.sign(privateKey);
    let serializedTx = tx.serialize();
    let txData = tx.getTxParams(serializedTx);
    console.log(txData);
    aiman.man.sendRawTransaction(txData, (err, data) => {
        console.log(err);
        console.log(data);
    });

});

