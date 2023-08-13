import { useState, useEffect } from "react";
import { Box, SxProps } from "@mui/system";
import MediaCover from "../MediaCover/MediaCover";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";
import { Question } from "../../../../../types/globalTypes";

interface Props {
  src: string;
  type: Question["type"];
  alt?: string;
}

export default function Image(props: Props) {
  const [isQuestionStarted, setQuestionStarted] = useState(false);
  const [isError, setError] = useState(false);

  const { setTimerState } = useEgzamControlContext();

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

  useEffect(() => {
    if (props.type === "specialized") {
      handleStart();
    }
  }, [props.type]);

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
          sx={{
            display: !!isQuestionStarted ? "block" : "none",
            width: "100%",
            height: "100%",
          }}
        ></Box>
      }
    />
  );
}
