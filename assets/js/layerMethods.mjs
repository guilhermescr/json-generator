function getPreviousLayerLevel(layerLevel) {
  let layerLevels = layerLevel.match(/n[0-9]+/g);

  if (layerLevels)
    return Number(layerLevels[layerLevels.length - 1].replace('n', ''));
  else return 1;
}

export { getPreviousLayerLevel };
