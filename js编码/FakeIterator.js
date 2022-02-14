function createIterator(items) {
    var i = 0;
    return { // 返回一个迭代器对象
        next: function() { // 迭代器对象一定有个next()方法
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            
            return { // next()方法返回结果对象
                value: value,
                done: done
            };
        }
    };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next());  // "{ value: 1, done: false}"
console.log(iterator.next());  // "{ value: 2, done: false}"
console.log(iterator.next());  // "{ value: 3, done: false}"
console.log(iterator.next());  // "{ value: undefiend, done: true}"