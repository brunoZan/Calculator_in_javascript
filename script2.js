/**
 * Acoplamento: uma função que depende de outra
 * Manutenivel
 * Nunca usar comentario
 */

(function(win, doc) {
	'use strict';

	let $visor = doc.querySelector('[data-js="imput"]');
	let $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
	let $buttonCE = doc.querySelector('[data-js="button-ce"]');
	let $buttonOperation = doc.querySelectorAll('[ data-js="button-Operation"]');
	let $buttonEqual = doc.querySelector('[data-js="button-Equals"]');

	let operators = ["+", "-", "x", "÷"];
	console.log(...operators);
	

	function initialize() {
		initEvents();
	}

	function initEvents() {
		Array.prototype.forEach.call($buttonsNumbers, (button) => {
		button.addEventListener('click', handleClickNumber, false);
		});
		Array.prototype.forEach.call($buttonOperation, (button) => {
			button.addEventListener('click', handleCLickOperation);
		});
		$buttonEqual.addEventListener('click', handleClickEqual, false);
	 	$buttonCE.addEventListener('click', handleClickCe, false);

	}
	
	function handleClickCe(){
		$visor.value = "";
	}

	function handleClickNumber() {
		$visor.value += this.value;
	}

	function handleCLickOperation() {
		$visor.value = removeLastItemifItIsAnOperation($visor.value);
		$visor.value += this.value;
	}

	function getOperations() {
		return Array.prototype.map.call($buttonOperation, (button) => {
			return button.value;
		});
	}

	function isLastItemAsOperation( number ) {
		let operation = getOperations();
		let lastItem = number.split('').pop();

		return operation.some( ( operator) => {
			return operator === lastItem;
		});
	}

	function handleClickEqual() {
		$visor.value = removeLastItemifItIsAnOperation($visor.value);
		let allValues = $visor.value.match(getRegexOperatios());
		$visor.value = allValues.reduce(calculateAllValues);
	}

	function getRegexOperatios() {
		return new RegExp('\\d+[' + getOperations().join('') + ']?', 'g');
	}
 
	function calculateAllValues (acc, actual) {
		let firstValue = acc.slice(0, -1);
		let operator = acc.split('').pop();
		let lastValue = removeLastItemifItIsAnOperation(actual);
		let lastOperator = getLastOperator(actual);
		return doOperation(operator, firstValue, lastValue) + lastOperator;
	}

	function getLastOperator(value) {
		return isLastItemAsOperation(value) ? value.split('').pop() : "";
	}

	function doOperation(operator, firstValue, lastValue) {
		switch(operator) {
			case "-":
			return (Number(firstValue) - Number(lastValue));
			case "+":
			return (Number(firstValue) + Number(lastValue));
			case "x":
			return (Number(firstValue) * Number(lastValue)); 
			case "÷":
			return (Number(firstValue) / Number(lastValue));
		}
	}
	 //como esse "IF" vai ser usado mais de uma vez, por isso extrai ela do handleClickOperation
		function removeLastItemifItIsAnOperation(string) {
			if(isLastItemAsOperation(string))
				return string.slice(0, -1);
			return string;
		}
		
	initialize()
})(window, document);