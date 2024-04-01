import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface Props {
  src: string;
  playing?: boolean;
  controls?: boolean;
  style?: CSSProperties;
  onEnded?: () => void;
  onError?: () => void;
}

function Player(props: Props) {
  const { src, playing, controls, style, onEnded, onError } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [playing]);

  return (
    <video
      preload="auto"
      width="100%"
      height="100%"
      muted
      ref={videoRef}
      src={src}
      autoPlay={playing}
      controls={controls}
      style={style}
      onError={onError}
      onEnded={onEnded}
    ></video>
  );
}

export default Player;
