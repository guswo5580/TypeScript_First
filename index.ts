const name = "HJ",
    age = 26,
    gender = "male";


//parameter 뒤에 ? = parameter에 대한 선택적 사항이라는 표시 
const Say = (name, age, gender?) => {
    console.log(`Hi ${name}, info is ${age} and ${gender}`)
};

Say(name, age, gender);

export {};