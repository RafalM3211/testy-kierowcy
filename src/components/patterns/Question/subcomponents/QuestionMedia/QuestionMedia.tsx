import { Box } from "@mui/material";
import Image from "../Image/Image";
import Video from "../Video/Video";
import NoMedia from "../NoMedia/NoMedia";
import { isImage } from "../../../../../utility/utils";
import type { QuestionMode } from "../../types";
import type { Question } from "../../../../../types/globalTypes";

interface Props {
  mediaFileName: string;
  type: Question["type"];
  mode: QuestionMode;
}

const mediaEndpointUrl = process.env.REACT_APP_SERVER_URL + "media/";
const mediaWidth = 921;
const aspectRatio = 0.5625;
const mediaHeight = mediaWidth * aspectRatio;

export default function QuestionMedia(props: Props) {
  const isMediaPresent = props.mediaFileName !== "";
  const isMediaImage = isImage(props.mediaFileName);

  const mediaUrl = mediaEndpointUrl + props.mediaFileName;

  return (
    <Box
      sx={{
        width: mediaWidth + "px",
        height: mediaHeight + "px",
        bgcolor: "grey.300",
        gridRow: "2",
        gridColumn: "1",
      }}
    >
      {isMediaPresent ? (
        <>
          {isMediaImage ? (
            <Image type={props.type} mode={props.mode} src={mediaUrl} />
          ) : (
            <Video mode={props.mode} src={mediaUrl} />
          )}
        </>
      ) : (
        <NoMedia />
      )}
    </Box>
  );
}
