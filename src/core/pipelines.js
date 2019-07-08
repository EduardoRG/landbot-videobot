// system

// lib
import { Subject } from 'rxjs';
import { buffer, debounceTime } from 'rxjs/operators';

const DEBOUNCE_TIME_SPAN = 1000;

// ----- RECEPTION ------
export const $receptorObservable = new Subject();

// ----- DEBOUNCE -------
export const $debouncedReceptor = $receptorObservable
  .pipe(debounceTime(DEBOUNCE_TIME_SPAN));

// ------ BUFFER -------
export const $bufferedReceptor = $receptorObservable
  .pipe(buffer($debouncedReceptor));

// ------ MESSAGES CHUNK -------
export const $chunkReceptor = new Subject();
  
// Input renderer pipeline.
export const $inputRenderer = new Subject();
