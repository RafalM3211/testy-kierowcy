import jsonServer from "json-server";
import { getQuestionById } from "./dbApi.mjs";

console.log("START");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const tempQuestionsIDs = [
  6301, 6302, 6304, 7131, 2420, 2430, 2432, 2990, 2438, 7130, 10060,
];

server.get("/question", (req, res) => {
  const questionId = Math.floor(Math.random() * 9);
  //const question = getQuestionById(questionId) as Question;
  res.status(200).jsonp({
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
  });
});

getQuestionById(6301);

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
