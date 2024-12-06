import { useEffect, useRef } from "react";
import Quagga from "quagga";

const Scanner = () => {
  const isScanningRef = useRef(false);

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            facingMode: "environment",
          },
          target: document.querySelector("#scanner"),
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "upc_reader"],
        },
        locate: true,
        frequency: 10,
        halfSample: true,
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result) => {
      if (result && result.codeResult && result.codeResult.code) {
        const barcode = result?.codeResult?.code;
        if (!isScanningRef.current) {
          scanBarcode(barcode);
        }
      }
    });

    const scanBarcode = (id) => {
      isScanningRef.current = true;
      console.log(id);

      setTimeout(() => {
        isScanningRef.current = false;
        console.log("Now You Can Scan Again!");
      }, 3000);
    };
  }, []);
  return (
    <>
      <h1>Scanner</h1>
      <div id="scanner"></div>
    </>
  );
};

export default Scanner;
