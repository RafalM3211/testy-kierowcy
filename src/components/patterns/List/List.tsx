import { Typography, Box } from "@mui/material";
import { memo } from "react";
import QuestionPreview from "../QuestionPreview/QuestionPreveiw";
import type { SxProps } from "@mui/material/styles";
import {
  BasicQuestion,
  Question,
  SpecializedQuestion,
} from "../../../types/globalTypes";
import ListHeader from "./ListHeader";

interface Props {
  questions: Question[];
  sx?: SxProps;
}

export default memo(function List(props: Props) {
  const specializedQuestions: SpecializedQuestion[] = [];
  const basicQuestions: BasicQuestion[] = [];

  props.questions.forEach((question) => {
    if (question.type === "specialized") {
      specializedQuestions.push(question);
    } else {
      basicQuestions.push(question);
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "baseline",
        width: "90%",
        mx: "auto",
        ...props.sx,
      }}
    >
      <ListHeader>Pytania podstawowe</ListHeader>
      {basicQuestions.length > 0 ? (
        basicQuestions.map((question, index) => (
          <QuestionPreview
            key={question.id + Math.floor(Math.random() * 99999) + index}
            number={index + 1}
            data={question}
          />
        ))
      ) : (
        <Typography>Brak pytań podstawowych</Typography>
      )}
      <ListHeader>Pytania specjalistyczne</ListHeader>
      {specializedQuestions.length > 0 ? (
        specializedQuestions.map((question, index) => (
          <QuestionPreview
            key={question.id + Math.floor(Math.random() * 99999) + index}
            number={index + 1}
            data={question}
          />
        ))
      ) : (
        <Typography>Brak pytań specjalistycznych</Typography>
      )}
    </Box>
  );
});
