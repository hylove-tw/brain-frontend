export default class FileHandler {
    parseCsvData (text) {
        const attention = {
            name: 'Attention',
            value: []
        }
        const meditation = {
            name: 'Meditation',
            value: []
        }
        const delta = {
            name: 'Delta',
            value: []
        }
        const theta = {
            name: 'Theta',
            value: []
        }
        const lowAlpha = {
            name: 'Low Alpha',
            value: []
        }
        const highAlpha = {
            name: 'High Alpha',
            value: []
        }
        const lowBeta = {
            name: 'Low Beta',
            value: []
        }
        const highBeta = {
            name: 'High Beta',
            value: []
        }
        const lowGamma = {
            name: 'Low Gamma',
            value: []
        }
        const highGamma = {
            name: 'High Gamma',
            value: []
        }

        const data = text.split('\n')
        const factorNames = data[0].split(',')
        const factorData = data.slice(1)
        const _tmp = {}
        factorData.forEach(rowText => {
            const row = rowText.split(',')
            factorNames.forEach((factorName, idx) => {
                if (_tmp[factorName] === undefined) {
                    _tmp[factorName] = []
                }
                if (row[idx] !== undefined) {
                    _tmp[factorName].push(parseFloat(row[idx]))
                }
            })
        })
        attention.value = _tmp['Attention']
        meditation.value = _tmp['Meditation']
        delta.value = _tmp['Delta']
        theta.value = _tmp['Theta']
        lowAlpha.value = _tmp['Low Alpha']
        highAlpha.value = _tmp['High Alpha']
        lowBeta.value = _tmp['Low Beta']
        highBeta.value = _tmp['High Beta']
        lowGamma.value = _tmp['Low Gamma']
        highGamma.value = _tmp['High Gamma']

        return {
            hasDataB: false,
            attention: attention,
            meditation: meditation,
            delta: delta,
            theta: theta,
            lowAlpha: lowAlpha,
            highAlpha: highAlpha,
            lowBeta: lowBeta,
            highBeta: highBeta,
            lowGamma: lowGamma,
            highGamma: highGamma,
        }
    }

    parseXlsxData (data, startCol = 0) {
        const attention = {
            name: 'Attention',
            value: []
        }
        const meditation = {
            name: 'Meditation',
            value: []
        }
        const delta = {
            name: 'Delta',
            value: []
        }
        const theta = {
            name: 'Theta',
            value: []
        }
        const lowAlpha = {
            name: 'Low Alpha',
            value: []
        }
        const highAlpha = {
            name: 'High Alpha',
            value: []
        }
        const lowBeta = {
            name: 'Low Beta',
            value: []
        }
        const highBeta = {
            name: 'High Beta',
            value: []
        }
        const lowGamma = {
            name: 'Low Gamma',
            value: []
        }
        const highGamma = {
            name: 'High Gamma',
            value: []
        }
        const factorNames = data.slice(0, 1)
        const factorData = data.slice(1)
        factorData.forEach(row => {
            let i = startCol
            attention.value.push(row[i++])
            meditation.value.push(row[i++])
            delta.value.push(row[i++])
            theta.value.push(row[i++])
            lowAlpha.value.push(row[i++])
            highAlpha.value.push(row[i++])
            lowBeta.value.push(row[i++])
            highBeta.value.push(row[i++])
            lowGamma.value.push(row[i++])
            highGamma.value.push(row[i++])
        })
        return {
            hasDataB: true,
            attention: attention,
            meditation: meditation,
            delta: delta,
            theta: theta,
            lowAlpha: lowAlpha,
            highAlpha: highAlpha,
            lowBeta: lowBeta,
            highBeta: highBeta,
            lowGamma: lowGamma,
            highGamma: highGamma,
        }
    }
}