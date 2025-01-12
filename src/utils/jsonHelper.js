import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import fileUtils from "../infrastructure/fileSystem.js";

// Helper function to generate the next invoice number based on JSON data
const generateNewInvoiceNumber = () => {
  const dataFilePath = path.join(__dirname, "../data/invoiceData.json");
  const data = fileUtils.readJson(dataFilePath, { lastInvoiceNumber: 1 });
  const newInvoiceNumber = data.lastInvoiceNumber + 1;

  fileUtils.updateJson(dataFilePath, (data) => ({
    ...data,
    lastInvoiceNumber: newInvoiceNumber,
  }));

  return newInvoiceNumber;
};

export default generateNewInvoiceNumber;
