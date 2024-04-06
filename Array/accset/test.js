class test {
    constructor(name,age,address){
        this.name = name,
        this.age = age,
        this.address = address
    }
}
let fuck = new test('cong',18,'hanoi');
let fuck2 = new test('nguyen', 20,'chuongmy');
console.log(fuck);
function test2([frist,...strings],...value){
    return value.reduce(
        (acc,curr) =>[...acc,`<span>${curr}</span>`,strings.shift()],[frist]
    ).join('');
}
var brand = 'f8';
var course = 'js,java'
var html=test2`123 ${brand} có các khoá học ${course} !!`;
console.log(html);
let a = 5;
let b = 7;
let c = 8;
let d = (((a > b) && (b <c)) || (a < c)) ? (a + b) : (a-b);
console.log(d);
