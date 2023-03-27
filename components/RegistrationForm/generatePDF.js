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
  page.drawText(`Instagram: ${values.instagram ? values.instagram : ''}`, {
    x: 20,
    y: 480,
    size: 14,
  });
  page.drawLine({
    start: { x: 89, y: 477 },
    end: { x: 280, y: 477 },
    thickness: 1,
  });
  page.drawText(`Facebook: ${values.facebook ? values.facebook : ''}`, {
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
  page.drawText(values.away_oe_esf ? values.away_oe_esf : '0.00', {
    x: 142,
    y: 365,
    size: 12,
  });
  page.drawText(values.away_oe_cil ? values.away_oe_cil : '0.00', {
    x: 192,
    y: 365,
    size: 12,
  });
  page.drawText(values.away_oe_x ? values.away_oe_x : '0.00', {
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
  page.drawText(values.close_oe_esf ? values.close_oe_esf : '0.00', {
    x: 377,
    y: 365,
    size: 12,
  });
  page.drawText(values.close_oe_cil ? values.close_oe_cil : '0.00', {
    x: 427,
    y: 365,
    size: 12,
  });
  page.drawText(values.close_oe_x ? values.close_oe_x : '0.00', {
    x: 477,
    y: 365,
    size: 12,
  });

  page.drawText(`Adição:   ${values.add ? 'NÃO' : values.add_value}`, {
    x: 20,
    y: 325,
    size: 14,
  });
  page.drawLine({
    start: { x: 70, y: 322 },
    end: { x: 200, y: 322 },
    thickness: 1,
  });

  page.drawText('DADOS DA VENDA', {
    x: 230,
    y: 285,
    size: 14,
  });
  page.drawText(`Valor: R$ ${parseFloat(values.value).toFixed(2)}`, {
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
      y: 220,
      size: 14,
    });
  } else if (values.first_time === 0) {
    page.drawText(`Primeiro cliente.`, {
      x: 20,
      y: 220,
      size: 14,
    });
  }

  page.drawText('Informações Adicionais:', {
    x: 20,
    y: 195,
    size: 14,
  });
  page.drawText(`${values.more_information ? values.more_information.slice(0, 75) : ''}`, {
    x: 20,
    y: 175,
    size: 11,
  });
  page.drawLine({
    start: { x: 20, y: 172 },
    end: { x: 575, y: 172 },
    thickness: 1,
  });
  page.drawText(`${values.more_information?.length > 75 ? values.more_information.slice(75, 150) : ''}`, {
    x: 20,
    y: 155,
    size: 11,
  });
  page.drawLine({
    start: { x: 20, y: 152 },
    end: { x: 575, y: 152 },
    thickness: 1,
  });
  page.drawText(`${values.more_information?.length > 150 ? values.more_information.slice(150) : ''}`, {
    x: 20,
    y: 135,
    size: 11,
  });
  page.drawLine({
    start: { x: 20, y: 132 },
    end: { x: 575, y: 132 },
    thickness: 1,
  });

  page.drawText('Ass. do cliente:', {
    x: 20,
    y: 100,
    size: 13,
  });
  page.drawLine({
    start: { x: 112, y: 97 },
    end: { x: 575, y: 97 },
    thickness: 1,
  });
  page.drawText('Ass. da vendedora:', {
    x: 20,
    y: 65,
    size: 13,
  });
  page.drawLine({
    start: { x: 135, y: 63 },
    end: { x: 575, y: 63 },
    thickness: 1,
  });
  page.drawText(
    `Data: ${moment().format('DD/MM/YYYY')}`,
    {
      x: 20,
      y: 30,
      size: 13,
    }
  );
  page.drawLine({
    start: { x: 53, y: 27 },
    end: { x: 130, y: 27 },
    thickness: 1,
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
