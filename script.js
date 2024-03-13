// We need to obtain 3 elements
// 1st element, first number
// 2nd element, operation's sign
// 3rd element, second number

//steps
// 1- Iterate in a temporal variable to obtain the first number with all its digits and float points. The last step, save this number in a list.
// 2- Obtain the sign of the desired operation and add it to the list
// 3- Iterate in a temporal variable to obtain the second number with all its digits and float points. The last step, save this number in a list.
// 4- Run the program to compute the operation by clicking on the button "equal"

console.log("ejercicio.js");

document.addEventListener('keydown', handleKeyPress);
//https://www.toptal.com/developers/keycode

const divComp = document.getElementById("computations");
const divResult = document.getElementById("result");
const input1 = document.getElementById("input1");

let list = []; // to save the 2 numbers and the operation
var tempNum = ''; // Temporal variable to save a number before saving in the list
var timesSign = 0;// flag avoid double add a sign
var N1 = ''; //first number
var N2 = ''; //second number
var res = ''; // result to print in div 'result'
var show = ''; // string to adding and print in the div 'Computation'
var flagOpe = 0; // flag to initiate new operation (2nd lap)
const listSign = ['+','-','*','/'];

function handleKeyPress(event) {
    // Check if the pressed key is the 'Enter' key (key code 13)
    console.log(event.keyCode);
    if (event.keyCode === 96 || event.keyCode === 48) {
        identifyBtn(0);
    }
    if (event.keyCode === 97 || event.keyCode === 49) {
        identifyBtn(1);
    }
    if (event.keyCode === 98 || event.keyCode === 50) {
        identifyBtn(2);
    }
    if (event.keyCode === 99 || event.keyCode === 51) {
        identifyBtn(3);
    }
    if (event.keyCode === 100 || event.keyCode === 52) {
        identifyBtn(4);
    }
    if (event.keyCode === 101 || event.keyCode === 53) {
        identifyBtn(5);
    }
    if (event.keyCode === 102 || event.keyCode === 54) {
        identifyBtn(6);
    }
    if (event.keyCode === 103 || event.keyCode === 55) {
        identifyBtn(7);
    }
    if (event.keyCode === 104 || event.keyCode === 56) {
        identifyBtn(8);
    }
    if (event.keyCode === 105 || event.keyCode === 57) {
        identifyBtn(9);
    }
    if (event.keyCode === 190 || event.keyCode === 110) {
        identifyBtn('.');
    }
    if (event.keyCode === 27) {
        acBtn();
    }
    if (event.keyCode === 8) {
        delBtn();
    }
    if (event.keyCode === 107) {
        identifyBtn('+');
    }
    if (event.keyCode === 109) {
        identifyBtn('-');
    }
    if (event.keyCode === 106) {
        identifyBtn('*');
    }
    if (event.keyCode === 111) {
        identifyBtn('/');
    }
    if (event.keyCode === 13) {
        identifyBtn('=');
    }
}

function identifyBtn(val) {
    if(flagOpe === 1)
    {
        newOpe(val);
    }
    if ((typeof val === 'number' || val === '.') && 
    (list.length === 0 || list.length === 2))
    {
        saveNum(val);//save numbers to tempNum
    }
    else {
        if (val != '=')//saving/changing the sign
        {
            saveSign(val);
        }
        else if (val === '=' && list.length === 2) 
        {
            list.push(tempNum);//save 
            tempNum = '';//SET VARIABLE = ''
            if (list.length === 3 && 
                (typeof Number(list.slice(-1))) === 'number') 
                {
                res = performCalc(list);
                console.log(show + " = " + res);
                divComp.innerText = show;
                divResult.innerText = "= " + res;
                flagOpe = 1;
                timesSign = 0;
                tempNum = '';
                res = '';
                } 
            else if (list.slice(-1) === '')
            {
                list.pop();//delete the last element of list
            }
        }
    }
}

function saveNum(val) {
    valString = val.toString();
    show += valString;
    divComp.innerText = show;//1st and 2nd values
    tempNum += valString;
    console.log(tempNum);
}

