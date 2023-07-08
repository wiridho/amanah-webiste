import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDocument, PDFPage, PDFText } from "pdf-lib";
import { PDFViewer, Document, Page, Text } from "@react-pdf/renderer";
import { useEffect } from "react";
import { Button, Message } from "../../components/atom";
import { useDispatch, useSelector } from "react-redux";
import { postBorrowersLoan } from "../../service/Borrower/borrower";
import { setMessage } from "../../store/reducer/Borrower/BorrowerReducer";

const PreviewKontrakPeminjaman = () => {
  const { state } = useLocation();
  const { accessToken } = useSelector((state) => state.auth);
  const { success, message } = useSelector((state) => state.borrower);

  const {
    amount,
    borrowingCategory,
    paymentSchema,
    purpose,
    tenor,
    yieldReturn,
  } = state;

  console.log(state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleOnClick = () => {
    navigate("/borrower/konfirmasi-pinjaman", {
      state: state,
    });
  };

  return (
    <div>
      <span>Kontrak</span>
      <Message
        status={success}
        message={message}
        visible={message !== null ? true : false}
        onClose={() => dispatch(setMessage(null))}
      />
      <PDFViewer>
        <Document>
          <Page>
            <Text>Preview PDF</Text>
            <Text>{profile?.name}</Text>
          </Page>
        </Document>
      </PDFViewer>
      <Button
        onClick={handleOnClick}
        type={"button"}
        className={`px-4 py-2 bg-blue-500 text-white
      `}
      >
        Konfirmasi Pinjaman
      </Button>
    </div>
  );
};

export default PreviewKontrakPeminjaman;
