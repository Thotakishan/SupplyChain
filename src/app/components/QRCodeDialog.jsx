import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
import { Button } from "./ui/button.jsx";
import { Download, Share2 } from "lucide-react";

export function QRCodeDialog({ open, onOpenChange, batchId, productName, additionalInfo }) {
  const qrValue = `PSCMS-BATCH:${batchId}|PRODUCT:${productName || "N/A"}|TIMESTAMP:${Date.now()}`;

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR_${batchId}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Batch QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to track and verify the product batch
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="bg-white p-6 rounded-lg border-2 border-gray-200 shadow-sm">
            <QRCodeSVG
              id="qr-code-svg"
              value={qrValue}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Batch ID:</span>
              <span className="font-mono font-semibold">{batchId}</span>
            </div>
            {productName && (
              <div className="flex justify-between">
                <span className="text-gray-600">Product:</span>
                <span className="font-semibold">{productName}</span>
              </div>
            )}
            {additionalInfo && (
              <div className="flex justify-between">
                <span className="text-gray-600">Info:</span>
                <span className="font-semibold">{additionalInfo}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 w-full">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
