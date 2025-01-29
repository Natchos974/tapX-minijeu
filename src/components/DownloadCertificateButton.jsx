import { Button } from "./ui/button";

function DownloadCertificateButton({ certificateUrl }) {
  const handleDownload = () => {
    if (certificateUrl) {
      window.open(certificateUrl, "_blank");
    }
  };
  return (
    <Button
      variant="success"
      className="w-full flex max-w-[400px]"
      onClick={handleDownload}
    >
      Télécharger certificat
    </Button>
  );
}

export default DownloadCertificateButton;
