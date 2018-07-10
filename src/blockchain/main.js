/**
 * Created by Aseem on 09-07-2018.
 */
import Blockchain from "./blockchain";
import Block from "./block";
import Transaction from "./transaction";

let App = (function () {
    let instance = null;

    return {
        getInstance()
        {
            if (!instance) {
                instance = new BChain();
            }
            return instance;
        }
    };
})();

class BChain {
    constructor() {
        this.block = new Block();
        this.blockChain = new Blockchain();
    }

    getBlockObject() {
        return this.block;
    }

    getBlockChainObject() {
        return this.blockChain;
    }

    getNewBlockObject(index,timeStamp,data,previousHash) {
        return new Block(index,timeStamp,data,previousHash);
    }

    getNewBlockchainObject() {
        return new Blockchain();
    }

    getNewTransactionObject(fromAddress,toAddress,amount) {
        return new Transaction(fromAddress,toAddress,amount);
    }

}

window.App = App;