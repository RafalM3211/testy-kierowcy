import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ReactPlayer from "react-player";
import { flexCenter } from "../../../../../utility/styling";
import { useEffect, useState } from "react";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";

interface PropsBase {
  src: string;
}

interface ExamMode extends PropsBase {
  isStarted: boolean;
  setStarted: (value: boolean) => void;
}

type PreviewMode = Omit<ExamMode, "isStarted" | "setStarted">;

type Props = ExamMode | PreviewMode;

export default function Video(props: Props) {
  const [isError, setError] = useState(false);
  const [isStarted, setStarted] = useState(false);

  useEffect(() => {
    if (!ReactPlayer.canPlay(props.src)) {
      handleError();
    }
  }, [props.src]);

  function start() {
    setStarted(true);
  }

  function handleError() {
    setError(true);
  }

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
            {isStarted ? (
              <ReactPlayer
                width="100%"
                height="100%"
                onError={handleError}
                playing={true}
                muted={true}
                url={props.src}
              />
            ) : (
              <Box sx={{ ...flexCenter, flexDirection: "column" }}>
                <Typography variant="h6" component="p">
                  Kliknij aby odtworzyć
                </Typography>
                <PlayCircleOutlineIcon sx={{ fontSize: 90, mt: "10px" }} />
              </Box>
            )}
          </>
        )}

        {/* */}
      </Box>
    </>
  );
}
