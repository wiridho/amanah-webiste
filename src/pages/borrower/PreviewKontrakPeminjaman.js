import React from "react";
import { useLocation } from "react-router-dom";
import { PDFDocument, PDFPage, PDFText } from "pdf-lib";
import { PDFViewer, Document, Page, Text } from "@react-pdf/renderer";
import { useEffect } from "react";

const PreviewKontrakPeminjaman = () => {
  const { state } = useLocation();
  const {
    amount,
    borrowingCategory,
    paymentSchema,
    purpose,
    tenor,
    yieldReturn,
  } = state;

  const profile = {
    email: "tambunanwiridho@gmail.com",
    name: "Wiridho",
    phoneNumber: "082298509325",
  };

  const reactExistingPdf = async () => {
    const response = await fetch(
      "../../assets/contractBorrower/contractBorrower.pdf"
    );
    const existingPdfByte = await response.arrayBuffer();
    return existingPdfByte;
  };

  const editPdf = async () => {
    const pdfDoc = await PDFDocument.load(await reactExistingPdf());
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const textContent = firstPage.getTextContent();
    const texts = await textContent.items;

    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      if (text.text === "<<Name>>") {
        text.text = profile?.name;
      }
    }

    const modifyPdf = await pdfDoc.save();
    return modifyPdf;
  };

  // useEffect(() => {
  //   (async () => {
  //     console.log(await editPdf());
  //   })();
  // }, []);

  return (
    <div>
      <span>Kontrak</span>
      <PDFViewer>
        <Document>
          <Page>
            <Text>Preview PDF</Text>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PreviewKontrakPeminjaman;
