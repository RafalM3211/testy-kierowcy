import Router from "express-promise-router";
import { getExamQuestions } from "./exam.mjs";

const router = Router();

router.get("/", async (req, res) => {
  const session = req.session;
  if (!session.questions) {
    session.questions = [];
  }

  const questions = await getExamQuestions();

  session.save();
  res.status(200).jsonp(questions);
});

router.get("/resetExamSession", (req, res) => {
  const session = req.session;
  session.questions = [];
  session.save();
  res.sendStatus(200);
});

export default router;
