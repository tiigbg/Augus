import * as NavigationService from './NavigationService';
import { findColor, findText, findNode } from './station.js';
import { findExhibitionListTitle } from './exhibitionlist.js';

export function goBack(noBackButton, parentId, nodes, language, texts) {
  parentNode = findNode(parentId, nodes);
  if (parentNode) {
    NavigationService.navigate('StationList', {
      node: parentNode,
      title: findText(parentNode, texts, 'section', 'title', language).text,
    });
  } else if (!noBackButton) {
    NavigationService.navigate('ExhibitionList', { title: findExhibitionListTitle(language) });
  }
}

export function previous(previous, texts) {
  NavigationService.navigate('StationList', {
    node: previous,
    title: findText(previous, this.texts, 'section', 'title', 'sv').text,
  });

}

export function next(next, texts) {
  NavigationService.navigate('StationList', {
    node: next,
    title: findText(next, this.texts, 'section', 'title', 'sv').text,
  });

}


