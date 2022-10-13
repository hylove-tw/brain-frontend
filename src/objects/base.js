export default class BaseReport {
  constructor(brainData) {
    this.attention = brainData.attention
    this.meditation = brainData.meditation
    this.delta = brainData.delta
    this.theta = brainData.theta
    this.lowAlpha = brainData.lowAlpha
    this.highAlpha = brainData.highAlpha
    this.lowBeta = brainData.lowBeta
    this.highBeta = brainData.highBeta
    this.lowGamma = brainData.lowGamma
    this.highGamma = brainData.highGamma
    this.sentimentAvgBefore = brainData.sentimentAvgBefore
    this.sentimentAvgAfter = brainData.sentimentAvgAfter
  }
}
