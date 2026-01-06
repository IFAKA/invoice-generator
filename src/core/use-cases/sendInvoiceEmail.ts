import emailUtils from "../../infrastructure/email.js";
import createPDF from "../../infrastructure/pdf.js";
import generateNewInvoiceNumber from "../../utils/invoiceNumber.js";
import getPdfContent from "./getPdfContent.js";
import dateUtils from "../../utils/date.js";

const sendInvoiceEmail = async (): Promise<void> => {
  const transporter = emailUtils.createEmailTransporter();

  const invoiceDate = process.env.CUSTOM_DATE || dateUtils.getLastMonthDate();
  const invoiceYear = parseInt(invoiceDate.split("/")[2], 10);
  const amount = process.env.INVOICE_TOTAL_AMOUNT || "";
  const description = process.env.CUSTOM_DESCRIPTION || null;

  const invoiceNumber = await generateNewInvoiceNumber(invoiceYear);
  const content = getPdfContent({ invoiceNumber, invoiceDate, invoiceYear, amount, description });
  const pdfBuffer = await createPDF({ content });
  const mailOptions = emailUtils.getMailOptions({
    invoiceNumber,
    invoiceDate,
    pdfFile: pdfBuffer,
  });

  await transporter.sendMail(mailOptions);
  console.log("Invoice sent successfully");
};

export default sendInvoiceEmail;
