import ReactPlayer from "react-player";
import { useState } from "react";
import ErrorBlock from "../../../ErrorBlock/ErrorBlock";
import { QuestionMode } from "../../types";

interface Props {
  src: string;
  mode: QuestionMode;
}

export default function PreviewVideo(props: Props) {
  const [isError, setError] = useState(false);

  function handleError() {
    setError(true);
  }

  return (
    <>
      {isError ? (
        <ErrorBlock />
      ) : (
        <ReactPlayer
          controls
          pip={false}
          muted
          width="100%"
          height="100%"
          onError={handleError}
          url={props.src}
          style={{ fontSize: "3em" }}
        />
      )}
    </>
  );
}
