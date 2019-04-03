import * as CryptoJS from 'crypto-js';
class Block {
    public index : number;
    public hash : string;
    public previosHash : string;
    public data : string;
    public timestamp : number;

    //method 의 경우 Class 안에서 생성해야 이용이 가능 
    //외부에서 block을 선언 후 이용이 가능 
    //static 으로 선언해야 외부에서 block에 대한 선언 없이 이용가능
    static calculateBlockHash = (
        //아래의 정보를 바탕으로 새로운 Hash값을 생성 
        index : number,
        previosHash : string,
        timestamp : number,
        data : string
     ):string => CryptoJS.SHA256(index + previosHash + timestamp + data).toString();


    //Class Block을 만들기위해 필요한 정보 및 반환 정보 
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

//Block을 이용하는 기본 모습
const genesisBlock:Block = new Block(0, "202020202020", "", "Hello", 123456);
let blockchain:Block[] = [genesisBlock];
//blockchain 은 Block의 형식을 가지지 않으면 push 가 되지 않는다

const getBlockchain = ():Block[] => blockchain;
//Block[]을 반환하는 함수 생성
const getLatestBlock = ():Block => blockchain[blockchain.length -1];
//getBlockchain을 바탕으로 정보를 받아오는 함수를 생성 

const getNewTimeStamp = ():number => Math.round(new Date().getTime() / 1000);

//정보를 바탕으로 Block 을 생성하는 함수 
const createNewBlock = (data:string):Block => {
    //string 형식의 data를 바탕으로 Block Class의 형식으로 반환 

    const previosBlock:Block = getLatestBlock();
    const newIndex:number = previosBlock.index + 1;
    const newTimeStamp:number = getNewTimeStamp();

    const newHash:string = Block.calculateBlockHash(
        //바뀐 정보를 통해 새로운 Hash를 만드는 함수 생성 
        //Class Block에 지정한 static method 연결 
        newIndex,
        previosBlock.hash,
        newTimeStamp,
        data 
    );

    //입력받은 data + 내부적으로 만든 값들을 통해 새로운 Block을 생성 & return 
    const newBlock:Block = new Block(
        //함수로 넘기는 정보의 순서 잘 파악할 것
        newIndex,
        newHash,
        previosBlock.hash,
        data,
        newTimeStamp
    );
    return newBlock
};

console.log(createNewBlock('HyunJae'), createNewBlock('JiYoung'));

export {};