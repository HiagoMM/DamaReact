export function insertColor(piece, rIndex, cIndex, predictions) {
  const isPrediction = predictions.filter(prediction => {
    return prediction.positionX === rIndex && prediction.positionY === cIndex;
  }).length;

  if (isPrediction) {
    return '#8bc37a';
  } else if (rIndex % 2 === 0) {
    if (cIndex % 2 === 1) {
      return 'rgb(238, 238, 238)';
    } else {
      return 'rgb(193, 193, 193)';
    }
  } else {
    if (cIndex % 2 === 0) {
      return 'rgb(238, 238, 238)';
    } else {
      return 'rgb(193, 193, 193)';
    }
  }
}