function saveSign(val) {
    if (list.length === 0 && flagOpe == 0)//first operation saving 1st number  to tempNum and sign to list
    {
        list.push(tempNum);
        show += ' ' + val + ' ';//saving sign in show
        divComp.innerText = show;//showing sign in div
        tempNum = '';
        console.log(list);
        list.push(val);//saving sign in list
        console.log(list);
    }
    else if (list.length === 1)//second operation, taking the previous result to perform a new operation
    {
        show += ' ' + val + ' ';//saving sign in show
        divComp.innerText = show;//showing sign in div
        tempNum = '';
        console.log(list);
        list.push(val);//saving sign in list
        console.log(list);
    }
    else if (list.length === 2 && tempNum == '')//changing sign. Deleting the previous sign and saving the new one
    {
        list.pop();//deleting the sign in list
        show = show.slice(0, -3)// deleting the sign and the two spaces in show
        show += ' ' + val + ' ';//saving new sign in show
        divComp.innerText = show;//updating div
        tempNum = '';
        console.log(list);
        list.push(val);//saving new sign in list
        console.log(list);
    }
    else if (list.length === 2 && tempNum != '')//to perform cal if given N1, SIGN, N2 there is 4th input of another sign instead '='
    {
        list.push(tempNum);//saving the 3rd number
        tempNum = '';// set variable ''
        if (list.length === 3 && 
            (typeof Number(list.slice(-1))) === 'number') 
            {
            res = performCalc(list);
            show = res +' '+ val +' ';//saving result + new sign
            divComp.innerText = show;//updating div computation
            divResult.innerText = "= " + res;//updating div result
            flagOpe = 0;//to don't wipe the old variables
            timesSign = 1;// because there is a new sign
            list.push(res.toString());//saving result in list to perform new calc
            list.push(val);
            }
    }
}

function performCalc(L) {
    N1 = '';
    N2 = '';
    sign = '';
    for (const element of L) {
        if (N1 == '' && typeof Number(element)) {
            N1 = element;
        } else {
            if (element != '+' && element != '-'
                && element != '*' && element != '/') {
                N2 = element;
                console.log(L)//list
                N2 = computation(N1, N2, sign);
                list = [];
            }
            else {
                var sign = element;
            }
        };
    }
    return N2
}

function computation(N1, N2, sign) {
    N1 = Number(N1);
    N2 = Number(N2);
    switch (sign) {
        case '+':
            return N1 + N2;
        case '-':
            return N1 - N2;
        case '*':
            return N1 * N2;
        case '/':
            return N1 / N2;
    }
}

function newOpe(val)
{
    if (typeof val === 'number')//restart all values. New computation
    {
        flagOpe = 0;
        show = '';
        console.log("SHOW", show);
        divComp.innerText = show;
    }
    else //save previous result 'N2' to do a new computation
    {
        flagOpe = 0;
        list.push(N2.toString());//saving previous calc in list
        //tempNum = N2;
        show = '';
        show += N2;//saving previous calc in div
        show += tempNum;//showing previous calc in div
        divComp.innerText = show;
    }
}

function acBtn() {
    //window.location.reload();
    list = [];
    tempNum = '';
    timesSign = 0;
    N1 = '';
    N2 = '';
    res = '';
    show = '';
    flagOpe = 0;
    divComp.innerText = '';
    divResult.innerText = '';
}

function percBtn(val) {
    console.log("list length:", list.length)
    if (val === '%' && list.length === 2 && list[1] === '*') 
    {
        list.push(tempNum);//save 
        tempNum = "";//SET VARIABLE = ''
        console.log(list);
        res = performCalc(list);
        res = res / 100;
        console.log(show + "% = " + res);
        divComp.innerText = show + "%";
        divResult.innerText = " = " + res;
        flagOpe = 1;
        timesSign = 0;
    }
}

function delBtn()
{
    if (list.length === 1 && tempNum == '')//list have 1 value, 1st number, deleting part or all this value
    {
        tempNum = list[0];// saving 1st element in tempNum
        list = [];
        tempNum = tempNum.slice(0, -1);//deleting last elemt of tempNum
        show = show.slice(0, -1);// deleting the last show element
        divComp.innerText = show;//updating the div
        //console.log("delete1-tempnum",tempNum);
    }
    else if (list.length === 2 && tempNum == '')//list have 2 values, 1st number and sign. Deleting the sign
    {
        list.pop();//deleting the sign
        show = show.slice(0, -3);// deleting the sign and the two spaces from show
        divComp.innerText = show;//updating the div
        //console.log("delete2-tempnum",tempNum);
        //console.log("list2", list, list.length);
    }
    else //tempNum contains the value to delete
    {
        tempNum = tempNum.slice(0, -1);//deleting last element of tempNum
        show = show.slice(0, -1);// deleting the last show element
        divComp.innerText = show;//updating the div
        //console.log("delete3-tempnum",tempNum);
    }
}

function squareBtn(){
    //number was already saved in tempNum and show
    if (tempNum != '' && list.length === 0){//1st operation apply to a number save in tempNum
        res = tempNum * tempNum;
        divComp.innerText = show + '^2';
        divResult.innerText = "= " + res;
        N2 = res;
        tempNum = '';
        flagOpe = 1;// in case of using the result
    }
    else if (list.length === 1){//1st operation apply to a 1st number save in list, because delete a sign before it.
        let n = Number(list[0])
        res = n*n;
        divComp.innerText = show + '^2';
        divResult.innerText = "= " + res;
        N2 = res;
        tempNum = '';
        flagOpe = 1;// in case of using the result
        list = []; //reset list
    }
    else if (flagOpe === 1){//apply to a previous result 'N2'
        let n = Number(N2);
        res = n*n;
        divComp.innerText = N2 + '^2';
        divResult.innerText = "= " + res;
        N2 = res;
        tempNum = '';
        flagOpe = 1;// in case of using the result
    }
}

