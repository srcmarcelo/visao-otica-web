// import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import moment from 'moment';

export default async function CreatePDF(values) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const pngImageBytes = await fetch('/logo.png').then((res) =>
    res.arrayBuffer()
  );
  const pngImage = await pdfDoc.embedPng(pngImageBytes);

  console.log('values:', values);

  const paymentTypes = {
    0: 'À vista',
    1: 'Cartão',
    2: 'Crediário',
  };

  page.drawImage(pngImage, {
    x: 115,
    y: 750,
    width: 132,
    height: 99,
  });
  page.drawText('A melhor opção para a sua visão!', {
    x: 50,
    y: 760,
    size: 18,
  });
  page.drawText('Ficha Cadastral de Clientes', {
    x: 70,
    y: 735,
    size: 18,
  });
  page.drawLine({
    start: { x: 70, y: 730 },
    end: { x: 292, y: 730 },
    thickness: 1,
  });
  page.drawText(`Loja 0${values.store + 1}`, {
    x: 450,
    y: 800,
    size: 18,
  });
  page.drawText(`Código - ${values.code}`, {
    x: 425,
    y: 780,
    size: 16,
  });
  page.drawText(`Vendedora: ${values.seller}`, {
    x: 400,
    y: 750,
    size: 14,
  });
  page.drawText(`Data da compra: ${moment(values.date).format('DD/MM/YYYY')}`, {
    x: 400,
    y: 730,
    size: 13,
  });
  page.drawText(`Cliente: ${values.costumer}`, {
    x: 20,
    y: 685,
    size: 14,
  });
  page.drawLine({
    start: { x: 70, y: 682 },
    end: { x: 575, y: 682 },
    thickness: 1,
  });
  page.drawText(`Endereço: ${values.address}`, {
    x: 20,
    y: 660,
    size: 14,
  });
  page.drawLine({
    start: { x: 87, y: 657 },
    end: { x: 380, y: 657 },
    thickness: 1,
  });
  page.drawText(`Bairro: ${values.neighborhood}`, {
    x: 385,
    y: 660,
    size: 14,
  });
  page.drawLine({
    start: { x: 428, y: 657 },
    end: { x: 575, y: 657 },
    thickness: 1,
  });
  page.drawText(`CEP: ${values.adress_code}`, {
    x: 20,
    y: 635,
    size: 14,
  });
  page.drawLine({
    start: { x: 55, y: 632 },
    end: { x: 130, y: 632 },
    thickness: 1,
  });
  page.drawText(`Cidade: ${values.city}`, {
    x: 135,
    y: 635,
    size: 14,
  });
  page.drawLine({
    start: { x: 185, y: 632 },
    end: { x: 380, y: 632 },
    thickness: 1,
  });
  page.drawText(`Estado: ${values.state}`, {
    x: 385,
    y: 635,
    size: 14,
  });
  page.drawLine({
    start: { x: 435, y: 632 },
    end: { x: 575, y: 632 },
    thickness: 1,
  });
  page.drawText(`Ponto de referência: ${values.ref_site}`, {
    x: 20,
    y: 610,
    size: 14,
  });
  page.drawLine({
    start: { x: 149, y: 607 },
    end: { x: 575, y: 607 },
    thickness: 1,
  });
  // page.drawText(`Forma de pagamento: ${paymentTypes[values.payment]}`, {
  //   x: 150,
  //   y: 100,
  //   size: 20,
  // });
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
