var brain = require('brain');
var NeuralNetwork = brain.NeuralNetwork;
var n = new NeuralNetwork();
var trainingData = [{
	input: {
		date_: .0001
	},
	output: {
		buy: .1,
		sell: .1
	}
},{
	input: {
		date_: .0002
	},
	output: {
		buy: .1,
		sell: .1
	}
},{
	input: {
		date_: .0003
	},
	output: {
		buy: .1,
		sell: .1
	}
},{
	input: {
		date_: .0004
	},
	output: {
		buy: .1,
		sell: .1
	}
},{
	input: {
		date_: .1
	},
	output: {
		buy: .1,
		sell: .1
	}
},{
	input: {
		date_: .0006
	},
	output: {
		buy: .1,
		sell: .1
	}
}];
var sample = {
	intput: {
		date_: .0100
	}
};
n.train(trainingData);
console.log(n.run(sample))
