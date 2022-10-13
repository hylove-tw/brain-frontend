export default class Utils {
    constructor() {
        this.sentimentMap = {
            HP: {
                color: '#fafafa',
                borderColor: '#d4d4d4',
                colorText: '白色',
                colorClass: 'bg-neutral-50 border-neutral-300',
                title: '心平氣和'
            },
            V3: {
                color: '#ef4444',
                borderColor: '#b91c1c',
                colorText: '紅色',
                colorClass: 'bg-red-500 border-red-700',
                title: '極度喜歡'
            },
            V2: {
                color: '#fb7185',
                borderColor: '#e11d48',
                colorText: '淺紅色',
                colorClass: 'bg-rose-400 border-rose-600',
                title: '非常喜歡'
            },
            V1: {
                color: '#f472b6',
                borderColor: '#db2777',
                colorText: '淺紅色',
                colorClass: 'bg-pink-400 border-pink-600',
                title: '很喜歡'
            },
            L3: {
                color: '#fde047',
                borderColor: '#eab308',
                colorText: '金黃色',
                colorClass: 'bg-yellow-300 border-yellow-500',
                title: '喜歡'
            },
            L2: {
                color: '#fb923c',
                borderColor: '#ea580c',
                colorText: '澄色',
                colorClass: 'bg-orange-400 border-orange-600',
                title: '像喜歡'
            },
            L1: {
                color: '#fbbf24',
                borderColor: '#d97706',
                colorText: '淺澄色',
                colorClass: 'bg-amber-400 border-amber-600',
                title: '有點喜歡'
            },
            U1: {
                color: '#9ca3af',
                borderColor: '#52525b',
                colorText: '灰色',
                colorClass: 'bg-gray-400 border-gray-600',
                title: '有點不喜歡'
            },
            U2: {
                color: '#a3e635',
                borderColor: '#65a30d',
                colorText: '淺綠色',
                colorClass: 'bg-lime-400 border-lime-600',
                title: '像不喜歡'
            },
            U3: {
                color: '#16a34a',
                borderColor: '#166534',
                colorText: '綠色',
                colorClass: 'bg-green-600 border-green-800',
                title: '不喜歡'
            },
            D1: {
                color: '#a5f3fc',
                borderColor: '#22d3ee',
                colorText: '淡藍色',
                colorClass: 'bg-cyan-200 border-cyan-400',
                title: '很不喜歡'
            },
            D2: {
                color: '#38bdf8',
                borderColor: '#0284c7',
                colorText: '淺藍色',
                colorClass: 'bg-sky-400 border-sky-600',
                title: '非常不喜歡'
            },
            D3: {
                color: '#2563eb',
                borderColor: '#1e40af',
                colorText: '藍色',
                colorClass: 'bg-blue-600 border-blue-800',
                title: '極度不喜歡'
            },
            HF: {
                color: '#44403c',
                borderColor: '#1c1917',
                colorText: '黑色',
                colorClass: 'bg-stone-700 border-stone-900',
                title: '心煩意亂'
            },
            R: {
                color: '#fef9c3',
                borderColor: '#fef08a',
                colorText: '淡黃色',
                colorClass: 'bg-yellow-100 border-yellow-200',
                title: '不置可否'
            }
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    roundDigits(num, digits) {
        return Math.round(num * Math.pow(10, digits)) / Math.pow(10, digits)
    }

    sum(arr) {
        let sum = 0
        arr.forEach(function (element) {
            sum += element
        })
        return sum
    }

    arrayAverage(arr) {
        let sum = 0.0
        arr.forEach(i => {
            sum += parseFloat(i)
        })
        const numbersCnt = arr.length
        return (sum / numbersCnt)
    }

    topAverage(arr) {
        const avg = this.arrayAverage(arr)
        const tmpList = []
        arr.forEach(i => {
            if (i > avg) {
                tmpList.push(i)
            }
        })
        return this.arrayAverage(tmpList) - avg
    }

    avg(a) {
        return this.roundDigits(this.arrayAverage(a), 3)
    }

    max(a) {
        return Math.max(...a)
    }

    min(a) {
        return Math.min(...a)
    }

    padArray(len, fill) {
        return [].concat(Array(len).fill(fill)).slice(0, len)
    }

    getSentimentAvg(sentimentData) {
        if (sentimentData) {
            const tmp = []
            sentimentData.forEach((item) => {
                tmp.push(this.sentimentMap[item].score)
            })
            return this.avg(tmp)
        } else {
            return 0
        }
    }
    getSentimentScoreArray(sentimentData) {
        if (sentimentData) {
            const tmp = []
            sentimentData.forEach((item) => {
                tmp.push(this.sentimentMap[item].score)
            })
            return tmp
        } else {
            return 0
        }
    }
    getSentimentChartArray(sentimentData) {
        if (sentimentData) {
            const tmp = []
            sentimentData.forEach((item) => {
                tmp.push(this.sentimentMap[item])
            })
            return tmp
        } else {
            return 0
        }
    }
}
