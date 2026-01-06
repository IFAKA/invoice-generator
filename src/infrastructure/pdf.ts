import PDFDocument from "pdfkit";
import type { PdfContentItem } from "../types.js";

interface CreatePdfParams {
  content: PdfContentItem[];
}

const createPDF = async ({ content }: CreatePdfParams): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => buffers.push(chunk));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    doc.on("error", reject);

    content.forEach(({ text, options }) => doc.text(text, options));

    doc.end();
  });
};

export default createPDF;
