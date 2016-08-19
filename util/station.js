export function findColors(node, nodes) {
  if (!!node && node.hasOwnProperty('colors')) {
    return node.colors;
  } else if (node.hasOwnProperty('parent') && !!node.parent && !!nodes[node.parent]) {
    return findColors(nodes[node.parent], nodes);
  }
  // FIXME this default should be in a place that is easier to find
  return { light: '#fff', dark: '#000' };
}
