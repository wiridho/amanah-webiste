import { PDFDocument, rgb } from "pdf-lib";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const PdfKontrakPinjaman = ({ data }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  const { profile } = useSelector((state) => state.borrower);

  const { email, name, phoneNumber } = profile;

  let defaultUrlPdf =
    process.env.PUBLIC_URL + "/contract-borrower/contractBorrower.pdf";

  const replacePlaceholder = async () => {
    let templatePdfBytes = await fetch(defaultUrlPdf).then((res) =>
      res.arrayBuffer()
    );
    let pdfDoc = await PDFDocument.load(templatePdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const secondPage = pages[1];
    const namePlaceholder = "<<name>>";
    const emailPlaceholder = "<<email>>";
    const phoneNumberPlaceholder = "<<phoneNumber>>";
    const amountPlaceholder = "<<amount>>";
    const tenorPlaceholder = "<<tenor>>";
    const yieldReturnPlaceholder = "<<yieldReturn>>";

    const { height } = firstPage.getSize();
    firstPage.drawText(name.replace(namePlaceholder, name), {
      x: 72,
      y: height - 100,

      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(email.replace(emailPlaceholder, email), {
      x: 72,
      y: height - 115,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(
      phoneNumber.replace(phoneNumberPlaceholder, phoneNumber),
      {
        x: 72,
        y: height - 130,
        size: 12,
        color: rgb(0, 0, 0),
      }
    );
    firstPage.drawText(data?.amount.replace(amountPlaceholder, data?.amount), {
      x: 110,
      y: height - 562,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(data?.tenor.replace(tenorPlaceholder, data?.tenor), {
      x: 330,
      y: height - 623,
      size: 12,
      color: rgb(0, 0, 0),
    });
    secondPage.drawText(
      data?.yieldReturn.replace(yieldReturnPlaceholder, data?.yieldReturn),
      {
        x: 110,
        y: height - 98,
        size: 12,
        color: rgb(0, 0, 0),
      }
    );
    secondPage.drawText(name.replace(namePlaceholder, name), {
      x: 72,
      y: height - 515,
      size: 12,
      color: rgb(0, 0, 0),
    });
    let updatedPdfBytes = await pdfDoc.save();
    let updatePdfUrl = URL.createObjectURL(
      new Blob([updatedPdfBytes], { type: "application/pdf" })
    );
    setPdfUrl(updatePdfUrl);
  };

  useEffect(() => {
    replacePlaceholder();
  }, [name]);

  return (
    <iframe
      src={pdfUrl}
      typeof="application/pdf"
      width={"100%"}
      height={"90%"}
    />
  );
};

export default PdfKontrakPinjaman;
