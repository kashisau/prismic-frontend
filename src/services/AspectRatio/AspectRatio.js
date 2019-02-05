const SUPPORTED_RATIOS = [
  '3:2', '2:3',
  '4:3', '3:4',
  '16:9', '9:16',
  '5:4', '4:5',
  '1:1'
]
exports.getAspectRatio = ({width, height}) => {
  const aspectRatioFraction = width / height
  const testRatios = SUPPORTED_RATIOS
  const aspectRatio = testRatios.reduce((lastGoodAspect, testAspect) => {
    const testProportions = testAspect.split(':')
    const testWidthUnits = parseFloat(testProportions.shift())
    const testHeightUnits = parseFloat(testProportions.shift())

    // Does Rx * ratio = Ry ?
    if (Math.round(testWidthUnits/aspectRatioFraction*100)/100 === testHeightUnits)
      return testAspect

    return lastGoodAspect
  }, undefined)

  return aspectRatio
}
