import fs from "fs";
import path from "path";
import { Readable } from "stream";
import xlsx from "xlsx";

xlsx.set_fs(fs);
xlsx.stream.set_readable(Readable);

// Paths

const args = process.argv;

const mediaDirectory =
  args[2] || "C:\\Users\\cyrax\\Documents\\testy-kierowcy-media";
const excelFile =
  args[3] || "C:\\Users\\cyrax\\Documents\\temp\\bazapytan-kopiaB.xlsx";
const outputFile =
  args[4] || "C:\\Users\\cyrax\\Documents\\temp\\filtered_db.xlsx";

// Read the Excel file
const workbook = xlsx.readFile(excelFile);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert worksheet to JSON
const data = xlsx.utils.sheet_to_json(worksheet);

// Get list of media files in the directory
const mediaFiles = fs.readdirSync(mediaDirectory);

// Filter data where 'Media' column value exists in mediaFiles
const filteredData = data.filter((row: any) => {
  return mediaFiles.includes(row.Media) || row.Media === "";
});

const columnsToKeep = {
  "Numer pytania": "id",
  Pytanie: "content",
  "Odpowiedź A": "A",
  "Odpowiedź B": "B",
  "Odpowiedź C": "C",
  "Poprawna odp": "correctAnswer",
  Media: "media",
  "Zakres struktury": "type",
  "Liczba punktów": "value",
};

// Translation maps for specific column values
const correctAnswerTranslation = { T: 1, N: 0 } as { [key: string]: any };
const typeTranslation = {
  PODSTAWOWY: "basic",
  SPECJALISTYCZNY: "specialized",
} as { [key: string]: any };

// Transform the filtered data to keep only the specified columns, rename them, and translate values
const transformedData = filteredData.map((row: any) => {
  const newRow = {} as { [key: string]: any };
  for (const [oldKey, newKey] of Object.entries(columnsToKeep)) {
    if (row.hasOwnProperty(oldKey)) {
      let value = row[oldKey] as string;
      // Translate values based on the column
      if (
        newKey === "correctAnswer" &&
        correctAnswerTranslation.hasOwnProperty(value)
      ) {
        value = correctAnswerTranslation[value];
      } else if (newKey === "type" && typeTranslation.hasOwnProperty(value)) {
        value = typeTranslation[value];
      } else if (newKey === "media" && typeof value === "string") {
        value = value.replace(".wmv", ".mp4");
      }
      newRow[newKey] = value;
    }
  }
  return newRow;
});

// Convert filtered data back to worksheet
const newWorksheet = xlsx.utils.json_to_sheet(transformedData);

// Create a new workbook and add the filtered worksheet
const newWorkbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(newWorkbook, newWorksheet, "FilteredData");

// Write the new workbook to a file
xlsx.writeFile(newWorkbook, outputFile);

console.log("Filtered data has been saved to", outputFile);
