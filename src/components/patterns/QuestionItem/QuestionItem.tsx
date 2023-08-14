import { Box, Card, Typography } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import YesNoAnseswer from "../YesNoAnsewer/YesNoAnsewer";
import ABCAnsewer from "../ABCAnsewer/ABCAnsewer";
import { flexCenter } from "../../../utility/styling";
import { trimText, isImage } from "../../../utility/utils";
import type {
  ABCansewers,
  AnseweredQuestion,
  Question,
} from "../../../types/globalTypes";
import { Link } from "react-router-dom";

interface Props {
  data: Question | AnseweredQuestion;
  number?: number;
}

const mediaEndpointUrl = process.env.REACT_APP_SERVER_URL + "media/";

function trimAnsewers(ansewers: ABCansewers): ABCansewers {
  const trimValue = 65;
  return {
    A: trimText(ansewers.A, trimValue),
    B: trimText(ansewers.B, trimValue),
    C: trimText(ansewers.C, trimValue),
  };
}

export default function QuestionItem(props: Props) {
  const { data: question } = props;

  const mediaUrl = mediaEndpointUrl + question.media;

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: "45%",
        height: question.type === "basic" ? "170px" : "auto",
        my: "30px",
        mx: "2.5%",

        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Link
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          color: "unset",
          textDecoration: "none",
        }}
        to={`/question/${question.id}`}
      >
        <Box
          sx={{
            height: "100%",
            width: "1.5rem",
            bgcolor: "primary.main",
            ...flexCenter,
          }}
        >
          <Typography
            variant="h5"
            component="p"
            color="white"
            sx={{
              wordBreak: "break-all",
              textAlign: "center",
              lineHeight: "1em",
            }}
          >
            {props.number}
          </Typography>
        </Box>
        {isImage(question.media) ? (
          <Box
            component="img"
            src={mediaUrl}
            alt={"miniaturka obrazu dla pytania egzaminacyjnego"}
            sx={{
              width: "200px",
              height: "114px",
              ml: "10px",
              mr: "5px",
            }}
          ></Box>
        ) : (
          <Box
            sx={{
              width: "200px",
              height: "114px",
              ml: "10px",
              mr: "5px",
              bgcolor: "grey.300",
              ...flexCenter,
            }}
          >
            <VideocamIcon fontSize="large" />
          </Box>
        )}

        <Box
          sx={{
            boxSizing: "border-box",
            p: "15px",
            height: "100%",
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            "& *:hover": {
              backgroundColor: "inherit",
              borderColor: "initial",
            },

            "& .MuiButton-contained:hover": {
              backgroundColor: "primary.main",
            },

            "& .MuiButton-root:hover": {
              borderColor: "primary.light",
            },
          }}
        >
          <Typography variant="body1">
            {trimText(question.content, 100)}
          </Typography>
          {question.type === "basic" ? (
            <YesNoAnseswer
              chosenAnsewer={
                "chosenAnsewer" in question
                  ? (question.chosenAnsewer as boolean)
                  : null
              }
              size={3.4}
            />
          ) : (
            <ABCAnsewer
              ansewers={trimAnsewers(question.ansewers)}
              chosenAnsewer={
                "chosenAnsewer" in question
                  ? (question.chosenAnsewer as keyof ABCansewers)
                  : null
              }
              sx={{ fontSize: "0.9em" }}
            />
          )}
        </Box>
      </Link>
    </Card>
  );
}
