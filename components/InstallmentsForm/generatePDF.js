// import fs from 'fs';
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import moment from 'moment';

export default async function CreatePDF(values) {
  const pdfDoc = await PDFDocument.create();
  const pngImageBytes = await fetch('/logo.png').then((res) =>
    res.arrayBuffer()
  );
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  const width = 184;
  const height = 405;
  const paddingTop = 20;
  const paddingLeft = 15;
  const items = values.installments;

  const numPages = Math.ceil(items / 6);

  let drawedItems = 0;

  for (let i = 0; i < numPages; i++) {
    const page = pdfDoc.addPage();
    page.setRotation(degrees(90));

    if (drawedItems < items) {
      //SECTION - rectangle
      page.drawRectangle({
        x: paddingTop,
        y: paddingLeft,
        width: width,
        height: height,
        borderWidth: 1,
        color: rgb(1, 1, 1),
        opacity: 0,
      });
      page.drawLine({
        start: { x: paddingTop, y: paddingLeft + height / 2 },
        end: { x: paddingTop + width, y: paddingLeft + height / 2 },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
        dashArray: [5, 5],
        dashArray: [5, 5],
      });
      //SECTION - rectangle

      //SECTION - first header
      page.drawImage(pngImage, {
        x: 66 + 10,
        y: paddingLeft + 15,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66,
        y: paddingLeft + 10,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20,
        y: paddingLeft + 88 + 55,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16,
        y: paddingLeft + 88 + 77 - values.code.length * 4,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - first header

      //SECTION - first content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22, y: paddingLeft + 5 + 36 },
        end: { x: 70 + 22, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 24 },
        end: { x: 70 + 47, y: paddingLeft + 5 + 50 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45,
          y: paddingLeft + 5 + 53,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 110 },
        end: { x: 70 + 47, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 28 },
        end: { x: 70 + 72, y: paddingLeft + 5 + 105 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70,
        y: paddingLeft + 5 + 107,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 146 },
        end: { x: 70 + 72, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 28 },
        end: { x: 70 + 97, y: paddingLeft + 5 + 95 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95,
        y: paddingLeft + 5 + 98,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 125 },
        end: { x: 70 + 97, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - first content

      //SECTION - first bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175,
        y: paddingLeft + height / 8 - 10,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - first bottom message

      //SECTION - second header
      page.drawImage(pngImage, {
        x: 66 + 10,
        y: paddingLeft + 15 + height / 2,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66,
        y: paddingLeft + 10 + height / 2,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20,
        y: paddingLeft + 88 + 55 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height / 2,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - second header

      //SECTION - second content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22, y: paddingLeft + 5 + 36 + height / 2 },
        end: { x: 70 + 22, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 24 + height / 2 },
        end: { x: 70 + 47, y: paddingLeft + 5 + 50 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45,
          y: paddingLeft + 5 + 53 + height / 2,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 110 + height / 2 },
        end: { x: 70 + 47, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 28 + height / 2 },
        end: { x: 70 + 72, y: paddingLeft + 5 + 105 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70,
        y: paddingLeft + 5 + 107 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 146 + height / 2 },
        end: { x: 70 + 72, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 28 + height / 2 },
        end: { x: 70 + 97, y: paddingLeft + 5 + 95 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95,
        y: paddingLeft + 5 + 98 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 125 + height / 2 },
        end: { x: 70 + 97, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - second content

      //SECTION - second bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175,
        y: paddingLeft + height / 8 - 10 + height / 2,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - second bottom message

      drawedItems += 1;
    }

    if (drawedItems < items) {
      //SECTION - rectangle
      page.drawRectangle({
        x: paddingTop,
        y: paddingLeft + height,
        width: width,
        height: height,
        borderWidth: 1,
        color: rgb(1, 1, 1),
        opacity: 0,
      });
      page.drawLine({
        start: { x: paddingTop, y: paddingLeft + height / 2 + height },
        end: { x: paddingTop + width, y: paddingLeft + height / 2 + height },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
        dashArray: [5, 5],
      });
      //SECTION - rectangle

      //SECTION - first header
      page.drawImage(pngImage, {
        x: 66 + 10,
        y: paddingLeft + 15 + height,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66,
        y: paddingLeft + 10 + height,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20,
        y: paddingLeft + 88 + 55 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - first header

      //SECTION - first content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22, y: paddingLeft + 5 + 36 + height },
        end: { x: 70 + 22, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 24 + height },
        end: { x: 70 + 47, y: paddingLeft + 5 + 50 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45,
          y: paddingLeft + 5 + 53 + height,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 110 + height },
        end: { x: 70 + 47, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 28 + height },
        end: { x: 70 + 72, y: paddingLeft + 5 + 105 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70,
        y: paddingLeft + 5 + 107 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 146 + height },
        end: { x: 70 + 72, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 28 + height },
        end: { x: 70 + 97, y: paddingLeft + 5 + 95 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95,
        y: paddingLeft + 5 + 98 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 125 + height },
        end: { x: 70 + 97, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - first content

      //SECTION - first bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175,
        y: paddingLeft + height / 8 - 10 + height,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - first bottom message

      //SECTION - second header
      page.drawImage(pngImage, {
        x: 66 + 10,
        y: paddingLeft + 15 + height / 2 + height,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66,
        y: paddingLeft + 10 + height / 2 + height,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20,
        y: paddingLeft + 88 + 55 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height / 2 + height,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - second header

      //SECTION - second content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22, y: paddingLeft + 5 + 36 + height / 2 + height },
        end: { x: 70 + 22, y: paddingLeft + 5 + 190 + height / 2 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 24 + height / 2 + height },
        end: { x: 70 + 47, y: paddingLeft + 5 + 50 + height / 2 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45,
          y: paddingLeft + 5 + 53 + height / 2 + height,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47, y: paddingLeft + 5 + 110 + height / 2 + height },
        end: { x: 70 + 47, y: paddingLeft + 5 + 190 + height / 2 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 28 + height / 2 + height },
        end: { x: 70 + 72, y: paddingLeft + 5 + 105 + height / 2 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70,
        y: paddingLeft + 5 + 107 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72, y: paddingLeft + 5 + 146 + height / 2 + height },
        end: { x: 70 + 72, y: paddingLeft + 5 + 190 + height / 2 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 28 + height / 2 + height },
        end: { x: 70 + 97, y: paddingLeft + 5 + 95 + height / 2 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95,
        y: paddingLeft + 5 + 98 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97, y: paddingLeft + 5 + 125 + height / 2 + height },
        end: { x: 70 + 97, y: paddingLeft + 5 + 190 + height / 2 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - second content

      //SECTION - second bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175,
        y: paddingLeft + height / 8 - 10 + height + height / 2,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - second bottom message

      drawedItems += 1;
    }

    if (drawedItems < items) {
      //SECTION - rectangle
      page.drawRectangle({
        x: paddingTop + width,
        y: paddingLeft,
        width: width,
        height: height,
        borderWidth: 1,
        color: rgb(1, 1, 1),
        opacity: 0,
      });
      page.drawLine({
        start: { x: paddingTop + width, y: paddingLeft + height / 2 },
        end: { x: paddingTop + width * 2, y: paddingLeft + height / 2 },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
        dashArray: [5, 5],
      });
      //SECTION - rectangle

      //SECTION - first header
      page.drawImage(pngImage, {
        x: 66 + 10 + width,
        y: paddingLeft + 15,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width,
        y: paddingLeft + 10,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width,
        y: paddingLeft + 88 + 55,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width,
        y: paddingLeft + 88 + 77 - values.code.length * 4,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - first header

      //SECTION - first content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22 + width, y: paddingLeft + 5 + 36 },
        end: { x: 70 + 22 + width, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47 + width, y: paddingLeft + 5 + 24 },
        end: { x: 70 + 47 + width, y: paddingLeft + 5 + 50 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width,
          y: paddingLeft + 5 + 53,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47 + width, y: paddingLeft + 5 + 110 },
        end: { x: 70 + 47 + width, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width, y: paddingLeft + 5 + 28 },
        end: { x: 70 + 72 + width, y: paddingLeft + 5 + 105 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5 + 107,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width, y: paddingLeft + 5 + 146 },
        end: { x: 70 + 72 + width, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width, y: paddingLeft + 5 + 28 },
        end: { x: 70 + 97 + width, y: paddingLeft + 5 + 95 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width,
        y: paddingLeft + 5 + 98,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width, y: paddingLeft + 5 + 125 },
        end: { x: 70 + 97 + width, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - first content

      //SECTION - first bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width,
        y: paddingLeft + height / 8 - 10,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - first bottom message

      //SECTION - second header
      page.drawImage(pngImage, {
        x: 66 + 10 + width,
        y: paddingLeft + 15 + height / 2,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width,
        y: paddingLeft + 10 + height / 2,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width,
        y: paddingLeft + 88 + 55 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height / 2,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - second header

      //SECTION - second content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22 + width, y: paddingLeft + 5 + 36 + height / 2 },
        end: { x: 70 + 22 + width, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47 + width, y: paddingLeft + 5 + 24 + height / 2 },
        end: { x: 70 + 47 + width, y: paddingLeft + 5 + 50 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width,
          y: paddingLeft + 5 + 53 + height / 2,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47 + width, y: paddingLeft + 5 + 110 + height / 2 },
        end: { x: 70 + 47 + width, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width, y: paddingLeft + 5 + 28 + height / 2 },
        end: { x: 70 + 72 + width, y: paddingLeft + 5 + 105 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5 + 107 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width, y: paddingLeft + 5 + 146 + height / 2 },
        end: { x: 70 + 72 + width, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width, y: paddingLeft + 5 + 28 + height / 2 },
        end: { x: 70 + 97 + width, y: paddingLeft + 5 + 95 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width,
        y: paddingLeft + 5 + 98 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width, y: paddingLeft + 5 + 125 + height / 2 },
        end: { x: 70 + 97 + width, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - second content

      //SECTION - second bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width,
        y: paddingLeft + height / 8 - 10 + height / 2,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - second bottom message

      drawedItems += 1;
    }

    if (drawedItems < items) {
      //SECTION - rectangle
      page.drawRectangle({
        x: paddingTop + width,
        y: paddingLeft + height,
        width: width,
        height: height,
        borderWidth: 1,
        color: rgb(1, 1, 1),
        opacity: 0,
      });
      page.drawLine({
        start: { x: paddingTop + width, y: paddingLeft + height / 2 + height },
        end: {
          x: paddingTop + width * 2,
          y: paddingLeft + height / 2 + height,
        },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
        dashArray: [5, 5],
      });
      //SECTION - rectangle

      //SECTION - first header
      page.drawImage(pngImage, {
        x: 66 + 10 + width,
        y: paddingLeft + 15 + height,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width,
        y: paddingLeft + 10 + height,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width,
        y: paddingLeft + 88 + 55 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - first header

      //SECTION - first content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22 + width, y: paddingLeft + 5 + 36 + height },
        end: { x: 70 + 22 + width, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47 + width, y: paddingLeft + 5 + 24 + height },
        end: { x: 70 + 47 + width, y: paddingLeft + 5 + 50 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width,
          y: paddingLeft + 5 + 53 + height,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47 + width, y: paddingLeft + 5 + 110 + height },
        end: { x: 70 + 47 + width, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width, y: paddingLeft + 5 + 28 + height },
        end: { x: 70 + 72 + width, y: paddingLeft + 5 + 105 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5 + 107 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width, y: paddingLeft + 5 + 146 + height },
        end: { x: 70 + 72 + width, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width, y: paddingLeft + 5 + 28 + height },
        end: { x: 70 + 97 + width, y: paddingLeft + 5 + 95 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width,
        y: paddingLeft + 5 + 98 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width, y: paddingLeft + 5 + 125 + height },
        end: { x: 70 + 97 + width, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - first content

      //SECTION - first bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width,
        y: paddingLeft + height / 8 - 10 + height,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - first bottom message

      //SECTION - second header
      page.drawImage(pngImage, {
        x: 66 + 10 + width,
        y: paddingLeft + 15 + height / 2 + height,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width,
        y: paddingLeft + 10 + height / 2 + height,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width,
        y: paddingLeft + 88 + 55 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height / 2 + height,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - second header

      //SECTION - second content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 22 + width,
          y: paddingLeft + 5 + 36 + height / 2 + height,
        },
        end: {
          x: 70 + 22 + width,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 47 + width,
          y: paddingLeft + 5 + 24 + height / 2 + height,
        },
        end: {
          x: 70 + 47 + width,
          y: paddingLeft + 5 + 50 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width,
          y: paddingLeft + 5 + 53 + height / 2 + height,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: {
          x: 70 + 47 + width,
          y: paddingLeft + 5 + 110 + height / 2 + height,
        },
        end: {
          x: 70 + 47 + width,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 72 + width,
          y: paddingLeft + 5 + 28 + height / 2 + height,
        },
        end: {
          x: 70 + 72 + width,
          y: paddingLeft + 5 + 105 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width,
        y: paddingLeft + 5 + 107 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 72 + width,
          y: paddingLeft + 5 + 146 + height / 2 + height,
        },
        end: {
          x: 70 + 72 + width,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 97 + width,
          y: paddingLeft + 5 + 28 + height / 2 + height,
        },
        end: {
          x: 70 + 97 + width,
          y: paddingLeft + 5 + 95 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width,
        y: paddingLeft + 5 + 98 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 97 + width,
          y: paddingLeft + 5 + 125 + height / 2 + height,
        },
        end: {
          x: 70 + 97 + width,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - second content

      //SECTION - second bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width,
        y: paddingLeft + height / 8 - 10 + height + height / 2,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - second bottom message

      drawedItems += 1;
    }

    if (drawedItems < items) {
      //SECTION - rectangle
      page.drawRectangle({
        x: paddingTop + width * 2,
        y: paddingLeft,
        width: width,
        height: height,
        borderWidth: 1,
        color: rgb(1, 1, 1),
        opacity: 0,
      });
      page.drawLine({
        start: { x: paddingTop + width * 2, y: paddingLeft + height / 2 },
        end: { x: paddingTop + width * 3, y: paddingLeft + height / 2 },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
        dashArray: [5, 5],
      });
      //SECTION - rectangle

      //SECTION - first header
      page.drawImage(pngImage, {
        x: 66 + 10 + width * 2,
        y: paddingLeft + 15,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width * 2,
        y: paddingLeft + 10,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width * 2,
        y: paddingLeft + 88 + 55,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width * 2,
        y: paddingLeft + 88 + 77 - values.code.length * 4,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - first header

      //SECTION - first content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width * 2,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22 + width * 2, y: paddingLeft + 5 + 36 },
        end: { x: 70 + 22 + width * 2, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width * 2,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 24 },
        end: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 50 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width * 2,
          y: paddingLeft + 5 + 53,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 110 },
        end: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 28 },
        end: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 105 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5 + 107,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 146 },
        end: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 28 },
        end: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 95 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5 + 98,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 125 },
        end: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 190 },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - first content

      //SECTION - first bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width * 2,
        y: paddingLeft + height / 8 - 10,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - first bottom message

      //SECTION - second header
      page.drawImage(pngImage, {
        x: 66 + 10 + width * 2,
        y: paddingLeft + 15 + height / 2,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width * 2,
        y: paddingLeft + 10 + height / 2,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width * 2,
        y: paddingLeft + 88 + 55 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width * 2,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height / 2,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - second header

      //SECTION - second content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width * 2,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22 + width * 2, y: paddingLeft + 5 + 36 + height / 2 },
        end: { x: 70 + 22 + width * 2, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width * 2,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 24 + height / 2 },
        end: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 50 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width * 2,
          y: paddingLeft + 5 + 53 + height / 2,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: {
          x: 70 + 47 + width * 2,
          y: paddingLeft + 5 + 110 + height / 2,
        },
        end: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 28 + height / 2 },
        end: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 105 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5 + 107 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 72 + width * 2,
          y: paddingLeft + 5 + 146 + height / 2,
        },
        end: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 28 + height / 2 },
        end: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 95 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5 + 98 + height / 2,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 97 + width * 2,
          y: paddingLeft + 5 + 125 + height / 2,
        },
        end: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 190 + height / 2 },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - second content

      //SECTION - second bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width * 2,
        y: paddingLeft + height / 8 - 10 + height / 2,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - second bottom message

      drawedItems += 1;
    }

    if (drawedItems < items) {
      //SECTION - rectangle
      page.drawRectangle({
        x: paddingTop + width * 2,
        y: paddingLeft + height,
        width: width,
        height: height,
        borderWidth: 1,
        color: rgb(1, 1, 1),
        opacity: 0,
      });
      page.drawLine({
        start: {
          x: paddingTop + width * 2,
          y: paddingLeft + height / 2 + height,
        },
        end: {
          x: paddingTop + width * 3,
          y: paddingLeft + height / 2 + height,
        },
        thickness: 1,
        color: rgb(0.5, 0.5, 0.5),
        dashArray: [5, 5],
      });
      //SECTION - rectangle

      //SECTION - first header
      page.drawImage(pngImage, {
        x: 66 + 10 + width * 2,
        y: paddingLeft + 15 + height,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width * 2,
        y: paddingLeft + 10,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width * 2,
        y: paddingLeft + 88 + 55 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width * 2,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - first header

      //SECTION - first content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width * 2,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 22 + width * 2, y: paddingLeft + 5 + 36 + height },
        end: { x: 70 + 22 + width * 2, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width * 2,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 24 + height },
        end: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 50 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width * 2,
          y: paddingLeft + 5 + 53 + height,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 110 + height },
        end: { x: 70 + 47 + width * 2, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 28 + height },
        end: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 105 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5 + 107 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 146 + height },
        end: { x: 70 + 72 + width * 2, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 28 + height },
        end: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 95 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5 + 98 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 125 + height },
        end: { x: 70 + 97 + width * 2, y: paddingLeft + 5 + 190 + height },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - first content

      //SECTION - first bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width * 2,
        y: paddingLeft + height / 8 - 10 + height,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - first bottom message

      //SECTION - second header
      page.drawImage(pngImage, {
        x: 66 + 10 + width * 2,
        y: paddingLeft + 15 + height / 2 + height,
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66 + width * 2,
        y: paddingLeft + 10 + height / 2 + height,
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20 + width * 2,
        y: paddingLeft + 88 + 55 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16 + width * 2,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + height / 2 + height,
        size: 14,
        rotate: degrees(90),
        color: rgb(0.95, 0.1, 0.1),
      });
      //SECTION - second header

      //SECTION - second content
      page.drawText(`Cliente: ${values.costumer}`, {
        x: 70 + 20 + width * 2,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 22 + width * 2,
          y: paddingLeft + 5 + 36 + height / 2 + height,
        },
        end: {
          x: 70 + 22 + width * 2,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Loja:   0${values.store}`, {
        x: 70 + 45 + width * 2,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 47 + width * 2,
          y: paddingLeft + 5 + 24 + height / 2 + height,
        },
        end: {
          x: 70 + 47 + width * 2,
          y: paddingLeft + 5 + 50 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(
        `Vencimento:     ${moment(values.date)
          .add(drawedItems, 'months')
          .format('DD/MM/YYYY')}`,
        {
          x: 70 + 45 + width * 2,
          y: paddingLeft + 5 + 53 + height / 2 + height,
          size: 10,
          rotate: degrees(90),
        }
      );
      page.drawLine({
        start: {
          x: 70 + 47 + width * 2,
          y: paddingLeft + 5 + 110 + height / 2 + height,
        },
        end: {
          x: 70 + 47 + width * 2,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Valor:   R$ ${parseFloat(values.value).toFixed(2)}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 72 + width * 2,
          y: paddingLeft + 5 + 28 + height / 2 + height,
        },
        end: {
          x: 70 + 72 + width * 2,
          y: paddingLeft + 5 + 105 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Parcela:  ${drawedItems + 1} de ${values.installments}`, {
        x: 70 + 70 + width * 2,
        y: paddingLeft + 5 + 107 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 72 + width * 2,
          y: paddingLeft + 5 + 146 + height / 2 + height,
        },
        end: {
          x: 70 + 72 + width * 2,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText('Juros:', {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 97 + width * 2,
          y: paddingLeft + 5 + 28 + height / 2 + height,
        },
        end: {
          x: 70 + 97 + width * 2,
          y: paddingLeft + 5 + 95 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      page.drawText(`Total:`, {
        x: 70 + 95 + width * 2,
        y: paddingLeft + 5 + 98 + height / 2 + height,
        size: 10,
        rotate: degrees(90),
      });
      page.drawLine({
        start: {
          x: 70 + 97 + width * 2,
          y: paddingLeft + 5 + 125 + height / 2 + height,
        },
        end: {
          x: 70 + 97 + width * 2,
          y: paddingLeft + 5 + 190 + height / 2 + height,
        },
        thickness: 1,
        rotate: degrees(90),
      });
      //SECTION - second content

      //SECTION - second bottom message
      page.drawText('Gratos pela preferência', {
        x: paddingTop + 175 + width * 2,
        y: paddingLeft + height / 8 - 10 + height + height / 2,
        size: 12,
        rotate: degrees(90),
      });
      //SECTION - second bottom message

      drawedItems += 1;
    }
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
