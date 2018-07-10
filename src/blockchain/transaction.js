/**
 * Created by Aseem on 10-07-2018.
 */

class Transaction {

    constructor(fromAddress,toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

export default Transaction;