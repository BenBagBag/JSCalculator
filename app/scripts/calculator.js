//build a calculator object
var calcModel = {
  //number mapping
  decimal: '.',
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  zero: 0,
  //for current screen value
  screenDisplay: '',
  //last value stored
  lastValue: '',
  //operand that you're supposed to use next
  currentOperand: '',
  //shows whether or not you've clicked an operand before
  previousOperand: false,
  //reset value tells you if you need to bump screenDisplay to lastValue before processing button input
  reset: false,
  screen: document.getElementById('screen'),
  buttonWatch: function() {
    document.body.onclick = function(e) {
      if (window.event) {
          e = event.srcElement;
      }
      else {
          e = e.target;
      }

      if (e.className && e.className.indexOf('button') != -1) {
          console.log(e.id);
          if (e.className.indexOf('num') != -1 && calcModel.reset == false) {
            calcModel.typeNum(e.id);
          }

          else if (e.className.indexOf('num') != -1 && calcModel.reset == true) {
            calcModel.lastValue = calcModel.screenDisplay;
            calcModel.screenDisplay = '';
            calcModel.screen.innerHTML = '';
            calcModel.typeNum(e.id);
            calcModel.reset = false;
          }

          else {
            console.log(e.id);
            calcModel.processOperand(e.id);
          }
        }
      }
    },
  typeNum: function(numId) {
    this.screenDisplay += this[numId];
    this.screen.innerHTML = this.screenDisplay;
  },
  //process operand
  processOperand: function(operand) {
    if (operand == 'acOperand' || operand == 'ceOperand' || operand == 'equalsOperand') {
      this[operand]();
      this.currentOperand = '';
    }
    //if currentOperand is ''
    else if (this.currentOperand == '') {
      //update currentOperand
      this.currentOperand = operand;
    }
    //if there is a currentOperand
    //and the last thing typed in was also an operand, ignore this operand
    else if (this.lastValue == '') {
      return;
    }
    else {
      //functions the same as equalsOperand but then updates the currentOperand
      this.equalsOperand();
      this.currentOperand = operand;
    }
    this.reset = true;
  },
  //ac operand, clears currentOperand, screenDisplay, and lastValue
  acOperand: function() {
    this.lastValue = '';
    this.screenDisplay = '';
    this.screen.innerHTML = '';
    this.currentOperand = '';
    this.reset = false;
  },
  //ce operand, clears screenDisplay
  ceOperand: function() {
    this.screen.innerHTML = '';
    this.reset = false;
  },
  //percent operand
  //should convert screenDisplay to a percent (7% => 0.07)
  percentOperand: function () {
    var newValue = Number(this.screenDisplay) / 100;
    return newValue;
  },
  //divide operand
  divideOperand: function() {
    var newValue = Number(this.lastValue) / Number(this.screenDisplay);
    return newValue;
  },
  //multiply operand
  multiplyOperand: function() {
    var newValue = Number(this.lastValue) * Number(this.screenDisplay);
    return newValue;
  },
  //subtract operand
  subtractOperand: function() {
    var newValue = Number(this.lastValue) - Number(this.screenDisplay);
    return newValue;
  },
  //equals operand
  //implements currentOperand
  equalsOperand: function() {
      var operand = this.currentOperand;
      var result = this[operand]();
      this.screenDisplay = result;
      this.screen.innerHTML = result;
      this.currentOperand = '';
      this.lastValue = '';
      this.reset = true;
  },
  //add operand
  addOperand: function() {
    var newValue = Number(this.lastValue) + Number(this.screenDisplay);
    return newValue;
  }
}

window.onload = calcModel.buttonWatch;
