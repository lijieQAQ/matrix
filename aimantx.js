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
    extra_to: [[0, 0 , [['MAN.2WeBpo7BxfUxVmryJrqLSAKwxMW2U', '0x2c68af0bb140000', '0x'], ['MAN.2izwMiCSYWjTKfazv1qUaoQzDFJPG', '0x2c68af0bb140000', '0x']]]],
};

aiman.man.getTransactionCount('MAN.Xfstsxn5x6TPGHtVJFvbBNbs7r6A', (err, nonce) => {
    rawTx.nonce = aiman.toHex(nonce);
    let tx = new Transaction(rawTx, true);
    console.log(tx.serialize().toString('hex'));
    let privateKey = Buffer.from('246ee75c7e5e22ab8af51dd5c0cd6b8c17e0bab7b69f18d989b01d33bc72450d', 'hex')
    tx.sign(privateKey);
    let serializedTx = tx.serialize();
    let txData = tx.getTxParams(serializedTx);
    console.log(txData);
    aiman.man.sendRawTransaction(txData, (err, data) => {
        console.log(err);
        console.log(data);
    });

});

