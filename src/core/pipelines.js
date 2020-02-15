// system

// lib
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

// Input renderer pipeline.
export const inputRenderer$ = new Subject();

// Video timeline
export const videoTimeline$ = new Subject();

// Time line view throttle.
const timeline$ = new Subject();
export const throttleTimeline$ = timeline$.pipe(
  // Sampling: 2x frequency
  throttleTime(500)
);
