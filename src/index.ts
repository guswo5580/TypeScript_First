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

export {};