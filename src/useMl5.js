import ml5 from 'ml5'
import { ref } from 'vue'

let nn
const nnOptions = {
    task: 'classification',
    debug: false,
}
const trainingOptions = {
    epochs: 32,
    batchSize: 12,
}

// initialize & train the neural network

export function init(data) {
    // 1. initialize the neural network
    nn = ml5.neuralNetwork(nnOptions)

    // 2. add data to the neural network
    data.forEach((item) => {
        const inputs = {
            r: item.r,
            g: item.g,
            b: item.b,
        }
        const output = {
            color: item.color,
        }
        nn.addData(inputs, output)
    })

    // 3. normalize the data
    nn.normalizeData()

    // 4. train the neural network
    nn.train(trainingOptions, finishedTraining)
}

// callback for when training finishes
function finishedTraining() {
    console.log('finished training')
}

// make a classification
export function classify(input) {
    nn.classify(input, handleResults)
}

export const colorLabel = ref('')

// handle the results of the classification
function handleResults(error, result) {
    if (error) {
        console.error(error)
        return
    }
    console.log(result)
    colorLabel.value = result[0].label
}
