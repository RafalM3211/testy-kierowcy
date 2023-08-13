import { useState } from "react";
import { Box, SxProps } from "@mui/system";
import MediaCover from "../MediaCover/MediaCover";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";

interface Props {
  src: string;
  alt?: string;
  sx?: SxProps;
}

export default function Image(props: Props) {
  const [isQuestionStarted, setQuestionStarted] = useState(false);
  const [isError, setError] = useState(false);

  const { setTimerState, timerState } = useEgzamControlContext();

  function handleError() {
    setError(true);
    if (setTimerState) {
      setTimerState("wait");
    }
  }

  function handleStart() {
    setQuestionStarted(true);
    if (setTimerState) {
      setTimerState("ansewer");
    }
  }

  return (
    <MediaCover
      isError={isError}
      handleStart={handleStart}
      isStarted={isQuestionStarted}
      mode="exam"
      mediaType="image"
      mediaElement={
        <Box
          component="img"
          onError={handleError}
          src={props.src}
          alt={props.alt || ""}
          sx={{ display: !!isQuestionStarted ? "block" : "none", ...props.sx }}
        ></Box>
      }
    />
  );
}
