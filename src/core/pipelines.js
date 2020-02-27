// system

// lib
import { Subject, BehaviorSubject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

// Last message pipeline.
export const lastMessage$ = new BehaviorSubject();

// Default subscription execution
export const humanExecution$ = new Subject();

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
