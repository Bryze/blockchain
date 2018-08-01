/**
 * Created by Aseem on 09-07-2018.
 */
const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timeStamp, transactions, previousHash = '', hash = null, nonce = 0) {
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = hash ? hash : this.calculateHash();
        this.nonce = nonce;
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timeStamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined - ' + this.hash);
    }

    getNonce() {
        return this.nonce;
    }
}


export default Block;