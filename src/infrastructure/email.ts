import nodemailer from "nodemailer";
import type { MailOptionsParams } from "../types.js";

const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });
};

const getMailOptions = ({ invoiceNumber, invoiceDate, pdfFile }: MailOptionsParams) => {
  const [day, month, year] = invoiceDate.split("/");
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const longMonth = monthNames[parseInt(month, 10) - 1];
  const formattedInvoiceNumber = String(invoiceNumber).padStart(3, "0");

  return {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECIPIENT,
    subject: `Factura Mensual ${longMonth} de ${year}`,
    text: `Adjunto encontrarás la factura N°${formattedInvoiceNumber} correspondiente al mes ${month} del año ${year}.`,
    attachments: [
      {
        filename: `${formattedInvoiceNumber}-invoice-${day}-${month}-${year}.pdf`,
        content: pdfFile,
        contentType: "application/pdf" as const,
      },
    ],
  };
};

export default { createEmailTransporter, getMailOptions };
