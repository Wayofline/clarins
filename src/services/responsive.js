import { sizes } from "./nodes";
// let  inserted;
let coef, resolution;

/**
 * [description]
 * @param {Number} width
 * @param {Number} height
 */
function getRatio(width, height) {
  return "ratio_" + Math.round((width * 100) / height) / 100;
}

function extractResolution() {
  const ratios = {};
  for (const key of Object.keys(sizes)) {
    const resolution = key
      .slice(1)
      .split("x")
      .map(value => parseInt(value));
    const ratio = getRatio(resolution[1], resolution[0]);
    if (!ratios[ratio]) {
      ratios[ratio] = {
        resolutions: [],
        height: [],
        width: []
      };
    }
    ratios[ratio].resolutions.push(key);
    ratios[ratio].width.push(resolution[1]);
    ratios[ratio].height.push(resolution[0]);
  }
  return ratios;
}

function getResolution() {
  return (window.screen.width > window.screen.height)
    ? [window.screen.height, window.screen.width]
    : [window.screen.width, window.screen.height];
}

function checkResolution() {
  const ratios = extractResolution();
  // console.log("window.devicePixelRatio:",window.devicePixelRatio);
  // console.log("window.visualViewport:",window.visualViewport);

  const [screenW, screenH] = getResolution().map(elm => Math.floor(elm));
  const ratio = getRatio(screenW, screenH);

  // console.log("ratio:", ratio, ratios);

  if (!ratios[ratio]) return false;

  const closestWidth = ratios[ratio].width.reduce((a, b) => {
    return Math.abs(b - screenW) < Math.abs(a - screenW) ? b : a;
  });
  const closestHeight = ratios[ratio].height[ratios[ratio].width.indexOf(closestWidth)];
  resolution = `${closestHeight}x${closestWidth}`;
  coef = screenH / closestHeight;
  return true;
}

const videoResolution = getResolution()
.reverse()
.join("x");

export {
  checkResolution,
  coef, //inutile pour le moment
  extractResolution,
  getResolution,
  resolution, //probablement inutile pour le moment,
  videoResolution
};