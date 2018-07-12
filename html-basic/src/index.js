import './index.styl';
import zoom from 'zoom-image';
import Vidy from '@vidy-dev/embed';
import '@vidy-dev/embed/dist/embed.css';

let i=0, list=document.querySelectorAll('.image img');
while (i < list.length) zoom(list[i++]);

let vidy = new Vidy({
	appid: '2199e8c8-0c59-4617-b100-d463129790c5',
	postid: 'demo-static-grub-street',
	content: '.content article',
	autoload: true,
});
