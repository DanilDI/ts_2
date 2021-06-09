
class Calculator {

    private _currentExpr: string;
    private _result: string;
    private _sign: string;
    private _resultView: HTMLElement;
    private _currentExprView: HTMLElement;
    private _signView: HTMLElement;

    constructor(){
        this._sign = "";
        this._currentExpr = "";
        this._result="";
        let buttons: HTMLCollectionOf<Element> = document.getElementsByClassName("btn-container__btn");
        for(let i = 0; i < buttons.length; ++i){
            buttons[i].addEventListener("click", (e) => this._onButtonClick(e));
        }

        this._resultView = document.getElementsByClassName("calc-app__result")[0] as HTMLElement;
        this._currentExprView = document.getElementsByClassName("calc-app__expr")[0] as HTMLElement;
        this._signView=document.getElementsByClassName("calc-app__sign")[0] as HTMLElement;
    }

    private _onButtonClick(e: Event){
        if(!(e.currentTarget instanceof Element)){
            return;
        }
        
        let p = e.currentTarget.querySelector("p");
        let symb = p?.innerText;
    
        if(symb){
            this._handleSymbol(symb);
        }
    }

    private _handleSymbol(s: string){
        switch(s){
        case "-":
            if(this._currentExpr=="")
                this._addSymbol(s);
            else 
                if(this._currentExpr=="-")
                    break;    
            else
            this._addSign(s);
        break;    
        case "+":
        case "*":
        case "/":
            this._addSign(s);
            break;               
        case "C":
            this._clear();
            break;
        case "=":
            this._calculate();
            break;
        
        case "⭅":
            this._delSymbol();
            break;

        case ".":
            if(this._currentExpr.indexOf(".")==-1)
                this._addSymbol(s);
            break;
        default:
            if(this._currentExpr=="0")
                if (s!="0"){
                    this._delSymbol();
                }
                else break;     
            this._addSymbol(s);
            break;
        }
        
        return;
    }

    private _calculate(){
        let a=Number(this._result) as number;
        let b=Number(this._currentExpr) as number;

        switch(this._sign){
            case "+":
                this._result=String(a+b);
                break;
            case "-":
                this._result=String(a-b);
                break;
            case "/":
                this._result=String(a/b);
                break;
            case "*":
                this._result=String(a*b); 
                break;
            default:
                this._result=String(b);               
        }
        if(this._result.length>15 ){
            if(this._result.indexOf(".")!=-1)
                this._result= (this._result).substring(0, 15)
            else{
                this._currentExpr  = "";
                this._result  = "";
                this._sign = "";
                this._signView.innerText = "";
                this._resultView.innerText = "ERROR!";
                this._currentExprView.innerText = "";
                return; 
            }
            
        }
        if(this._result == "Infinity" || this._result == "NaN"||this._result == "-Infinity" ){
            this._currentExpr  = "";
            this._result  = "";
            this._sign = "";
            this._signView.innerText = "";
            this._resultView.innerText = "ERROR!";
            this._currentExprView.innerText = "";
            return;
        }

        this._currentExpr  = this._result;
        this._result  = "";
        this._sign = "";
        this._resultView.innerText = "";
        this._currentExprView.innerText = this._currentExpr;
        this._signView.innerText = "";
        return;
    }

    private _clear(){
        this._currentExpr  = "";
        this._result  = "";
        this._sign = "";
        this._resultView.innerText = "";
        this._currentExprView.innerText = "";
        this._signView.innerText = "";
    }
    private _delSymbol(){
        this._currentExpr=(this._currentExpr).substring(0, (this._currentExpr).length - 1);
        this._currentExprView.innerText=this._currentExpr;
        

    }
    private _addSymbol(s: string){
        this._currentExpr  += s;
        this._currentExprView.innerText=this._currentExpr;
    }
    private _addSign(s: string){
        this._result=this._currentExpr;
        this._resultView.innerText =this._result;
        this._sign = s;
        this._signView.innerText = this._sign;
        this._currentExpr=""
        this._currentExprView.innerText=this._currentExpr;
    }
}


let app: Calculator = new Calculator();