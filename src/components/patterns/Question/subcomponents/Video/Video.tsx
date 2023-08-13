import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import { flexCenter } from "../../../../../utility/styling";
import { useEffect, useRef, useState } from "react";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";
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

  function handleVideoStart() {
    if (props.mode === "exam") {
      setVideoStarted(true);
      if (setTimerState) {
        setTimerState("wait");
      }
    }
  }

  function handleError() {
    setError(true);
    if (setTimerState) {
      setTimerState("wait");
    }
  }

  useEffect(() => {
    if (!ReactPlayer.canPlay(props.src)) {
      handleError();
    }
  }, [props.src]);

  useEffect(() => {
    setVideoStarted(false);
    videoRef.current?.seekTo(0);
  }, [questionCount]);

  useEffect(() => {
    if (timerState === "wait") {
      handleVideoStart();
    }
  }, [timerState]);

  return (
    <>
      <MediaCover
        isError={isError}
        handleStart={handleVideoStart}
        isStarted={isVideoStarted}
        mode="exam"
        mediaType="video"
        mediaElement={
          <ReactPlayer
            onEnded={handleVideoEnd}
            ref={videoRef}
            width="100%"
            height="100%"
            onError={handleError}
            playing={!!isVideoStarted}
            style={{ display: !!isVideoStarted ? "block" : "none" }}
            muted={true}
            url={props.src}
          />
        }
      />
    </>
  );
}
