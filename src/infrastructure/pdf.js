import PDFDocument from "pdfkit";

const createPDF = async ({ content }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
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
