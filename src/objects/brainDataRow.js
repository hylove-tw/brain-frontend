import Utils from './utils'

const utils = new Utils()
export default class BrainDataRow {
    constructor(subMode = '', name = '', gender = '', email = '', age = '', setIsSubmitted = false) {
        this.subMode = subMode
        this.name = name
        this.email = email
        this.gender = gender
        this.age = age
        this.hasAfterData = false
        this.fileInput = {
            before: null,
            after: null
        }
        this.attention = {
            name: 'Attention',
            before: [],
            after: [],
            reportData: null
        }
        this.meditation = {
            name: 'Meditation',
            before: [],
            after: [],
            reportData: null
        }
        this.delta = {
            name: 'Delta',
            before: [],
            after: [],
            reportData: null
        }
        this.theta = {
            name: 'Theta',
            before: [],
            after: [],
            reportData: null
        }
        this.lowAlpha = {
            name: 'Low Alpha',
            before: [],
            after: [],
            reportData: null
        }
        this.highAlpha = {
            name: 'High Alpha',
            before: [],
            after: [],
            reportData: null
        }
        this.lowBeta = {
            name: 'Low Beta',
            before: [],
            after: [],
            reportData: null
        }
        this.highBeta = {
            name: 'High Beta',
            before: [],
            after: [],
            reportData: null
        }
        this.lowGamma = {
            name: 'Low Gamma',
            before: [],
            after: [],
            reportData: null
        }
        this.highGamma = {
            name: 'High Gamma',
            before: [],
            after: [],
            reportData: null
        }

    }

    setBeforeData(parsedData, fileInput = '') {
        this.fileInput.before = fileInput
        this.attention.before = parsedData.attention.value
        this.meditation.before = parsedData.meditation.value
        this.delta.before = parsedData.delta.value
        this.theta.before = parsedData.theta.value
        this.lowAlpha.before = parsedData.lowAlpha.value
        this.highAlpha.before = parsedData.highAlpha.value
        this.lowBeta.before = parsedData.lowBeta.value
        this.highBeta.before = parsedData.highBeta.value
        this.lowGamma.before = parsedData.lowGamma.value
        this.highGamma.before = parsedData.highGamma.value
    }

    setAfterData(parsedData, fileInput = '') {
        this.hasAfterData = true
        this.fileInput.after = fileInput

        this.attention.after = parsedData.attention.value
        this.meditation.after = parsedData.meditation.value
        this.delta.after = parsedData.delta.value
        this.theta.after = parsedData.theta.value
        this.lowAlpha.after = parsedData.lowAlpha.value
        this.highAlpha.after = parsedData.highAlpha.value
        this.lowBeta.after = parsedData.lowBeta.value
        this.highBeta.after = parsedData.highBeta.value
        this.lowGamma.after = parsedData.lowGamma.value
        this.highGamma.after = parsedData.highGamma.value
    }

}

