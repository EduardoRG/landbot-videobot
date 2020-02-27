import { useState, useEffect, useRef } from 'react';
import { useConfigContext } from 'context/config';
import { throttleTimeline$, videoTimeline$ } from 'core/pipelines';

// lib
import videojs from 'video.js';

export default function useVideoPlayer(options = {}) {
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);
  const [player, setPlayer] = useState(null);
  const { debug } = useConfigContext();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef && !player) {
      setPlayer(videojs(videoRef.current, options));
    }
  }, [videoRef, player]);

  useEffect(() => {
    if (player) {
      const onClick = () => player.paused() ? player.play() : player.pause();
      videoRef.current.addEventListener('click', onClick);

      player.ready(() => {
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
        videoRef.current.removeEventListener('click', onClick);
        player.dispose();
        progressSubscription.unsubscribe();
        timelineSubscription.unsubscribe();
      };
    }
  }, [player]);

  // Debug controls.
  useEffect(() => {
    if (debug && player) {
      const onKeydown = e => {
        switch (e.key) {
          case 'ArrowLeft':
            player.currentTime(progress - 5);
            break;
          case 'ArrowRight':
            player.currentTime(progress + 5);
            break;
        }
      }
      videoRef.current.addEventListener('keydown', onKeydown);
      return () => videoRef.current.removeEventListener('keydown', onKeydown);
    }
  }, [videoRef, progress, player, debug]);

  return { videoRef, loading, isPaused, finished, progress };
}