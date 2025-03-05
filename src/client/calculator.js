class Calculator {
    constructor(displayElement) {
        this.display = displayElement;
        this.currentExpression = '';
        this.initEventListeners();
    }

    initEventListeners() {
        // Implement button click handlers
        document.querySelectorAll('.calc-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleInput(btn.dataset.value));
        });
    }

    handleInput(value) {
        switch(value) {
            case '=':
                this.calculate();
                break;
            case 'C':
                this.clear();
                break;
            default:
                this.appendToDisplay(value);
        }
    }

    appendToDisplay(value) {
        this.currentExpression += value;
        this.display.value = this.currentExpression;
    }

    calculate() {
        try {
            const result = eval(this.currentExpression);
            this.display.value = result;
            this.currentExpression = result.toString();
        } catch (error) {
            this.display.value = 'Error';
            this.currentExpression = '';
        }
    }

    clear() {
        this.currentExpression = '';
        this.display.value = '';
    }
}
