import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import { flexCenter } from "../../../../../utility/styling";
import { useEffect, useRef, useState } from "react";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";
import { QuestionMode } from "../../types";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";

interface Props {
  src: string;
  mode: QuestionMode;
}

export default function Video(props: Props) {
  const [isVideoStarted, setVideoStarted] = useState(false);
  const [isError, setError] = useState(false);

  const { questionCount, setStarted } = useEgzamControlContext();
  const videoRef = useRef<ReactPlayer>(null);

  function handleVideoEnd() {
    if (setStarted) {
      setStarted(true);
    }
  }

  function handleStart() {
    if (props.mode === "exam") {
      setVideoStarted(true);
    }
  }

  function handleError() {
    setError(true);
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

  return (
    <>
      <Box
        onClick={handleStart}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "grey.300",
          cursor: "pointer",
          userSelect: "none",
          ...flexCenter,
        }}
      >
        {isError ? (
          <ErrorBlock />
        ) : (
          <>
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
            {isVideoStarted || (
              <Box sx={{ ...flexCenter, flexDirection: "column" }}>
                <Typography variant="h6" component="p">
                  Kliknij aby odtworzyć
                </Typography>
                <PlayCircleOutlineIcon sx={{ fontSize: 90, mt: "10px" }} />
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
