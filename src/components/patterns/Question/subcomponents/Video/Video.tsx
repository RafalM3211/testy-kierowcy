import ReactPlayer from "react-player";
import { useCallback, useEffect, useRef, useState } from "react";
import MediaCover from "../MediaCover/MediaCover";
import { QuestionMode } from "../../types";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";

interface Props {
  src: string;
  mode: QuestionMode;
}

export default function Video(props: Props) {
  const [isVideoStarted, setVideoStarted] = useState(false);
  const [isError, setError] = useState(false);

  const { questionCount, setTimerState, timerState } = useEgzamControlContext();
  const videoRef = useRef<ReactPlayer>(null);

  function handleVideoEnd() {
    if (setTimerState) {
      setTimerState("ansewer");
    }
  }

  const handleVideoStart = useCallback(() => {
    if (props.mode === "exam") {
      setVideoStarted(true);
      if (setTimerState) {
        setTimerState("wait");
      }
    }
  }, [setVideoStarted, setTimerState, props.mode]);

  const handleError = useCallback(() => {
    setError(true);
    if (setTimerState) {
      setTimerState("wait");
    }
  }, [setError, setTimerState]);

  useEffect(() => {
    if (!ReactPlayer.canPlay(props.src)) {
      handleError();
    }
  }, [props.src, handleError]);

  useEffect(() => {
    setVideoStarted(false);
    videoRef.current?.seekTo(0);
  }, [questionCount]);

  useEffect(() => {
    if (timerState === "wait") {
      handleVideoStart();
    }
  }, [timerState, handleVideoStart]);

  return (
    <MediaCover
      isError={isError}
      handleStart={handleVideoStart}
      isStarted={isVideoStarted}
      mode={props.mode}
      mediaType="video"
      mediaElement={
        <ReactPlayer
          url={props.src}
          width="100%"
          height="100%"
          muted
          controls={props.mode === "preview"}
          {...(props.mode === "exam" && {
            onError: handleError,
            onEnded: handleVideoEnd,
            ref: videoRef,
            playing: !!isVideoStarted,
            style: { display: !!isVideoStarted ? "block" : "none" },
          })}
        />
      }
    />
  );
}
