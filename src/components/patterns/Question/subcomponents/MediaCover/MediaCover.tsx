import { Box, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ImageIcon from "@mui/icons-material/Image";
import { flexCenter } from "../../../../../utility/styling";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";
import { QuestionMode } from "../../types";
import type { ReactElement } from "react";

interface Props {
  isStarted: boolean;
  handleStart: () => void;
  mediaElement: ReactElement;
  mediaType: "image" | "video";
  isError: boolean;
  mode: QuestionMode;
}

export default function MediaCover(props: Props) {
  return (
    <>
      <Box
        onClick={props.handleStart}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "grey.300",
          cursor: "pointer",
          userSelect: "none",
          ...flexCenter,
        }}
      >
        {props.isError ? (
          <ErrorBlock />
        ) : (
          <>
            {props.mediaElement}
            {props.isStarted || (
              <Box sx={{ ...flexCenter, flexDirection: "column" }}>
                <Typography variant="h6" component="p">
                  {`Kliknij aby wyświetlić ${
                    props.mediaType === "image" ? "obraz" : "film"
                  } i rozpocząć pytanie`}
                </Typography>
                {props.mediaType === "image" ? (
                  <ImageIcon sx={{ fontSize: 90, mt: "10px" }} />
                ) : (
                  <PlayCircleOutlineIcon sx={{ fontSize: 90, mt: "10px" }} />
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
