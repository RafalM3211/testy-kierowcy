import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { strippedBackground } from "../../../Progress/subcomponents/ProgressBackground/ProgressBackground";
import type { QuestionMode } from "../../types";
import { Question } from "../../../../../types/globalTypes";

import { useTimer } from "react-timer-hook";
import { useEgzamControlContext } from "../../../../../context/egzamControls/egzamControls";
import type { ExcludeUndefined } from "../../types";

interface Props {
  type: Question["type"];
}

function getAnsewerTimeFromType(questionType: Question["type"]) {
  return questionType === "basic" ? 25 : 50;
}

function calcTimeProgresPercent(currentTime: number, maxTime: number) {
  return Math.floor(100 - (currentTime / maxTime) * 100) + "%";
}

function getExpiryTimeStamp(timeForAnsewer: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timeForAnsewer);
  return time;
}

export default function TimeCount(props: Props) {
  const timeForAnsewer = getAnsewerTimeFromType(props.type);
  const [ansewerTime, setAnsewerTime] = useState(timeForAnsewer);
  const controls = useEgzamControlContext();
  const { isStarted, nextQuestion, questionCount } =
    controls as ExcludeUndefined<typeof controls>;

  const { seconds, restart } = useTimer({
    expiryTimestamp: getExpiryTimeStamp(timeForAnsewer),
    onExpire() {
      nextQuestion();
    },
  });

  useEffect(() => {
    const timeForAnsewer = getAnsewerTimeFromType(props.type);
    setAnsewerTime(timeForAnsewer);
    restart(getExpiryTimeStamp(timeForAnsewer));
  }, [questionCount, setAnsewerTime, props.type, restart]);

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: "grey.800" }}>
        Czas na odpowiedź
      </Typography>
      <Box
        sx={{
          width: "200px",
          textAlign: "center",
          backgroundColor: "grey.300",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Typography sx={{ position: "relative", zIndex: 5 }} variant="h6">
          {seconds + "s"}
        </Typography>
        <Box
          sx={{
            backgroundColor: "primary.light",
            backgroundImage: strippedBackground,
            position: "absolute",
            width: calcTimeProgresPercent(ansewerTime, timeForAnsewer),
            transition: "width 1s linear",
            height: "100%",
            top: "0",
          }}
        ></Box>
      </Box>
    </>
  );
}
