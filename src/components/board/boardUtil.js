export function insertColor(rIndex, cIndex, predictions) {
  const isPrediction = predictions.filter(prediction => {
    return prediction.positionX === cIndex && prediction.positionY === rIndex;
  }).length;

  const isEateable = predictions.filter(prediction => {
    return (
      prediction.eat &&
      prediction.eat.positionX === cIndex &&
      prediction.eat.positionY === rIndex
    );
  }).length;

  if (isPrediction) {
    return "#8bc37a";
  } else if (isEateable) {
    return "#c37a7a";
  } else if (rIndex % 2 === 0) {
    if (cIndex % 2 === 1) {
      // return "rgb(238, 238, 238)";
      return "rgba(255, 255, 255, 0.53)";
    } else {
      // return "rgb(193, 193, 193)";
      return "rgba(177, 177, 177, 0.55)";
    }
  } else {
    if (cIndex % 2 === 0) {
      // return "rgb(238, 238, 238)";
      return "rgba(255, 255, 255, 0.53)";
    } else {
      // return "rgb(193, 193, 193)";
      return "rgba(177, 177, 177, 0.55)";
    }
  }
}
