var Web3 = require('web3');
let web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/473f108e531843db9529fd549e61ad6e"));
// web3.eth.sendSignedTransaction('0xf865808609184e72a00082271094000000000000000000000000000000000000000080802ba0aefd585cf5be2b1a31e7699e2f843d1922e2ee13657c76c45df94af9a4f70416a036d1caca687f239fe31248d6695ae97585eee1a606cfeb4ee06b1efcadf3a66f').then((err, result)=> {
//     console.log(err);
//     console.log(result);
// });

let a = 'f8448710000000000000850430e2340083033450a04d414e2e3578597a4248724a6658654a693979513851713868766d313962553480800380808080845d411051c4c38080c0';
let r = '0x213293d3b039246eeda87079b0ba2e1bf2607f6862015505fa5e757fd09b731c';
let s = '0x3a52fe04f614589e0f0ba4f335b41edd4762c4d07eeacfe1d9cac5ef5bc34ea2';

let a1 = 'f8448710000000000000850430e2340083033450a04d414e2e3578597a4248724a6658654a693979513851713868766d313962553480800380808080845d411051c4c38080c0'
let r1 = '0x213293d3b039246eeda87079b0ba2e1bf2607f6862015505fa5e757fd09b731c'
let s1 = '0x3a52fe04f614589e0f0ba4f335b41edd4762c4d07eeacfe1d9cac5ef5bc34ea2'
console.log(a === a1 );
console.log(r === r1 );
console.log(s === s1 );


{ v: '0x29',
    r:
    '0x9c6c8e700c7b9b74db398c89c704f5771302930a99a10618286fc491bcf5a781',
        s:
    '0x6713c3f059de299e4f1646105c004e58149447281c4e4126ce4b48f2ea0db250',
        data: '0x',
    gasPrice: '0x0430e23400',
    gas: '0x033450',
    value: '0x0',
    nonce: '0x10000000000001',
    currency: 'MAN',
    txType: 0,
    lockHeight: 0,
    isEntrustTx: 0,
    txEnterType: 0,
    commitTime: 1564545105,
    extra_to: [],
    to: 'MAN.5xYzBHrJfXeJi9yQ8Qq8hvm19bU4' }


{ v: '0x29',
    r:
    '0x9c6c8e700c7b9b74db398c89c704f5771302930a99a10618286fc491bcf5a781',
        s:
    '0x6713c3f059de299e4f1646105c004e58149447281c4e4126ce4b48f2ea0db250',
        data: '0x',
    gasPrice: '0x0430e23400',
    gas: '0x033450',
    value: '0x00',
    nonce: '0x10000000000001',
    currency: 'MAN',
    txType: 0,
    lockHeight: 0,
    isEntrustTx: 0,
    txEnterType: 0,
    commitTime: 1564545105,
    extra_to: [] }
