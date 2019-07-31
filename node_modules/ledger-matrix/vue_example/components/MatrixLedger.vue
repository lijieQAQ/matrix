<template>
  <div class="matrixLedger">
    <input
      id="webusb"
      v-model="transportChoice"
      type="radio"
      value="WebUSB"
    >
    <label for="webusb">WebUSB</label>
    <input
      id="u2f"
      v-model="transportChoice"
      type="radio"
      value="U2F"
    >
    <label for="u2f">U2F</label>
    <br>
    <!--
            Commands
        -->
    <button @click="getVersion">
      Get Version
    </button>
    <br>
    <button @click="getAddress">
      Get Address
    </button>
    <br>
    <button @click="showAddress">
      Show Address
    </button>
    <br>
    <button @click="signExampleTx1">
      Sign Example1 TX - Small
    </button>
    <br>
    <button @click="signExampleTx2">
      Sign Example2 TX - Large
    </button>
    <br>
    <button @click="signExampleTx3">
      Sign Example3 TX - Complex
    </button>
    <!--
            Commands
        -->
    <ul id="ledger-status">
      <li
        v-for="item in ledgerStatus"
        :key="item.index"
      >
        {{ item.msg }}
      </li>
    </ul>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
// eslint-disable-next-line import/no-extraneous-dependencies
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import MatrixApp from '../../src';

