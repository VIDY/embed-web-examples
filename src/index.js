import zoom from 'zoom-image';
import './index.styl';

let i=0, list=document.querySelectorAll('.image img');
while (i < list.length) zoom(list[i++]);
