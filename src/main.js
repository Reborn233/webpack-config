import './assets/style/wing';
import './assets/style/index.less';
import * as Utils from './assets/utils';

import {
  fromEvent,
  // Observable,
  // of,
  from,
  // empty,
  // never,
  // throwError,
  // timer,
  interval
} from 'rxjs';
import {
  // take,
  map,
  // mapTo,
  filter,
  // first,
  takeUntil,
  concatAll,
  // skip,
  // takeLast,
  // last,
  // concat,
  // startWith,
  // merge,
  // combineLatest,
  zip,
  withLatestFrom,
  scan
} from 'rxjs/operators';
// import { courseLists } from './assets/data';

const log = console.log.bind(console);
// const $btn = Utils.e('#btn');
// const $body = Utils.e('body');
const $drag = Utils.e('#drag');

const mouseDown = fromEvent($drag, 'mousedown');
const mouseUp = fromEvent(document, 'mouseup');
const mouseMove = fromEvent(document, 'mousemove');

const scroll = fromEvent(document, 'scroll');
const anchor = Utils.e('#anchor');

const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max);
};

scroll
  .pipe(map(() => anchor.getBoundingClientRect().bottom < 0))
  .subscribe(bool => {
    if (bool) {
      $drag.classList.add('video-fixed');
    }
 else {
      $drag.classList.remove('video-fixed');
    }
  });

const source = mouseDown.pipe(
  filter(() => $drag.classList.contains('video-fixed')),
  map(() => mouseMove.pipe(takeUntil(mouseUp))),
  concatAll(),
  withLatestFrom(mouseDown, (move, down) => ({
    x: validValue(move.clientX - down.offsetX, window.innerWidth - 350, 0),
    y: validValue(move.clientY - down.offsetY, window.innerHeight - 200, 0)
  }))
);

source.subscribe(pos => {
  $drag.style.left = pos.x + 'px';
  $drag.style.top = pos.y + 'px';
});

const s = from('reborn').pipe(zip(interval(600), x => x));
const e = s.pipe(scan((origin, next) => origin + next, ''));

e.subscribe({
  next: value => {
    log(value);
  },
  error: error => {
    log('Error: ', error);
  },
  complete: () => {
    log('complete');
  }
});