function sqrtRootBtn(){
    //number was already saved in tempNum and show
    if (tempNum != '' && list.length === 0){//1st operation apply to a number save in tempNum
        if (tempNum >= 0){
            res = Math.sqrt(tempNum).toFixed(5);
            divComp.innerText = "sqrt(" + show + ")";
            divResult.innerText = "= " + res;
            N2 = res;
            tempNum = '';
            flagOpe = 1;// in case of using the result
        }
        else{
            divComp.innerText = "sqrt(" + show + ")";
            divResult.innerText = "ERROR";
            N2 = '';
            tempNum = '';
        }
    }
    else if (list.length === 1){//1st operation apply to a 1st number save in list, because delete a sign before it.
        if (Number(list[0]) >= 0){
            console.log(list);
            let n = Number(list[0])
            res = Math.sqrt(n).toFixed(5);
            divComp.innerText = "sqrt(" + show + ")";
            divResult.innerText = "= " + res;
            N2 = res;
            tempNum = '';
            flagOpe = 1;// in case of using the result
            list = []; //reset list
        }
        else{
            divComp.innerText = "sqrt(" + show + ")";
            divResult.innerText = "ERROR";
            N2 = '';
            tempNum = '';
        }
    }
    else if (flagOpe === 1){//apply to a previous result 'N2'
        if (Number(N2) >= 0){
            console.log(list);
            let n = Number(N2)
            res = Math.sqrt(n).toFixed(5);
            divComp.innerText = "sqrt(" + N2 + ")";
            divResult.innerText = "= " + res;
            N2 = res;
            tempNum = '';
            flagOpe = 1;// in case of using the result
        }
        else{
            divComp.innerText = "sqrt(" + N2 + ")";
            divResult.innerText = "ERROR";
            N2 = '';
            tempNum = '';
        }
        }
}

function exponentialBtn(){
    //number was already saved in tempNum and show
    if (tempNum != '' && list.length === 0){//1st operation apply to a number save in tempNum
        res = Math.exp(tempNum).toFixed(5);
        divComp.innerText = 'e^' + show;
        divResult.innerText = "= " + res;
        N2 = res;
        tempNum = '';
        flagOpe = 1;// in case of using the result
    }
    else if (list.length === 1){//1st operation apply to a 1st number save in list, because delete a sign before it.
        let n = Number(list[0])
        res = Math.exp(n).toFixed(5);
        divComp.innerText = 'e^' + show;
        divResult.innerText = "= " + res;
        N2 = res;
        tempNum = '';
        flagOpe = 1;// in case of using the result
        list = []; //reset list
    }
    else if (flagOpe === 1){//apply to a previous result 'N2'
        let n = Number(N2);
        res = Math.exp(n).toFixed(5);
        divComp.innerText =  'e^' + N2;
        divResult.innerText = "= " + res;
        N2 = res;
        tempNum = '';
        flagOpe = 1;// in case of using the result
    }
}

function lnBtn(){
    //number was already saved in tempNum and show
    if (tempNum != '' && list.length === 0){//1st operation apply to a number save in tempNum
        if (tempNum > 0){
            res = Math.log(tempNum).toFixed(5);
            divComp.innerText = "ln(" + show + ")";
            divResult.innerText = "= " + res;
            N2 = res;
            tempNum = '';
            flagOpe = 1;// in case of using the result
        }
        else{
            divComp.innerText = "sqrt(" + show + ")";
            divResult.innerText = "ERROR";
            N2 = '';
            tempNum = '';
        }
    }
    else if (list.length === 1){//1st operation apply to a 1st number save in list, because delete a sign before it.
        if (Number(list[0]) > 0){
            console.log(list);
            let n = Number(list[0])
            res = Math.log(n).toFixed(5);
            divComp.innerText = "ln(" + show + ")";
            divResult.innerText = "= " + res;
            N2 = res;
            tempNum = '';
            flagOpe = 1;// in case of using the result
            list = []; //reset list
        }
        else{
            divComp.innerText = "ln(" + show + ")";
            divResult.innerText = "ERROR";
            N2 = '';
            tempNum = '';
        }
    }
    else if (flagOpe === 1){//apply to a previous result 'N2'
        if (Number(N2) > 0){
            console.log(list);
            let n = Number(N2)
            res = Math.log(n).toFixed(5);
            divComp.innerText = "ln(" + N2 + ")";
            divResult.innerText = "= " + res;
            N2 = res;
            tempNum = '';
            flagOpe = 1;// in case of using the result
        }
        else{
            divComp.innerText = "ln(" + N2 + ")";
            divResult.innerText = "ERROR";
            N2 = '';
            tempNum = '';
        }
        }
}

function memBtn()
{
    //to do
}
