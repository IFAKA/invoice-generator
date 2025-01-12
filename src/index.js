import sendInvoiceEmail from "./core/use-cases/sendInvoiceEmail.js";

async function main() {
  try {
    await sendInvoiceEmail();
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
