import Router from "express-promise-router";
import { getExamQuestions } from "./exam.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const questions = await getExamQuestions();

  res.status(200).jsonp(questions);
});

export default router;
