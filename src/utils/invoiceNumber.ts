import * as fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import type { InvoiceData } from "../types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateNewInvoiceNumber = async (invoiceYear: number): Promise<number> => {
  const dataFilePath = path.join(__dirname, "../../data/invoiceData.json");

  let data: InvoiceData;
  try {
    data = JSON.parse(await fs.readFile(dataFilePath, "utf8"));
  } catch {
    data = { lastInvoiceNumber: 0, lastResetYear: invoiceYear };
  }

  if (invoiceYear > data.lastResetYear) {
    data.lastInvoiceNumber = 0;
    data.lastResetYear = invoiceYear;
  }

  const newInvoiceNumber = data.lastInvoiceNumber + 1;

  await fs.writeFile(
    dataFilePath,
    JSON.stringify(
      {
        lastInvoiceNumber: newInvoiceNumber,
        lastResetYear: invoiceYear,
      },
      null,
      2
    )
  );

  return newInvoiceNumber;
};

export default generateNewInvoiceNumber;
