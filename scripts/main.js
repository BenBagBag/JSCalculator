"use strict";console.log("'Allo 'Allo!");var calcModel={decimal:".",one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9,zero:0,screenDisplay:"",lastValue:"",currentOperand:"",previousOperand:!1,reset:!1,screen:document.getElementById("screen"),buttonWatch:function(){document.body.onclick=function(e){e=window.event?event.srcElement:e.target,e.className&&e.className.indexOf("button")!==-1&&(console.log(e.id),e.className.indexOf("num")!==-1&&calcModel.reset===!1?calcModel.typeNum(e.id):e.className.indexOf("num")!==-1&&calcModel.reset===!0?(calcModel.lastValue=calcModel.screenDisplay,calcModel.screenDisplay="",calcModel.screen.innerHTML="",calcModel.typeNum(e.id),calcModel.reset=!1):(console.log(e.id),calcModel.processOperand(e.id)))}},typeNum:function(e){this.screenDisplay+=this[e],this.screen.innerHTML=this.screenDisplay},processOperand:function(e){if("acOperand"===e||"ceOperand"===e||"equalsOperand"===e)this[e](),this.currentOperand="";else if(""===this.currentOperand)this.currentOperand=e;else{if(""===this.lastValue)return;this.equalsOperand(),this.currentOperand=e}this.reset=!0},acOperand:function(){this.lastValue="",this.screenDisplay="",this.screen.innerHTML="",this.currentOperand="",this.reset=!1},ceOperand:function(){this.screen.innerHTML="",this.reset=!1},percentOperand:function(){var e=Number(this.screenDisplay)/100;return e},divideOperand:function(){var e=Number(this.lastValue)/Number(this.screenDisplay);return e},multiplyOperand:function(){var e=Number(this.lastValue)*Number(this.screenDisplay);return e},subtractOperand:function(){var e=Number(this.lastValue)-Number(this.screenDisplay);return e},equalsOperand:function(){var e=this.currentOperand,n=this[e]();this.screenDisplay=n,this.screen.innerHTML=n,this.currentOperand="",this.lastValue="",this.reset=!0},addOperand:function(){var e=Number(this.lastValue)+Number(this.screenDisplay);return e}};window.onload=calcModel.buttonWatch;