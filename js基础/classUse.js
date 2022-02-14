 class Bullshit {
     // 静态方法，只能类调用，实例不能调用
     static welcome_tip(){
         return '我们都属于运城'
     }
     static welcome(){
         console.log(this.welcome_tip()) // 这里的this指向类本身
     }
     constructor(text,likeSthing){
        //  这里的this指向实例
        this.text = text
        this.likeSthing = likeSthing
     }
     show (){
        //  这里的this指向实例
         console.log('我的名字：',this.text)
         console.log('我喜欢：',this.likeSthing)
     }
    //  get和set是一对，所以名字是一样的
     set bark (value){
         this.value = value
     }
     get bark(){
         return `${this.text}是这样说话的${this.value}`
     }

 }
const bullshit = new Bullshit('关当当','red')
bullshit.show()

// 子类啥也不用写，用extends继承父类的属性和方法
class Son_of_Bullshit extends Bullshit {}
const sonOfBullshit = new Son_of_Bullshit('八哥', '肉')
sonOfBullshit.show()

// 子类constructor中使用this前必须调用super
class Son_of_Bullshit2 extends Bullshit{
    constructor(text,likeSthing,age){
        super(text,likeSthing)
        this.age = age
    }
    show () { // 会覆盖父类方法
        console.log('我的名字：',this.text)
        console.log('我喜欢：',this.likeSthing)
        console.log('我的年龄：',this.age)
    }
}
const sonOfBullshit2 = new Son_of_Bullshit2('小七','宅家','3')
sonOfBullshit2.show()
// 使用set,get使同一个属性既可以被赋值，又可以输出定制内容
sonOfBullshit2.bark = "旺旺" // 虽然在类里面set的bark是个方法，但是在使用的时候是作为属性来使用的
console.log(sonOfBullshit2.bark ) // 使用get来获取bark属性，注意bark虽然在类中是方法，但是使用的时候是按照属性的方式来使用的
Bullshit.welcome() // 类本身调用静态方法


