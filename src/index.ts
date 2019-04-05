import * as CryptoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    //method 의 경우 Class 안에서 생성해야 이용이 가능 
    //외부에서 block을 선언 후 이용이 가능 
    //static 으로 선언해야 외부에서 block에 대한 선언 없이 이용가능
    static calculateBlockHash = (
        //아래의 정보를 바탕으로 새로운 Hash값을 생성 
        index : number,
        previousHash: string,
        timestamp : number,
        data : string
     ):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static validateStructure = (aBlock : Block ):boolean => 
        //Block에 대한 기본 구조에 문제가 없는지 판단 
        typeof aBlock.index === 'number' && 
        typeof aBlock.hash === 'string'&& 
        typeof aBlock.previousHash === 'string'&& 
        typeof aBlock.timestamp === 'number'&& 
        typeof aBlock.data === 'string';


    //Class Block을 만들기위해 필요한 정보 및 반환 정보 
    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
      ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
      }
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////
// let blockchain:Block[] = [JinYoung];
// blockchain 은 Block의 형식을 가지지 않으면 push 가 되지 않는다
///////////////////////////////////////////////////////////////////////////////////////////////////////


//Block을 이용하는 기본 모습 - 1번으로 생성될 Block  
const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);
let blockchain: Block[] = [genesisBlock];


const getBlockchain = (): Block[] => blockchain;
//Block[]을 반환하는 blockchain 함수 생성

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
//getBlockchain을 바탕으로 정보를 받아오는 함수를 생성 

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const getHashforBlock = (aBlock: Block): string =>
    //임의의 Block , aBlock을 통해 calculateBlockHash함수를 이용
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
  );

//Block이 유효한 것인지 검증
const isBlockValid = (candidateBlock:Block , previousBlock:Block):boolean => {
    //현재 Block 과 이전의 Block을 비교
    if(!Block.validateStructure(candidateBlock)){
        //기본 Block 구조는 지키고 있는지 
        return false; 
    } else if(previousBlock.index + 1 !== candidateBlock.index ){
        //이전 Block의 index의 수는 1이 증가했는지
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash){
        //이전 Block의 hash값 vs 현재 블록의 이전 hash값이 같은지 
        return false;
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        //저장된 candidateBlock.hash vs 다시한번 더 도출한 Hash와 같은지를 확인
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock:Block):void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        //이전 Block과의 비교 , 현재 Block의 유효성을 검사하고 
        blockchain.push(candidateBlock);
        //생성된 Block을 Blockchain 에 저장 
    }
};

//정보를 바탕으로 Block 을 생성하는 함수 
const createNewBlock = (data:string):Block => {
    //string 형식의 data를 바탕으로 Block Class의 형식으로 반환 

    const previousBlock:Block = getLatestBlock();
    const newIndex:number = previousBlock.index + 1;
    const newTimeStamp:number = getNewTimeStamp();

    const newHash:string = Block.calculateBlockHash(
        //바뀐 정보를 통해 새로운 Hash를 만드는 함수 생성 
        //Class Block에 지정한 static method 연결 
        newIndex,
        previousBlock.hash,
        newTimeStamp,
        data 
    );

    //입력받은 data + 내부적으로 만든 값들을 통해 새로운 Block을 생성 & return 
    const newBlock:Block = new Block(
        //함수로 넘기는 정보의 순서 잘 파악할 것
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimeStamp
    );
    addBlock(newBlock);
    
    return newBlock;
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);


export {};