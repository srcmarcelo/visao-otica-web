// import fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';

export default async function CreatePDF(values) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const jpgImageBytes = await fetch('/logo.png').then((res) =>
    res.arrayBuffer()
  );
  const jpgImage = await pdfDoc.embedPng(jpgImageBytes);

  const paymentTypes = {
    1: 'À vista',
    2: 'Parcelado',
    3: 'Cartão',
    4: 'Crediário',
  }

  page.drawImage(jpgImage, {
    x: 225,
    y: 720,
    width: 150,
    height: 100,
  });
  page.drawText('A melhor opcao para sua visao!', {
    x: 165,
    y: 680,
    size: 20,
  });
  page.drawText(`Cliente: ${values.costumer}`, {
    x: 150,
    y: 600,
    size: 20,
  });
  page.drawText(`Endereço: ${values.address}`, {
    x: 150,
    y: 500,
    size: 20,
  });
  page.drawText(`Contato: ${values.contact}`, {
    x: 150,
    y: 400,
    size: 20,
  });
  page.drawText(`Email: ${values.email}`, {
    x: 150,
    y: 300,
    size: 20,
  });
  page.drawText(`Valor: ${values.value}`, {
    x: 150,
    y: 200,
    size: 20,
  });
  page.drawText(`Forma de pagamento: ${paymentTypes[values.payment]}`, {
    x: 150,
    y: 100,
    size: 20,
  });
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
