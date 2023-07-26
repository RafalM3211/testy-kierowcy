import ffmpeg from "fluent-ffmpeg";

console.log("start");

const command = ffmpeg(
  "C:/projekty/driving-licence-quiz/src/server/db/temporaryMedia/R_2org.wmv",
  { logger: console }
)
  .inputFormat("wmv")
  .native()
  .on("end", () => {
    console.log("finished");
  })
  .videoCodec("libx264")
  .toFormat("mp4")
  .saveToFile(
    "C:/projekty/driving-licence-quiz/src/server/db/temporaryMedia/asd.mp4"
  );

//todo: zrob zeby dzialalo. Ten bat wykonuje to co ma ten skrypt wykonywac tylko dziala tylko na windowsie i trzeba instalowac ffmpeg i ustawiac zmienne srodowiskowe. Z skryptem w js przynajmniej nie bedzie trzeba ustawiac zmiennych srodowiskowych i bedzie dzialac tez na linuxie

/* const input =
  "C:/projekty/driving-licence-quiz/src/server/db/temporaryMedia/R_2org.wmv";

let segments = input.split("/");

ffmpeg -i R_2org.wmv fff.mp4

let filename = segments[segments.length - 1];
let extension = filename.split(".")[1];
let name = filename.split(".")[0];
let folder = input.replace(filename, "");
let output = folder + name + ".mp4";
console.log("Converting file %s", output);
ffmpeg().input(input).inputFormat("mwv").toFormat("mp4").save(output); */
