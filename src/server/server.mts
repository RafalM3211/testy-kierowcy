import jsonServer from "json-server";
import type { Question } from "../types/globalTypes";

console.log("START");

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get("/question", (req, res) => {
  console.log("get");
  const question = {
    id: 1,
    value: 3,
    content: "PYTANIE NUmer jeden hehehe",
    ansewers: "YES/NO",
    correctAnsewer: true,
    type: "basic",
  } satisfies Question;
  res.status(200).jsonp(question);
});

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
