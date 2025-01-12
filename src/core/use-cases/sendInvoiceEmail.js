import emailUtils from "../../infrastructure/email.js";
import createPDF from "../../infrastructure/pdf.js";
import generateNewInvoiceNumber from "../../utils/jsonHelper.js";
import getPdfContent from "./getPdfContent.js";

const sendInvoiceEmail = async () => {
  const transporter = emailUtils.createEmailTransporter();
  try {
    const invoiceNumber = await generateNewInvoiceNumber();
    const content = getPdfContent({ invoiceNumber });
    const pdfBuffer = await createPDF({ content });
    const mailOptions = emailUtils.gettMailOptions({
      invoiceNumber,
      pdfFile: pdfBuffer,
    });

    await transporter.sendMail(mailOptions);
    console.log("Invoice sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendInvoiceEmail;
