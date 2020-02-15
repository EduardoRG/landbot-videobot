import { useState, useEffect, useRef } from 'react';
import { throttleTimeline$, videoTimeline$ } from 'core/pipelines';

// lib
import videojs from 'video.js';

export default function useVideoPlayer(options = {}) {
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef) {
      const player = videojs(videoRef.current, options);

      player.on('ready', () => {
        setLoading(false);
      });

      player.on('play', () => {
        setIsPaused(false);
      });

      player.on('pause', () => {
        setIsPaused(true);
      });

      player.on('ended', () => {
        setFinished(true);
      });

      player.on('timeupdate', () => {
        throttleTimeline$.next(
          Math.ceil(player.currentTime())
        );
      });

      const progressSubscription = throttleTimeline$.subscribe(value => {
        setProgress(value);
      });

      const timelineSubscription = videoTimeline$.subscribe(time => {
        player.currentTime(time);
      });

      return () => {
        player.dispose();
        progressSubscription.unsubscribe();
        timelineSubscription.unsubscribe();
      };
    }
  }, [videoRef]);

  return { videoRef, loading, isPaused, finished, progress };
}