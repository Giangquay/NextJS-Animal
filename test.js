const girl = {
    amount: 10,
    until:'USD'
}
function goShopping(item, quantity, price) {
    const totalCost = price * quantity;
    if (this.amount < totalCost) {
        console.log('Ban khong du tien')
    } else {
        console.log(`Girl went shopping and bought ${quantity} ${item} for ${totalCost} ${this.until}`)
    }
}

// goShopping.call(girl, 'shose', 3, 4);
// goShopping.apply(girl, ['shose', 2, 4]);

const mother = {
    amount: 3000,
    until:'USD'
}

// const boundShopping = goShopping.bind(mother)
// boundShopping('Car', 2, 1000)

goShopping.bind(mother)('Car',2,1000)




const obj = {
    order:null,
    page:1,

}

 const pick = (object={},key)=>{
    return key.reduce((obj,key)=>{
        if(object && Object.prototype.hasOwnProperty.call(object,key))
        {
            obj[key]  = object[key]
        }
        return obj;
    },{})
}



console.log(pick(obj, ['order', 'limit', 'page']))