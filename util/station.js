export function findColor(node, nodes, isDark) {
  if (typeof node !== 'undefined' && !!node) {
    if(isDark)
    {
      if (node.hasOwnProperty('dark_color') && !!node.dark_color) {
        return node.dark_color;
      } else if (node.hasOwnProperty('parent_id') && !!node.parent_id && !!nodes[node.parent_id]) {
        return findColor(findNode(node.parent_id, nodes), nodes, isDark);
      }
    }
    else
    {
      if (node.hasOwnProperty('light_color') && !!node.light_color) {
        return node.light_color;
      } else if (node.hasOwnProperty('parent_id') && !!node.parent_id && !!nodes[node.parent_id]) {
        return findColor(findNode(node.parent_id, nodes), nodes, isDark);
      }
    }
  }
  // FIXME this default should be in a place that is easier to find
  if(isDark)
    return '#000';
  else
    return '#FFF';
}

export function findSymbol(node, nodes, icons) {
  // console.log('findSymbol');
  if (typeof node !== 'undefined' && !!node) {
    // console.log('for node id='+node.id);
    for(i in icons)
    {
      // console.log('going through nodes, i:'+i);
      const icon = icons[i];
      if (icon.parent_id == node.id)
      {
        // console.log('findSymbol ended, returning icon:');
        // console.log(icon);
        return icon;
      }
    }
    // console.log('did not find symbol, trying parent');
    return findSymbol(findNode(node.parent_id, nodes), nodes, icons);
  }
  // console.log('findSymbol ended, nothing found');
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
  // console.log('text not found, returning Untitled for parent_id='+node.id+' type='+type+' language='+language);
  return {'text':null}; // FIXME Should this throw an error instead?
}
