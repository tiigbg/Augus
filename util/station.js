export function findColors(node, nodes) {
  if (typeof node !== 'undefined' && !!node) {
    if (node.hasOwnProperty('colors')) {
      return node.colors;
    } else if (node.hasOwnProperty('parent') && !!node.parent && !!nodes[node.parent]) {
      return findColors(nodes[node.parent], nodes);
    }
  }
  // FIXME this default should be in a place that is easier to find
  return { light: '#fff', dark: '#000' };
}

export function findSymbol(node, nodes) {
  if (typeof node !== 'undefined' && !!node) {
    if (!!node && node.hasOwnProperty('symbol')) {
      return node.symbol;
    } else if (node.hasOwnProperty('parent') && !!node.parent && !!nodes[node.parent]) {
      return findSymbol(nodes[node.parent], nodes);
    }
  }
  return '';
}

export function findNode(id, nodes) {
  for(i in nodes)
  {
    const node = nodes[i];
    if (node.id == id)
    {
      return node;
    }
  }
  return null;
}

export function findChildren(parent, nodes) {
  children = [];
  for(i in nodes)
  {
    const node = nodes[i];
    if (node.parent_id == parent.id)
    {
      children.push(node);
    }
  }
  return children;
}

export function findText(node, texts, parent_type='section', type='title', language='sv') {
  for(i in texts)
  {
    const text = texts[i];
    if (text.parent_id == node.id && text.type==type && text.language==language && text.parent_type==parent_type)
    {
      return text;
    }
  }
  console.log('text not found, returning Untitled for parent_id='+node.id+' type='+type+' language='+language);
  return {'text':'(Untitled)'}; // FIXME Should this throw an error instead?
}