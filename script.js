const btn=document.querySelectorAll('button');
const input=document.querySelector('input');

btn.forEach( button =>{
    button.addEventListener("click",(e)=>{
        updateedisplay(button.innerText)
        console.log(button.innerText)
    })
})

function updateedisplay(value){
    if(value=='CE'){
        input.value="";
    }
    else if(value=='DEL'){
        input.value=input.value.slice(0,-1);
    }
    else if(value=='='){
        input.value=calculate(input.value);
    }
    else{
        input.value+=value;
    }
}
function calculate(expression){
    num=[];
    operator=[];
    str="";
    //tokenize the expression
    for (i=0;i<expression.length;i++){
        if(expression[i]>='0' && expression[i]<='9'){
            str+=expression[i];
        }
        else{
            num.push(str);
            str="";
            operator.push(expression[i]);
        }
        if(i==expression.length-1){
            num.push(str);
            str="";
        }
    }
    // console.log(num);
    // console.log(operator);

    //giving precedence to the operators
    let precedence={};
    precedence['+']=1;
    precedence['-']=1;
    precedence['x']=2;
    precedence['*']=2;
    precedence['/']=2;

    
    while (operator.length>0){
        max_pre=0;
        eval_op="";
        max_index=0;

        for (i=0;i<operator.length;i++){
            if(precedence[operator[i]]>max_pre){
                max_pre=precedence[operator[i]];
                eval_op=operator[i];
                max_index=i;
            }
        }

        num1=parseFloat(num[max_index]);
        num2=parseFloat(num[max_index+1]);
        switch(eval_op){
            case '+':res=num1+num2;break;
            case '-':res=num1-num2;break;
            case 'x':res=num1*num2;break;
            case '*':res=num1*num2;break;
            case '/':res=num1/num2;break
        }
        //console.log(num1,eval_op,num2,res);
        operator.splice(max_index,1);
        num.splice(max_index,2,res);
    }
    console.log(num[0]);
    return num[0];
}

//implement input through keyboard
const allowedKeys=['0','1','2','3','4','5','6','7','8','9','+','-','*','/','(',')','.','Enter','Backspace','Delete','Shift','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
document.addEventListener('keydown',(e)=>{
    if(allowedKeys.includes(e.key)==false){
        alert('Invalid Key Pressed');
        input.value="";
    }
    if(e.key=='Enter'){
        input.value=calculate(input.value);
    }
    if (e.key=='Delete'){
        input.value="";
    }
})

