import nodemailer from "nodemailer";
import dateUtils from "../utils/date.js";

// Create an email transporter using Gmail SMTP
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });
};

const gettMailOptions = ({ invoiceNumber, pdfFile }) => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = now.getMonth() + 1;
  const longMonth = dateUtils.capitalize(
    now.toLocaleString("es-ES", { month: "long" })
  );
  const twoDigitMonth = String(month).padStart(2, "0");
  const year = now.getFullYear();
  const formatedInvoiceNumber = String(invoiceNumber).padStart(3, "0");

  const emailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECIPIENT,
    subject: `Factura Mensual ${longMonth} de ${year}`,
    text: `Adjunto encontrarás la factura N°${formatedInvoiceNumber} correspondiente al mes ${month} del año ${year}.`,
    attachments: [
      {
        filename: `${formatedInvoiceNumber}-invoice-${day}-${twoDigitMonth}-${year}.pdf`,
        content: pdfFile,
        contentType: "application/pdf",
      },
    ],
  };

  return emailOptions;
};

export default { createEmailTransporter, gettMailOptions };
