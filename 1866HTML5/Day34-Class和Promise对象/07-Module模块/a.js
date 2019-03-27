// 输出变量
export var color = "red";
export let name = "Nicholas";
export const magicNumber = 7;

// 输出函数
export function sum(num1, num2) {
    return num1 + num2;
}

// 输出类
export class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
}

// 该函数没有使用export关键字   所以该函数是模块私有的。
//也就是说只能在当前文件访问，出了这个文件就访问不到
function subtract(num1, num2) {
    return num1 - num2;
}

// 定义一个函数...
function multiply(num1, num2) {
    return num1 * num2;
}

// 可以把这个函数的引用导出。  和导出函数是一样的。
export { multiply };
