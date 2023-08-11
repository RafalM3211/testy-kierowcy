import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { strippedBackground } from "../../../Progress/subcomponents/ProgressBackground/ProgressBackground";
import type { QuestionMode } from "../../types";
import { Question } from "../../../../../types/globalTypes";

interface Props {
  isStarted: boolean;
  type: Question["type"];
  mode: QuestionMode;
  questionCount: number;
  nextQuestion: () => void;
}

function getAnsewerTimeFromType(questionType: Question["type"]) {
  return questionType === "basic" ? 25 : 50;
}

function calcTimeProgresPercent(currentTime: number, maxTime: number) {
  return Math.floor(100 - (currentTime / maxTime) * 100) + "%";
}

export default function TimeCount(props: Props) {
  const timeForAnsewer = getAnsewerTimeFromType(props.type);
  const [ansewerTime, setAnsewerTime] = useState(timeForAnsewer);

  function decrementTime() {
    setAnsewerTime(ansewerTime - 1);
    if (ansewerTime < 1) {
      props.nextQuestion();
    }
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (props.isStarted) {
        decrementTime();
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [props.questionCount, props.isStarted, decrementTime]);

  useEffect(() => {
    const timeForAnsewer = getAnsewerTimeFromType(props.type);
    setAnsewerTime(timeForAnsewer);
  }, [props.questionCount, setAnsewerTime, props.type]);

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
          {ansewerTime + "s"}
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
