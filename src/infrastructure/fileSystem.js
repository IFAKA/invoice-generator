import jsonfile from "jsonfile";

// Utility to read JSON from file or return default data
const readJson = (filePath, defaultData) => {
  try {
    return jsonfile.readFileSync(filePath);
  } catch {
    jsonfile.writeFileSync(filePath, defaultData);
    return defaultData;
  }
};

// Utility to update the JSON file
const updateJson = (filePath, updateFn) => {
  const data = readJson(filePath, {
    year: new Date().getFullYear(),
    lastInvoiceNumber: 1,
  });
  const updatedData = updateFn(data);
  jsonfile.writeFileSync(filePath, updatedData);
  return updatedData;
};

export default { readJson, updateJson };
