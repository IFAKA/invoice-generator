const getPdfContent = ({ invoiceNumber, invoiceDate, invoiceYear, amount }) => {
  if (!amount) {
    throw new Error("INVOICE_TOTAL_AMOUNT environment variable is not set");
  }

  return [
    {
      text: `\nFactura N°: ${String(invoiceNumber).padStart(3, "0")}/${invoiceYear}`,
      options: { align: "left" },
    },
    { text: `Fecha: ${invoiceDate}`, options: { align: "left" } },

    {
      text: "\n\n\nDATOS EMISOR:",
      options: { align: "left", underline: true },
    },
    {
      text: "Facundo Arenas\nZ2332143V\nCalle Albacete 22 Piso 4 Depto. D\n28903 Getafe",
      options: { align: "left" },
    },

    { text: "\nDATOS CLIENTE:", options: { align: "left", underline: true } },
    {
      text: "Intersoftware LLC\nL21000252720\n2400 Southeast Veterans Memorial Parkway\n34952, Port St. Lucie, FL, Estados Unidos",
      options: { align: "left" },
    },

    {
      text: "\n\n\n\nDesarrollo de una funcionalidad para una aplicación web",
      options: { continued: true },
    },
    { text: `$${amount}`, options: { align: "right" } },

    {
      text: "\nFactura no sujeta al Impuesto al Valor Añadido del Reino de España, de conformidad con lo establecido en el artículo 69.Uno y 69.Dos de la Ley 37/1992, del 28 de diciembre, de Impuesto al Valor Añadido",
      options: { align: "left", width: 350 },
    },

    { text: `B.I $${amount}`, options: { align: "right" } },
    { text: `\nTOTAL $${amount}`, options: { align: "right" } },

    { text: "\nFORMA DE PAGO:", options: { align: "left", underline: true } },
    {
      text: "Mediante transferencia bancaria a nombre de Facundo Arenas, en la entidad Santander con número de cuenta:",
      options: { align: "left", width: 250 },
    },
    { text: "ES40 0049 4998 2425 1647 7408", options: { align: "left" } },
  ];
};

export default getPdfContent;
