import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import jsPDF from "jspdf";
import { Loader2 } from "lucide-react";
import { supabase } from "../utils/supabaseClient";

function PadSignature({
  courseName,
  userFirstName,
  userLastName,
  userId,
  courseId,
  handleSignatureStatus,
}) {
  const signatureCanvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    signatureCanvasRef.current.clear();
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const dataUrl = signatureCanvasRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      const doc = new jsPDF({
        unit: "px", // Utiliser les pixels comme unité
        format: [700, 1000],
        orientation: "p", // Dimensions spécifiques du PDF
      });

      const templateUrl = "/templateCertificate3.png";
      const img = new Image();
      img.src = templateUrl;

      // Wait for the image to load to get its dimensions
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgWidth = img.width;
      const imgHeight = img.height;
      console.log(imgWidth, imgHeight);

      // Add the template image to the PDF with the correct dimensions
      doc.addImage(img, "png", 0, 0, imgWidth, imgHeight);

      doc.setFontSize(35);
      doc.setFont("helvetica", "bold");
      let text1 = "L'élève";
      if (userFirstName) {
        text1 += ` ${userFirstName}`;
      }
      if (userLastName) {
        text1 += ` ${userLastName}`;
      }
      const text2 = `a complété le cours ${courseName}`;

      // Split text to fit within the width of the PDF
      const maxWidth = 600; // Adjust this value as needed
      const splitText1 = doc.splitTextToSize(text1, maxWidth);
      const splitText2 = doc.splitTextToSize(text2, maxWidth);

      // Calculate the y position for the text
      const text1Y = 300;
      const text2Y = text1Y + splitText1.length * 40; // Adjust the spacing as needed

      // Add the split text to the PDF
      doc.text(splitText1, imgWidth / 2, text1Y, {
        align: "center",
      });
      doc.text(splitText2, imgWidth / 2, text2Y, {
        align: "center",
      });

      const signatureImageData = await fetch(dataUrl).then((res) => res.blob());
      const signatureImageUrl = URL.createObjectURL(signatureImageData);
      doc.addImage(signatureImageUrl, "PNG", 500, 800, 120, 60);

      // Add the text "Fait le" and the current date below the signature
      doc.setFontSize(29);
      doc.setFont("helvetica", "normal");
      const currentDate = new Date().toLocaleDateString("fr-FR");
      doc.text(`Fait le ${currentDate}`, 500, 750, { align: "center" });

      // Upload the document to Supabase storage
      const pdfData = doc.output("blob");
      const fileName = `certificate-${userId}-${courseId}.pdf`;
      const { data, error } = await supabase.storage
        .from("certificates")
        .upload(fileName, pdfData, {
          upsert: true,
        });
      console.log(data);
      const certificateUrl = `https://qfxodtzfyegbgmlwevaq.supabase.co/storage/v1/object/public/certificates/${fileName}`;
      /*setCertificateUrl(
        `https://qfxodtzfyegbgmlwevaq.supabase.co/storage/v1/object/public/certificates/${fileName}`
      );*/
      //setCertificateGenerated(true);
      const success = await handleSignatureStatus(
        courseId,
        userId,
        certificateUrl
      );
      console.log("Success ? :", success);
      if (!success) {
        // Si l'appel API échoue, afficher un message d'erreur ou restaurer l'état
        console.log("La validation du chapitre a échoué");
      }
      // Save the doc locally
      doc.save("certificate.pdf");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="border-gray-800 h-full">
        <SignatureCanvas
          penColor="black"
          ref={signatureCanvasRef}
          canvasProps={{
            width: 500,
            height: 200,
            style: {
              border: "1px solid black",
              borderRadius: "5px",
              backgroundColor: "white",
            },
          }}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleClear}>Supprimer</Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Chargement...
            </>
          ) : (
            <>Générer l&apos;attestation</>
          )}
        </Button>
      </div>
    </div>
  );
}

export default PadSignature;
