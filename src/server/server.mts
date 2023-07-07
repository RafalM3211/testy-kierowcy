import jsonServer from "json-server";
import type { Question } from "../types/globalTypes";

console.log("START");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const questions: Array<Question> = [
  {
    id: 1,
    value: 3,
    content: "PYTANIE NUmer jeden hehehe",
    ansewers: "YES/NO",
    correctAnsewer: true,
    type: "basic",
  },
  {
    id: 2,
    value: 2,
    content:
      "PYTANIE NUmer dwa bum bum ciao dłuższy tekst troche trzeba tutaj dać żeby zawijanie itd",
    ansewers: {
      A: "odpoeiwdz a",
      B: "odpoeiwdz b",
      C: "odpoeiwdz c",
    },
    correctAnsewer: "B",
    type: "specialized",
  },
];

server.get("/question", (req, res) => {
  const n = Math.floor(Math.random() * 2);
  res.status(200).jsonp(questions[n]);
});

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
