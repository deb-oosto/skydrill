const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

class CalculatorServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initMiddleware();
        this.initRoutes();
    }

    initMiddleware() {
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('src/client'));
    }

    initRoutes() {
        this.app.post('/calculate', this.handleCalculation);
    }

    handleCalculation(req, res) {
        const { expression } = req.body;
        try {
            const result = eval(expression);
            res.json({ result });
        } catch (error) {
            res.status(400).json({ error: 'Invalid calculation' });
        }
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

module.exports = new CalculatorServer();
