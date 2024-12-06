import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // tslint:disable-next-line: max-line-length
  colors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51', '#e63946', '#457b9d','#283618', '#1d3557', '#cb997e','#e56b6f','#fca311','#e56b6f', '#f72585','#f6bd60','#e56b6f','#f6bd60','#f5cac3','#7400b8','#5390d9', '#ffe4c4', '#ff69b4', '#7fffd4', '#ee82ee', '#afeeee', '#90ee90', '#dda0dd', '#6495ed', '#ffff54', '#ff00ff', '#d8bfd8', '#ff6347', '#adff2f', '#f08080', '#a020f0', '#0000ff', '#f4a460', '#00bfff', '#00ffff', '#dc143c', '#4169e1', '#00fa9a', '#00ff00', '#0000cd', '#c71585', '#ffd700', '#ffa500', '#ff0000', '#9932cc', '#b03060', '#8fbc8f', '#7f007f', '#32cd32', '#00008b', '#9acd32', '#d2691e', '#4682b4', '#008b8b'];
  constructor() { }
}
