import { Box, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { flexCenter } from "../../../../../utility/styling";
import { useEffect, useRef, useState } from "react";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";

interface Props {
  src: string;
}

export default function Video(props: Props) {
  const [isError, setError] = useState(false);
  const [isStarted, setStarted] = useState(false);

  function start() {
    setStarted(true);
  }

  function handleError() {
    setError(true);
  }

  return (
    <>
      <Box
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
              <video
                style={{ width: "100%", height: "100%" }}
                id="videoPlayer"
                width="50%"
                onError={handleError}
                controls
                muted
                autoPlay
              >
                <source src={props.src} type="video/mp4" />
              </video>
            ) : (
              <Box
                onClick={start}
                sx={{ ...flexCenter, flexDirection: "column" }}
              >
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
