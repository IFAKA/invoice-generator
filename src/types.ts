export interface InvoiceParams {
  invoiceNumber: number;
  invoiceDate: string;
  invoiceYear: number;
  amount: string;
  description: string | null;
}

export interface PdfContentItem {
  text: string;
  options: PDFKit.Mixins.TextOptions;
}

export interface MailOptionsParams {
  invoiceNumber: number;
  invoiceDate: string;
  pdfFile: Buffer;
}

export interface InvoiceData {
  lastInvoiceNumber: number;
  lastResetYear: number;
}
