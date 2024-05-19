import Router from "express-promise-router";
import { getExamQuestions, saveQuestionAnswer } from "./question.mjs";

const router = Router();

router.get("/get-exam", async (req, res) => {
  const questions = await getExamQuestions();

  res.status(200).jsonp(questions);
});

router.post("/send-answer", async (req, res) => {
  const { userId, questionId, isCorrect } = req.body;

  saveQuestionAnswer(userId, questionId, isCorrect);

  res.sendStatus(200);
});

export default router;
