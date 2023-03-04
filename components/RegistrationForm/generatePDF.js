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
    y: 705,
    size: 14,
  });
  page.drawLine({
    start: { x: 70, y: 702 },
    end: { x: 575, y: 702 },
    thickness: 1,
  });
  page.drawText(`Endereço: ${values.address}`, {
    x: 20,
    y: 680,
    size: 14,
  });
  page.drawLine({
    start: { x: 87, y: 677 },
    end: { x: 380, y: 677 },
    thickness: 1,
  });
  page.drawText(`Bairro: ${values.neighborhood}`, {
    x: 385,
    y: 680,
    size: 14,
  });
  page.drawLine({
    start: { x: 428, y: 677 },
    end: { x: 575, y: 677 },
    thickness: 1,
  });
  page.drawText(`CEP: ${values.adress_code}`, {
    x: 20,
    y: 655,
    size: 14,
  });
  page.drawLine({
    start: { x: 55, y: 652 },
    end: { x: 130, y: 652 },
    thickness: 1,
  });
  page.drawText(`Cidade: ${values.city}`, {
    x: 135,
    y: 655,
    size: 14,
  });
  page.drawLine({
    start: { x: 185, y: 652 },
    end: { x: 380, y: 652 },
    thickness: 1,
  });
  page.drawText(`Estado: ${values.state}`, {
    x: 385,
    y: 655,
    size: 14,
  });
  page.drawLine({
    start: { x: 435, y: 652 },
    end: { x: 575, y: 652 },
    thickness: 1,
  });
  page.drawText(`Ponto de referência: ${values.ref_site}`, {
    x: 20,
    y: 630,
    size: 14,
  });
  page.drawLine({
    start: { x: 149, y: 627 },
    end: { x: 575, y: 627 },
    thickness: 1,
  });
  page.drawText(`Contatos`, {
    x: 20,
    y: 605,
    size: 14,
  });
  page.drawText(`Fixo: ${values.telephone}`, {
    x: 100,
    y: 605,
    size: 14,
  });
  page.drawLine({
    start: { x: 132, y: 602 },
    end: { x: 310, y: 602 },
    thickness: 1,
  });
  page.drawText(`Móvel: ${values.cellphone}`, {
    x: 320,
    y: 605,
    size: 14,
  });
  page.drawLine({
    start: { x: 364, y: 602 },
    end: { x: 575, y: 602 },
    thickness: 1,
  });
  page.drawText(`CPF: ${values.cpf}`, {
    x: 20,
    y: 580,
    size: 14,
  });
  page.drawLine({
    start: { x: 54, y: 577 },
    end: { x: 160, y: 577 },
    thickness: 1,
  });
  page.drawText(`RG: ${values.rg}`, {
    x: 165,
    y: 580,
    size: 14,
  });
  page.drawLine({
    start: { x: 192, y: 577 },
    end: { x: 270, y: 577 },
    thickness: 1,
  });
  page.drawText(`Orgão Exp.: ${values.rg_deliver}`, {
    x: 275,
    y: 580,
    size: 14,
  });
  page.drawLine({
    start: { x: 353, y: 577 },
    end: { x: 420, y: 577 },
    thickness: 1,
  });
  page.drawText(
    `Data Exp.: ${moment(values.rg_deliver_date).format('DD/MM/YYYY')}`,
    {
      x: 425,
      y: 580,
      size: 14,
    }
  );
  page.drawLine({
    start: { x: 493, y: 577 },
    end: { x: 575, y: 577 },
    thickness: 1,
  });
  page.drawText(
    `Data de Nascimento: ${moment(values.birthday).format('DD/MM/YYYY')}`,
    {
      x: 20,
      y: 555,
      size: 14,
    }
  );
  page.drawLine({
    start: { x: 154, y: 552 },
    end: { x: 250, y: 552 },
    thickness: 1,
  });
  page.drawText(`Filiação: ${values.parents}`, {
    x: 20,
    y: 530,
    size: 14,
  });
  page.drawLine({
    start: { x: 74, y: 527 },
    end: { x: 575, y: 527 },
    thickness: 1,
  });
  page.drawText(`Email: ${values.email}`, {
    x: 20,
    y: 505,
    size: 14,
  });
  page.drawLine({
    start: { x: 61, y: 502 },
    end: { x: 575, y: 502 },
    thickness: 1,
  });
  page.drawText(`Instagram: ${values.instagram}`, {
    x: 20,
    y: 480,
    size: 14,
  });
  page.drawLine({
    start: { x: 89, y: 477 },
    end: { x: 280, y: 477 },
    thickness: 1,
  });
  page.drawText(`Facebook: ${values.facebook}`, {
    x: 285,
    y: 480,
    size: 14,
  });
  page.drawLine({
    start: { x: 354, y: 477 },
    end: { x: 575, y: 477 },
    thickness: 1,
  });

  page.drawText(`LONGE:`, {
    x: 185,
    y: 450,
    size: 14,
  });
  page.drawRectangle({
    x: 80,
    y: 385,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 80,
    y: 355,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 130,
    y: 355,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 180,
    y: 355,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 230,
    y: 355,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawText('OD', {
    x: 93,
    y: 395,
    size: 16,
  });
  page.drawText('OE', {
    x: 93,
    y: 365,
    size: 16,
  });
  page.drawText('ESF.', {
    x: 142,
    y: 425,
    size: 12,
  });
  page.drawText('CIL.', {
    x: 192,
    y: 425,
    size: 12,
  });
  page.drawText('EIXO', {
    x: 242,
    y: 425,
    size: 12,
  });

  page.drawText(values.away_od_esf ? values.away_od_esf : '0.00', {
    x: 142,
    y: 395,
    size: 12,
  });
  page.drawText(values.away_od_cil ? values.away_od_cil : '0.00', {
    x: 192,
    y: 395,
    size: 12,
  });
  page.drawText(values.away_od_x ? values.away_od_x : '0.00', {
    x: 242,
    y: 395,
    size: 12,
  });
  page.drawText(values.away_ed_esf ? values.away_ed_esf : '0.00', {
    x: 142,
    y: 365,
    size: 12,
  });
  page.drawText(values.away_ed_cil ? values.away_ed_cil : '0.00', {
    x: 192,
    y: 365,
    size: 12,
  });
  page.drawText(values.away_ed_x ? values.away_ed_x : '0.00', {
    x: 242,
    y: 365,
    size: 12,
  });

  page.drawText(`PERTO:`, {
    x: 420,
    y: 450,
    size: 14,
  });
  page.drawRectangle({
    x: 315,
    y: 385,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 315,
    y: 355,
    width: 200,
    height: 30,
    borderWidth: 1,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({
    x: 365,
    y: 355,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 415,
    y: 355,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawRectangle({
    x: 465,
    y: 355,
    width: 50,
    height: 90,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });
  page.drawText('OD', {
    x: 328,
    y: 395,
    size: 16,
  });
  page.drawText('OE', {
    x: 328,
    y: 365,
    size: 16,
  });
  page.drawText('ESF.', {
    x: 377,
    y: 425,
    size: 12,
  });
  page.drawText('CIL.', {
    x: 427,
    y: 425,
    size: 12,
  });
  page.drawText('EIXO', {
    x: 477,
    y: 425,
    size: 12,
  });

  page.drawText(values.close_od_esf ? values.close_od_esf : '0.00', {
    x: 377,
    y: 395,
    size: 12,
  });
  page.drawText(values.close_od_cil ? values.close_od_cil : '0.00', {
    x: 427,
    y: 395,
    size: 12,
  });
  page.drawText(values.close_od_x ? values.close_od_x : '0.00', {
    x: 477,
    y: 395,
    size: 12,
  });
  page.drawText(values.close_ed_esf ? values.close_ed_esf : '0.00', {
    x: 377,
    y: 365,
    size: 12,
  });
  page.drawText(values.close_ed_cil ? values.close_ed_cil : '0.00', {
    x: 427,
    y: 365,
    size: 12,
  });
  page.drawText(values.close_ed_x ? values.close_ed_x : '0.00', {
    x: 477,
    y: 365,
    size: 12,
  });

  page.drawText('Informaçõe Adicionais:', {
    x: 20,
    y: 330,
    size: 14,
  });
  page.drawText(`${values.more_information ? values.more_information : ''}`, {
    x: 20,
    y: 315,
    size: 11,
  });
  page.drawLine({
    start: { x: 20, y: 312 },
    end: { x: 575, y: 312 },
    thickness: 1,
  });

  page.drawText('DADOS DA VENDA', {
    x: 230,
    y: 285,
    size: 14,
  });
  page.drawText(`Valor: ${values.value}`, {
    x: 20,
    y: 265,
    size: 14,
  });
  page.drawLine({
    start: { x: 59, y: 262 },
    end: { x: 160, y: 262 },
    thickness: 1,
  });
  page.drawText(`Forma de pagamento: ${paymentTypes[values.payment]}`, {
    x: 20,
    y: 240,
    size: 14,
  });
  page.drawLine({
    start: { x: 159, y: 237 },
    end: { x: 230, y: 237 },
    thickness: 1,
  });

  if(values.first_time === 1) {
    page.drawText(`Indicado por ${values.recommended}.`, {
      x: 20,
      y: 215,
      size: 14,
    });
  } else {
    page.drawText(`Primeiro cliente.`, {
      x: 20,
      y: 215,
      size: 14,
    });
  }

  page.drawRectangle({
    x: 20,
    y: 45,
    width: 555,
    height: 150,
    borderWidth: 1,
    color: rgb(1, 1, 1),
    opacity: 0,
  });

  page.drawText('Ass. do cliente:', {
    x: 12,
    y: 25,
    size: 12,
  });
  page.drawLine({
    start: { x: 95, y: 22 },
    end: { x: 235, y: 22 },
    thickness: 1,
  });
  page.drawText('Ass. da vendedora:', {
    x: 240,
    y: 25,
    size: 12,
  });
  page.drawLine({
    start: { x: 345, y: 22 },
    end: { x: 485, y: 22 },
    thickness: 1,
  });
  page.drawText(
    `Data: ${moment().format('DD/MM/YYYY')}`,
    {
      x: 490,
      y: 25,
      size: 12,
    }
  );
  page.drawLine({
    start: { x: 521, y: 22 },
    end: { x: 585, y: 22 },
    thickness: 1,
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
