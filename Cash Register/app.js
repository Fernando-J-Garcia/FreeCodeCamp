//Closed means that the register has no more money
function checkCashRegister(price, cash, cid) {
    let change = cash - price;
    const changeToBeGiven = {'PENNY': 0, 'NICKEL':0,'DIME': 0,'QUARTER': 0,'ONE': 0,'FIVE': 0,'TEN': 0,'TWENTY': 0,'ONE HUNDRED': 0,};
    const result = {
        status: 'OPEN',
        change:[]
    };
    let outOfStockCounter = 0; 
    let changeToBeRemoved = 0;
    console.log(change);
    for(let i = cid.length-1;i > -1; i--){        
        let currency = cid[i];
        console.log(currency[0] + ' ' + currency[1]);

        //Add out of stocks items to object
        if(currency[1] == 0) outOfStockCounter++;

        if(change >= 100  && currency[0] == 'ONE HUNDRED' && currency[1] != 0){
          changeToBeRemoved = Math.min(currency[1], 100 * Math.floor(change/100));
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          cid[i][1] -= changeToBeRemoved//remove from the register
          continue;
        }
        if(change >= 20 && currency[0] == 'TWENTY' && currency[1] != 0){
          changeToBeRemoved = Math.min(currency[1], 20 * Math.floor(change/20));
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          cid[i][1] -= changeToBeRemoved//remove from the register
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          continue;
        }
        console.log(change)
        if(change >= 10 && currency[0] == 'TEN' && currency[1] != 0){
          changeToBeRemoved = Math.min(currency[1],  Math.floor(10 * change/10));
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          cid[i][1] -= changeToBeRemoved//remove from the register
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          continue;
        }
        console.log(change)
        if(change >= 5 && currency[0] == 'FIVE' && currency[1] != 0){
          changeToBeRemoved = Math.min(currency[1], 5 * Math.floor(change/5));
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          cid[i][1] -= changeToBeRemoved//remove from the register
          continue;
        }
        if(change >= 1 && currency[0] == 'ONE' && currency[1] != 0){
          changeToBeRemoved = Math.min(currency[1], 1 * Math.floor(change/1));
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          cid[i][1] -= changeToBeRemoved//remove from the register
          continue;
        }
        if(change >= 0.25  && currency[0] == 'QUARTER' && currency[1] != 0){
           changeToBeRemoved = Math.min(currency[1], Math.round(((0.25 * Math.floor(change/0.25))+Number.EPSILON)*100)/100);
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          cid[i][1] -= changeToBeRemoved//remove from the register
          continue;
        }
        if(change >= 0.10  && currency[0] == 'DIME' && currency[1] != 0){
           changeToBeRemoved = Math.min(currency[1], Math.round(((0.10 * Math.floor(change/0.10))+Number.EPSILON)*100)/100);
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          cid[i][1] -= changeToBeRemoved//remove from the register
          continue;
        }
        if(change >= 0.05  && currency[0] == 'NICKEL' && currency[1] != 0){
           changeToBeRemoved = Math.min(currency[1], Math.round(((0.05 * Math.floor(change/0.05))+Number.EPSILON)*100)/100);
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          cid[i][1] -= changeToBeRemoved//remove from the register
          continue;
        }
        if(change >= 0.01  && currency[0] == 'PENNY' && currency[1] != 0){
          changeToBeRemoved = Math.min(currency[1], Math.round(((0.01 * Math.floor(change/0.01))+Number.EPSILON)*100)/100);
          change = parseFloat(change - changeToBeRemoved).toFixed(2);
          changeToBeGiven[currency[0]] += changeToBeRemoved;
          cid[i][1] -= changeToBeRemoved//remove from the register
          i+=1;//check for out stock for last index
          continue;
        }
    }
    if(change != 0){      
      result.status = 'INSUFFICIENT_FUNDS';
      result.change = [];
      console.log(result)
      return result;
    }
    if(outOfStockCounter == cid.length) result.status = 'CLOSED';

    Object.keys(changeToBeGiven).forEach(key=>{
      if(changeToBeGiven[key] > 0|| result.status == 'CLOSED')  result.change.push([key,changeToBeGiven[key]])
    })
    if(result.status == 'OPEN') result.change.reverse();
    console.log(changeToBeGiven);
    console.log(result)

    return result;
  }
  
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])