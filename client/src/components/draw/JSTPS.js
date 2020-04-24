export default class JSTPS {
    constructor() {
        this.transactions = [];
        this.mostRecentTransaction = -1;
        this.performingDo = false;
        this.performingUndo = false;
    }

    isPerformingDo = () => {
        return this.performingDo;
    }

    isPerformingUndo = () => {
        return this.performingUndo;
    }

    addTransaction = (transaction) => {
        if ((this.mostRecentTransaction < 0) || (this.mostRecentTransaction < (this.transactions.length - 1))) {
            for (let i = this.transactions.length - 1; i > this.mostRecentTransaction; i--) {
                this.transactions.splice(i, 1);
            }

        }
        this.transactions.push(transaction);
        this.doTransaction();
    }

    doTransaction = () => {
        if (this.hasTransactionToRedo()) {
            this.performingDo = true;
            let transaction = this.transactions[this.mostRecentTransaction + 1];
            transaction.doTransaction();
            this.mostRecentTransaction++;
            this.performingDo = false;
        }
    }

    peekDo = () => {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction + 1];
        }
        return null;
    }

    undoTransaction = () => {
        if (this.hasTransactionToUndo()) {
            this.performingUndo = true;
            let transaction = this.transactions[this.mostRecentTransaction];
            transaction.undoTransaction();
            this.mostRecentTransaction--;
            this.performingUndo = false;
        }
    }

    peekUndo = () => {
        if (this.hasTransactionToUndo()) {
            return this.transactions[this.mostRecentTransaction];
        }
        return null;
    }



    clearAllTransactions = () => {
        this.transactions = [];
        this.mostRecentTransaction = -1;
    }

    getSize = () => {
        return this.transactions.length;
    }

    getRedoSize = () => {
        return this.getSize() - this.mostRecentTransaction - 1;
    }

    getUndoSize = () => {
        return this.mostRecentTransaction + 1;
    }

    hasTransactionToUndo = () => {
        return this.mostRecentTransaction >= 0;
    }

    hasTransactionToRedo = () => {
        return this.mostRecentTransaction < (this.transactions.length - 1);
    }

    toString = () => {
        let text = "--Number of Transactions: " + this.transactions.length + "\n";
        text += "--Current Index on Stack: " + this.mostRecentTransaction + "\n";
        text += "--Current Transaction Stack:\n";
        for (let i = 0; i <= this.mostRecentTransaction; i++) {
            let jT = this.transactions[i];
            text += "----" + jT.toString() + '\n';
        }

        return text;
    }
}