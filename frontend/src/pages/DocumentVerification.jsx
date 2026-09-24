import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Upload,
  FileText,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import api from "../services/api";

export default function DocumentVerification() {
  const [selectedFile, setSelectedFile] = useState(null);

  const [ocrText, setOcrText] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [status, setStatus] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const uploadDocument = async () => {
    if (!selectedFile) {
      alert("Please choose a document.");
      return;
    }

    const formData = new FormData();

    formData.append("document", selectedFile);

    try {
      setLoading(true);

      const res = await api.post(
        "/document/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setOcrText(res.data.extractedText);
      setDocumentType(res.data.documentType);
      setStatus(res.data.status);
      setConfidence(res.data.confidence);
      setData(res.data.extractedData);

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
        "OCR Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">

        <div className="max-w-6xl mx-auto">

          <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white rounded-3xl p-10 shadow-xl">

            <h1 className="text-4xl font-bold">
              📄 Document Verification
            </h1>

            <p className="mt-3 text-lg">
              Upload your government documents for OCR verification.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <Upload size={30} />

                <h2 className="text-2xl font-bold">
                  Upload Document
                </h2>

              </div>

              <input
                type="file"
                className="mt-8 w-full border p-4 rounded-xl"
                onChange={(e) =>
                  setSelectedFile(e.target.files[0])
                }
              />

              <button
                onClick={uploadDocument}
                disabled={loading}
                className="mt-8 w-full bg-blue-700 hover:bg-blue-800 disabled:bg-blue-400 text-white rounded-xl py-4 font-bold"
              >
                {loading
                  ? "Processing..."
                  : "Upload & Verify"}
              </button>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="flex items-center gap-3">

                <FileText size={30} />

                <h2 className="text-2xl font-bold">
                  Extracted Text
                </h2>

              </div>

              <textarea
                value={ocrText}
                readOnly
                className="mt-8 w-full h-72 border rounded-xl p-4 bg-slate-50"
              />

            </div>

          </div>

          {ocrText && (

            <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

              <div className="flex items-center gap-3 mb-8">

                <ShieldCheck
                  size={30}
                  className="text-green-600"
                />

                <h2 className="text-3xl font-bold">
                  Verification Result
                </h2>

              </div>

              <div className="grid md:grid-cols-3 gap-6">

                <InfoCard
                  title="Document Type"
                  value={documentType}
                />

                <InfoCard
                  title="Verification"
                  value={status}
                  green={status === "Verified"}
                />

                <InfoCard
                  title="Confidence"
                  value={`${confidence}%`}
                />

              </div>

              <h2 className="text-2xl font-bold mt-10 mb-6">
                Extracted Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <InfoCard
                  title="Name"
                  value={data?.name}
                />

                <InfoCard
                  title="Date of Birth"
                  value={data?.dob}
                />

                <InfoCard
                  title="Aadhaar Number"
                  value={data?.aadhaar}
                />

                <InfoCard
                  title="PAN Number"
                  value={data?.pan}
                />

                <InfoCard
                  title="Income"
                  value={data?.income}
                />

              </div>

              <div className="mt-10 bg-green-50 border border-green-300 rounded-2xl p-6">

                <div className="flex items-center gap-3">

                  <CheckCircle
                    className="text-green-600"
                    size={30}
                  />

                  <div>

                    <h2 className="text-xl font-bold text-green-700">
                      OCR Verification Completed
                    </h2>

                    <p className="text-green-700 mt-2">
                      Your uploaded document has been
                      successfully processed.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>
    </>
  );
}

function InfoCard({
  title,
  value,
  green = false,
}) {
  return (
    <div className="bg-slate-100 rounded-2xl p-5">

      <p className="text-slate-500 mb-2">
        {title}
      </p>

      <h3
        className={`text-lg font-bold ${
          green
            ? "text-green-600"
            : "text-slate-900"
        }`}
      >
        {value || "Not Found"}
      </h3>

    </div>
  );
}