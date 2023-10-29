import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { strippedBackground } from "../../../Progress/subcomponents/ProgressBackground";
import { useTimer } from "react-timer-hook";
import { useExamControlContext } from "../../../../../context/examControls/examControls";
import type {
  QuestionType,
  TimerState,
} from "../../../../../types/globalTypes";
import type { ExcludeUndefined } from "../../types";

interface Props {
  type: QuestionType;
}

function getTotalTime(questionType: QuestionType, timerState: TimerState) {
  const prepareTime = 20;
  const basicAnsewerTime = 15;
  const specializedAnsewerTime = 50;

  if (questionType === "basic") {
    if (timerState === "prepare") return prepareTime;
    else return basicAnsewerTime;
  } else {
    return specializedAnsewerTime;
  }
}

function calcTimeProgresPercent(currentTime: number, maxTime: number) {
  return Math.floor(100 - (currentTime / maxTime) * 100) + "%";
}

function getExpiryTimeStamp(timeForAnsewer: number) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + timeForAnsewer);
  return time;
}

function getTimerLabel(timerState: TimerState) {
  switch (timerState) {
    case "prepare":
      return "Czas na zapoznanie się z pytaniem";
    case "wait":
      return "Trwa odtwarzanie";
    case "ansewer":
      return "Czas na odpowiedź";
  }
}

export default function TimeCount(props: Props) {
  const controls = useExamControlContext();
  const { timerState, setTimerState, nextQuestion, questionCount } =
    controls as ExcludeUndefined<typeof controls>;
  const totalTime = getTotalTime(props.type, timerState);

  const { seconds, restart, pause } = useTimer({
    expiryTimestamp: getExpiryTimeStamp(totalTime),
    onExpire() {
      if (timerState === "prepare") {
        setTimerState("wait");
      }
      if (timerState === "ansewer") {
        nextQuestion();
      }
    },
  });

  useEffect(() => {
    const totalTime = getTotalTime(props.type, timerState);
    restart(getExpiryTimeStamp(totalTime));

    if (timerState === "wait") {
      pause();
    }
  }, [questionCount, props.type, timerState, restart, pause]);

  useEffect(() => {
    if (props.type === "specialized") {
      setTimerState("ansewer");
    }
  }, [questionCount, props.type, setTimerState]);

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: "grey.800" }}>
        {getTimerLabel(timerState)}
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
        <Typography
          sx={{ position: "relative", zIndex: 5 }}
          variant="h6"
          component="p"
        >
          {timerState === "wait" ? "- " : seconds}s
        </Typography>
        <Box
          sx={{
            backgroundColor: "primary.light",
            backgroundImage: strippedBackground,
            position: "absolute",
            width: calcTimeProgresPercent(seconds, totalTime),
            transition: "width 1s linear",
            height: "100%",
            top: "0",
          }}
        ></Box>
      </Box>
    </>
  );
}
