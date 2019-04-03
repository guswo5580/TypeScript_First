class Block {
    public index : number;
    public hash : string;
    public previosHash : string;
    public data : string;
    public timestamp : number;
    constructor(
        index : number,
        hash : string,
        previosHash : string,
        data : string,
        timestamp : number,
    ){
        this.index = index;
        this.hash = hash;
        this.previosHash = previosHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "202020202020", "", "Hello", 123456);

let blockchain:[Block] = [genesisBlock];
//blockchain 은 Block의 형식을 가지지 않으면 push 가 되지 않는다
console.log(blockchain);
export {};