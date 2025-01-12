import * as fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateNewInvoiceNumber = async () => {
  const dataFilePath = path.join(__dirname, "../data/invoiceData.json");

  let data;
  try {
    data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  } catch (error) {
    data = { lastInvoiceNumber: 0, lastResetYear: new Date().getFullYear() };
  }

  const currentYear = new Date().getFullYear();

  if (currentYear > data.lastResetYear) {
    data.lastInvoiceNumber = 0;
    data.lastResetYear = currentYear;
  }

  const newInvoiceNumber = data.lastInvoiceNumber + 1;

  await fs.writeFile(
    dataFilePath,
    JSON.stringify(
      {
        lastInvoiceNumber: newInvoiceNumber,
        lastResetYear: currentYear,
      },
      null,
      2
    )
  );

  return newInvoiceNumber;
};

export default generateNewInvoiceNumber;
