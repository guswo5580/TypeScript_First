const name = "HJ",
    age = 26,
    gender = "male";


//parameter 뒤에 ? = parameter에 대한 선택적 사항이라는 표시 
const Say = (name, age, gender?) => {
    console.log(`Hi ${name}, info is ${age} and ${gender}`)
};
Say(name, age, gender);

//기본 2
//parameter:type 을 통해 지정한 타입 외에는 실행할 수 없도록 
//함수:void || string 을 통해 함수의 타입을 결정 가능 
const Say2 = (name:string, age:number, gender:string):string => {
    return `Hi ${name}, info is ${age} and ${gender}`
};
console.log(Say2(name, age, gender));

//기본 3 
//Object를 이용할 때 , interface 속성을 같이 이용해주자 
interface Human {
    name : string;
    age : number;
    gender : string;
}
const person = {
    name : "HJ",
    age : 26,
    gender : "male"
};
//interface에서 설정한 것을 바탕으로 전달하는 object만 변경해도 같아진다 
const Say3 = (person:Human):string => {
    return `Hi ${person.name}, info is ${person.age} and ${person.gender} in interface `
};
console.log(Say3(person));

//기본 4 
//Class 를 이용한 선언
class Human {
    //private은 Human안에서만 사용 가능 
    public name : string;
    public age : number;
    public gender : string;
    constructor(name:string, age:number, gender:string){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
// lynn에 대한 새로운 정의를 미리 만들어둔 class를 통해 간략히 표현 가능 
const lynn = new Human("Lynn", 18, "female");

const Say4 = (person:Human):string => {
    return `Hi ${person.name}, info is ${person.age} and ${person.gender} in interface `
};
console.log(Say4(lynn));

export {};