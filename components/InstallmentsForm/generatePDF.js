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
  const height = 400;
  const paddingTop = 20;
  const paddingLeft = 20;
  const items = values.installments;

  const numPages = Math.ceil(items / 6);

  let drawedItems = 0;

  for (let i = 0; i < numPages; i++) {
    const page = pdfDoc.addPage();
    page.setRotation(degrees(90));

    if (drawedItems < items) {
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
      });

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
      });

      page.drawImage(pngImage, {
        x: 66 + 10,
        y: paddingLeft + 15 + (height / 2),
        width: 88,
        height: 66,
        rotate: degrees(90),
      });
      page.drawText('A melhor opção para a sua visão!', {
        x: 66,
        y: paddingLeft + 10 + (height / 2),
        size: 7,
        rotate: degrees(90),
      });

      page.drawText('CÓDIGO', {
        x: paddingTop + 20,
        y: paddingLeft + 88 + 55 + (height / 2),
        size: 10,
        rotate: degrees(90),
      });
      page.drawText(values.code, {
        x: paddingTop + 20 + 16,
        y: paddingLeft + 88 + 77 - values.code.length * 4 + (height / 2),
        size: 14,
        rotate: degrees(90),
      });

      drawedItems += 1;
    }

    if (drawedItems < items) {
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
      });

      drawedItems += 1;
    }

    if (drawedItems < items) {
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
      });

      drawedItems += 1;
    }

    if (drawedItems < items) {
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
      });

      drawedItems += 1;
    }

    if (drawedItems < items) {
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
      });

      drawedItems += 1;
    }

    if (drawedItems < items) {
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
      });

      drawedItems += 1;
    }
  }

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
