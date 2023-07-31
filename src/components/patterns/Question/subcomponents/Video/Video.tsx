import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import { flexCenter } from "../../../../../utility/styling";
import { useEffect, useRef, useState } from "react";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";
import { QuestionMode } from "../../types";

interface PropsBase {
  src: string;
}

interface ExamMode extends PropsBase {
  mode: QuestionMode<"exam">;
  isStarted: boolean;
  setStarted: (value: boolean) => void;
}

interface PreviewMode extends PropsBase {
  mode: QuestionMode<"preview">;
  isStarted?: undefined;
  setStarted?: undefined;
}

type Props = ExamMode | PreviewMode;

export default function Video(props: Props) {
  const [isError, setError] = useState(false);
  const videoRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    if (!ReactPlayer.canPlay(props.src)) {
      handleError();
    }
  }, [props.src]);

  function start() {
    if (props.mode === "exam") {
      props.setStarted(true);
    }
  }

  function handleError() {
    setError(true);
  }

  useEffect(() => {
    videoRef.current?.seekTo(0);
  }, [props.isStarted]);

  return (
    <>
      <Box
        onClick={start}
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
              ref={videoRef}
              width="100%"
              height="100%"
              onError={handleError}
              playing={!!props.isStarted}
              style={{ display: !!props.isStarted ? "block" : "none" }}
              muted={true}
              url={props.src}
            />
            {props.isStarted || (
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
