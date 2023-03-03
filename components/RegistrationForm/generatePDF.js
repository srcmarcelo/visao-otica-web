// import fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';
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
  page.drawText(`Contatos`, {
    x: 20,
    y: 585,
    size: 14,
  });
  page.drawText(`Fixo: ${values.telephone}`, {
    x: 100,
    y: 585,
    size: 14,
  });
  page.drawLine({
    start: { x: 132, y: 582 },
    end: { x: 310, y: 582 },
    thickness: 1,
  });
  page.drawText(`Móvel: ${values.cellphone}`, {
    x: 320,
    y: 585,
    size: 14,
  });
  page.drawLine({
    start: { x: 364, y: 582 },
    end: { x: 575, y: 582 },
    thickness: 1,
  });
  page.drawText(`CPF: ${values.cpf}`, {
    x: 20,
    y: 560,
    size: 14,
  });
  page.drawLine({
    start: { x: 54, y: 557 },
    end: { x: 160, y: 557 },
    thickness: 1,
  });
  page.drawText(`RG: ${values.rg}`, {
    x: 165,
    y: 560,
    size: 14,
  });
  page.drawLine({
    start: { x: 192, y: 557 },
    end: { x: 270, y: 557 },
    thickness: 1,
  });
  page.drawText(`Orgão Exp.: ${values.rg_deliver}`, {
    x: 275,
    y: 560,
    size: 14,
  });
  page.drawLine({
    start: { x: 353, y: 557 },
    end: { x: 420, y: 557 },
    thickness: 1,
  });
  page.drawText(
    `Data Exp.: ${moment(values.rg_deliver_date).format('DD/MM/YYYY')}`,
    {
      x: 425,
      y: 560,
      size: 14,
    }
  );
  page.drawLine({
    start: { x: 493, y: 557 },
    end: { x: 575, y: 557 },
    thickness: 1,
  });
  page.drawText(
    `Data de Nascimento: ${moment(values.birthday).format('DD/MM/YYYY')}`,
    {
      x: 20,
      y: 535,
      size: 14,
    }
  );
  page.drawLine({
    start: { x: 154, y: 532 },
    end: { x: 250, y: 532 },
    thickness: 1,
  });
  page.drawText(`Filiação: ${values.parents}`, {
    x: 20,
    y: 510,
    size: 14,
  });
  page.drawLine({
    start: { x: 74, y: 507 },
    end: { x: 575, y: 507 },
    thickness: 1,
  });
  page.drawText(`Email: ${values.email}`, {
    x: 20,
    y: 485,
    size: 14,
  });
  page.drawLine({
    start: { x: 61, y: 482 },
    end: { x: 575, y: 482 },
    thickness: 1,
  });
  page.drawText(`Instagram: ${values.instagram}`, {
    x: 20,
    y: 460,
    size: 14,
  });
  page.drawLine({
    start: { x: 89, y: 457 },
    end: { x: 280, y: 457 },
    thickness: 1,
  });
  page.drawText(`Facebook: ${values.facebook}`, {
    x: 285,
    y: 460,
    size: 14,
  });
  page.drawLine({
    start: { x: 354, y: 457 },
    end: { x: 575, y: 457 },
    thickness: 1,
  });

  page.drawText(`LONGE:`, {
    x: 185,
    y: 435,
    size: 14,
  });
  page.drawRectangle({
    x: 80,
    y: 360,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 80,
    y: 330,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 130,
    y: 330,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 180,
    y: 330,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 230,
    y: 330,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawText('OD', {
    x: 93,
    y: 370,
    size: 16,
  });
  page.drawText('OE', {
    x: 93,
    y: 340,
    size: 16,
  });
  page.drawText('ESF.', {
    x: 142,
    y: 400,
    size: 12,
  });
  page.drawText('CIL.', {
    x: 192,
    y: 400,
    size: 12,
  });
  page.drawText('EIXO', {
    x: 242,
    y: 400,
    size: 12,
  });

  page.drawText(`PERTO:`, {
    x: 420,
    y: 435,
    size: 14,
  });
  page.drawRectangle({
    x: 315,
    y: 360,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 315,
    y: 330,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 365,
    y: 330,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 415,
    y: 330,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 465,
    y: 330,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawText('OD', {
    x: 328,
    y: 370,
    size: 16,
  });
  page.drawText('OE', {
    x: 328,
    y: 340,
    size: 16,
  });
  page.drawText('ESF.', {
    x: 377,
    y: 400,
    size: 12,
  });
  page.drawText('CIL.', {
    x: 427,
    y: 400,
    size: 12,
  });
  page.drawText('EIXO', {
    x: 477,
    y: 400,
    size: 12,
  });

  page.drawRectangle({
    x: 20,
    y: 30,
    width: 555,
    height: 150,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  // page.drawText(`Forma de pagamento: ${paymentTypes[values.payment]}`, {
  //   x: 150,
  //   y: 100,
  //   size: 20,
  // });

  page.drawText('Ass. do cliente:', {
    x: 12,
    y: 10,
    size: 12,
  });
  page.drawLine({
    start: { x: 95, y: 7 },
    end: { x: 235, y: 7 },
    thickness: 1,
  });
  page.drawText('Ass. da vendedora:', {
    x: 240,
    y: 10,
    size: 12,
  });
  page.drawLine({
    start: { x: 345, y: 7 },
    end: { x: 485, y: 7 },
    thickness: 1,
  });
  page.drawText(
    `Data: ${moment().format('DD/MM/YYYY')}`,
    {
      x: 490,
      y: 10,
      size: 12,
    }
  );
  page.drawLine({
    start: { x: 521, y: 7 },
    end: { x: 585, y: 7 },
    thickness: 1,
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
