const link = document.querySelectorAll('.link')
const tab = document.querySelectorAll('.tab')

//console.log(link);

for(let i = 0; i < link.length; i++){
    
    link[i].addEventListener('click', function(){
        
        for(let ix = 0; ix < link.length; ix++){
           link[ix].classList.remove('active') ;
           tab[ix].classList.remove('active-tab');
        }
        tabs(this, tab[i]);
    })
                                                                                                    
}

function tabs(link, tab){
    link.classList.add('active');
    tab.classList.add('active-tab')
}

/*************************************************** */



const product = {
    plainBurger: {
        name: `Гамбургер простой`,
        price: 10000,
        kcall: 10000,
        amount: 0, 
        get sum(){
            return this.kcall * this. amount;
        },
        get Kcall(){ 
            return this.kcall * this. amount;
        },
    },
    freshBurger: {
        name: `Гамбургеp FRESH`,
        price: 20500,
        kcall: 500,
        amount: 0, 
        get sum(){
            return this.kcall * this. amount;
        },
        get Kcall(){ 
            return this.kcall * this. amount;
        },
    },
    
    freshCombo:{
        name: `Гамбургеp FRESH`,
        price: 31900,
        kcall: 700,
        amount: 0, 
        get sum(){
            return this.kcall * this. amount;
        },
        get Kcall(){ 
            return this.kcall * this. amount;
        },
    }
    
}

const extaraProduct = {
    doubleMayonnaise:{
        name: `Двойной майонез`,
        price: 90,
        kcall: 50,
    },
    lettuce:{
        name: `Салатниы Лист`,
        price: 100,
        kcall: 10,
    },
    cheese:{
        name: `Сыр`,
        price: 200,
        kcall: 30,
    },
}


const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
const addCart = document.querySelector('.addCart');
const receipt =document.querySelector('.receipt');
const receiptWindow = document.querySelector('.receipt__window');
const receiptOut = document.querySelector('.receipt__window-out');
const receiptBtn = document.querySelector('.receipt__window-btn');

for(let i = 0; i < btnPlusOrMinus.length; i++){
    btnPlusOrMinus[i].addEventListener('click', function(){
        pluseOrMinus(this)
    })
}

function pluseOrMinus(element){
    let parentID = element.closest('.main__product').getAttribute('id');
    let out = element.closest('.main__product').querySelector('.main__product-num');
    let price = element.closest('.main__product').querySelector('.main__product-price span');
    let kcall = element.closest('.main__product').querySelector('.main__product-call span');
    console.log(parentID);
    
    if(element.getAttribute('data-symbol') == '+' &&  product[parentID].amount < 10 ){
        product[parentID].amount++;
    }
    else if(element.getAttribute('data-symbol') == '-' &&  product[parentID].amount > 0){
        product[parentID].amount--;
    }
    
    out.innerHTML = product[parentID].amount;
    price.innerHTML = product[parentID].sum;
    kcall.innerHTML = product[parentID].Kcall;
}




/* ///////////////////////////////// */
for(let i = 0; i < checkExtraProduct.length; i++){
    checkExtraProduct[i].addEventListener('click', function(){
        addExtraProduct(this);
    })
}

    
function addExtraProduct(el){
  const parent = el.closest('.main__product');
  const parentId = parent.getAttribute('id');

  product[parentId][el.getAttribute('data-extra')] = el.checked;

  const kcall = parent.querySelector('.main__product-call span');
  const price = parent.querySelector('.main__product-price span');
  const elDataInfo = el.getAttribute('data-extra');

  if(product[parentId][elDataInfo] == true){
      product[parentId].kcall += extaraProduct[elDataInfo].kcall;
      product[parentId].price += extaraProduct[elDataInfo].price;
  }else{
    product[parentId].kcall -= extaraProduct[elDataInfo].kcall;
    product[parentId].price -= extaraProduct[elDataInfo].price;
  }


  kcall.innerHTML = product[parentId].Kcall;
  price.innerHTML = product[parentId].sum;
}

let arrProduct = [];
let toName = '';
let toProce = 0;
let toKcall = 0;
    

addCart.addEventListener('click', function(){

    for(const key in product){
        //console.log(product[key]);
        const prodJS = product[key];

        if(prodJS.amount > 0){
            arrProduct.push(prodJS);

            for(const newKey in prodJS){
                //console.log(prodJS[newKey]);
                if(prodJS[newKey] === true){
                    prodJS.name += '\n' +  extaraProduct[newKey].name;
                }
            }
        }
        prodJS.price = prodJS.sum;
        prodJS.kcall = prodJS.Kcall;

       
    }

    for(let i = 0; i < arrProduct.length; i++){
        const el = arrProduct[i];
        toProce += el.price;
        toKcall += el.kcall;
        toName += '\n' + el.name + '\n';
    }


    receiptOut.innerHTML = `Вы купили: \n  ${toName} \n Калл ${toKcall} \n Цена ${toProce} сумм`;


    receipt.style.display = 'flex';
    setTimeout(function(){
        receipt.style.opacity = '1';
    }, 100)
    setTimeout(function(){
        receiptWindow.style.top = '0';
    }, 200);
})

receiptBtn.addEventListener('click', function(){
    location.reload();
})