export default {
    name: 'MatrixLedger',
    props: {},
    data() {
        return {
            deviceLog: [],
            transportChoice: 'WebUSB',
        };
    },
    computed: {
        ledgerStatus() {
            return this.deviceLog;
        },
    },
    methods: {
        log(msg) {
            this.deviceLog.push({
                index: this.deviceLog.length,
                msg,
            });
        },
        async getTransport() {
            let transport = null;

            this.log(`Trying to connect via ${this.transportChoice}...`);
            if (this.transportChoice === 'WebUSB') {
                try {
                    transport = await TransportWebUSB.create();
                } catch (e) {
                    this.log(e);
                }
            }

            if (this.transportChoice === 'U2F') {
                try {
                    transport = await TransportU2F.create();
                } catch (e) {
                    this.log(e);
                }
            }

            return transport;
        },
        async getVersion() {
            this.deviceLog = [];

            // Given a transport (U2F/HIF/WebUSB) it is possible instantiate the app
            const transport = await this.getTransport();
            const app = new MatrixApp(transport);

            // now it is possible to access all commands in the app
            const response = await app.getVersion();
            if (response.return_code !== 0x9000) {
                this.log(`Error [${response.return_code}] ${response.error_message}`);
                return;
            }

            this.log('Response received!');
            this.log(
                `App Version ${response.major}.${response.minor}.${response.patch}`,
            );
            this.log(`Device Locked: ${response.device_locked}`);
            this.log(`Test mode: ${response.test_mode}`);
            this.log('Full response:');
            this.log(response);
        },
        async getAddress() {
            this.deviceLog = [];

            // Given a transport (U2F/HIF/WebUSB) it is possible instantiate the app
            const transport = await this.getTransport();
            const app = new MatrixApp(transport);

            // now it is possible to access all commands in the app
            const response = await app.getAddress(0, 0, 0, false);
            if (response.return_code !== 0x9000) {
                this.log(`Error [${response.return_code}] ${response.error_message}`);
                return;
            }

            this.log('Response received!');
            this.log('...');
            this.log(`PubKey ${response.pubKey}`);
            this.log(`Address: ${response.address}`);
            this.log('...');
            this.log('Full response:');
            this.log(response);
        },
        async showAddress() {
            this.deviceLog = [];

            // Given a transport (U2F/HIF/WebUSB) it is possible instantiate the app
            const transport = await this.getTransport();
            const app = new MatrixApp(transport);

            // now it is possible to access all commands in the app
            this.log('Please click in the device');
            const response = await app.getAddress(0, 0, 0, true);
            if (response.return_code !== 0x9000) {
                this.log(`Error [${response.return_code}] ${response.error_message}`);
                return;
            }

            this.log('Response received!');
            this.log('...');
            this.log(`PubKey ${response.pubKey}`);
            this.log(`Address: ${response.address}`);
            this.log('...');
            this.log('Full response:');
            this.log(response);
        },
        async signTx(txBlobStr) {
            this.deviceLog = [];

            // Given a transport (U2F/HIF/WebUSB) it is possible instantiate the app
            const transport = await this.getTransport();
            const app = new MatrixApp(transport);
            const message = Buffer.from(txBlobStr, 'hex');
            const response = await app.sign(0, 0, 0, message);

            this.log('Response received!');
            this.log('...');
            if (response.return_code === 0x9000) {
                this.log(`Signature (DER): ${response.der.toString('hex')}`);
                this.log(`Signature (V) : ${response.v.toString('hex')}`);
                this.log(`Signature (R) : ${response.r.toString('hex')}`);
                this.log(`Signature (S) : ${response.s.toString('hex')}`);
                this.log('...');
            }
            this.log('Full response:');
            this.log(response);
        },
        async signExampleTx1() {
            const txBlobStr = ''
                + 'f8668710000000000045850430e2340083033450a04d414e2e576b62756a7478683759426e6b475638485'
                + 'a767950514b336341507980a0746dd5858305e95c2ad24ac22658786012963590e683258ab1b0b073a131'
                + 'adad038080808086016850894a0fc4c30480c0';
            this.signTx(txBlobStr);
        },
        async signExampleTx2() {
            const txBlobStr = ''
                + 'f901e180850430e2340083033450'
                + 'a04d414e2e576b62756a7478683759426e6b475638485a767950514b3363415079'
                + '83989680'
                + 'b9019d5b7b22456e7472757374416464726573223a224d414e2e32556f7a3867386a61754d61326d746e777872'
                + '7363686a3271504a7245222c224973456e7472757374476173223a747275652c224973456e7472757374536967'
                + '6e223a66616c73652c225374617274486569676874223a313232322c22456e64486569676874223a3132323232'
                + '322c22456e73747275737453657454797065223a302c22757365537461727454696d65223a22222c2275736545'
                + '6e6454696d65223a22222c22456e7472757374436f756e74223a307d2c7b22456e747275737441646472657322'
                + '3a224d414e2e32556f7a3867386a61754d61326d746e7778727363686a3271504a7245222c224973456e747275'
                + '7374476173223a747275652c224973456e74727573745369676e223a66616c73652c2253746172744865696768'
                + '74223a3132323232332c22456e64486569676874223a3132323232392c22456e73747275737453657454797065'
                + '223a302c22757365537461727454696d65223a22222c22757365456e6454696d65223a22222c22456e74727573'
                + '74436f756e74223a307d5d038080808086016850894a0fc4c30580c0';

            this.signTx(txBlobStr);
        },
        async signExampleTx3() {
            const txBlobStr = ''
                + 'f8c28710000000000002850430e2340083033450a14d414e2e32556f7a3867386a61754d61326d746e77787273'
                + '63686a3271504a72458398968080038080808086016850894a0ff87bf8798080f875e6a04d414e2e6a4c544668'
                + '6f434a43474368706964553269433151357a436d56464c8398968080e6a04d414e2e66344657484562576b5838'
                + '73536438796a5a6a5948655a576e6164788398968080e6a04d414e2e675141414855655442787667627a663874'
                + '4667557461764463654a508398968080';

            this.signTx(txBlobStr);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    button {
        padding: 5px;
        font-weight: bold;
        font-size: medium;
    }

    ul {
        padding: 10px;
        text-align: left;
        alignment: left;
        list-style-type: none;
        background: black;
        font-weight: bold;
        color: greenyellow;
    }
</style>
