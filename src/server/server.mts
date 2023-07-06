import jsonServer from "json-server";

console.log("START");

const server = jsonServer.create();

server.get("question", (req, res) => {
  res.status(200).jsonp({ name: "test" });
});
