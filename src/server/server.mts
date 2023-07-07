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
    content: "PYTANIE NUmer jeden hehehe",
  } satisfies Question;
  res.status(200).jsonp(question);
});

server.listen(3001, () => {
  console.log("server is running on port 3001!");
});
