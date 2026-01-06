import "dotenv/config";
import sendInvoiceEmail from "./core/use-cases/sendInvoiceEmail.js";

async function main(): Promise<void> {
  try {
    await sendInvoiceEmail();
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
