'use client';

import { useState, useRef } from "react";

const EXPECTED_COLUMNS = [
  "sku", "name", "title", "category", "brand", "price", "originalPrice",
  "discount", "description", "compatibleBrands", "compatibleModels",
  "features", "remoteType", "batteryType", "batteryIncluded",
  "voiceEnabled", "plugAndPlay", "warranty", "inStock",
];

const CATEGORY_SLUGS = [
  "tv-remotes", "ac-remotes", "set-top-box-remotes",
  "speaker-remotes", "streaming-remotes", "projector-remotes", "universal-remotes",
];

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text) {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = parseCSVLine(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, ""));
  const rows = lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ""; });
    return row;
  });
  return { headers, rows };
}

function validateRow(row, index) {
  const errors = [];
  if (!row.sku) errors.push("SKU is missing");
  if (!row.name) errors.push("Name is missing");
  if (!row.category || !CATEGORY_SLUGS.includes(row.category)) {
    errors.push(`Invalid category "${row.category}"`);
  }
  if (isNaN(Number(row.price)) || Number(row.price) <= 0) errors.push("Price invalid");
  return errors;
}

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef();

  function handleFile(f) {
    if (!f) return;
    setFile(f);
    setDone(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const { headers, rows } = parseCSV(text);
      const rowErrors = [];
      rows.forEach((row, i) => {
        const errs = validateRow(row, i);
        if (errs.length) rowErrors.push({ row: i + 2, errors: errs });
      });
      setErrors(rowErrors);
      setPreview({ headers, rows: rows.slice(0, 5), total: rows.length });
    };
    reader.readAsText(f);
  }

  async function handleUpload() {
    if (errors.length > 0) return;
    setUploading(true);
    // Simulate upload — in production: POST to /api/admin/products/bulk
    await new Promise((r) => setTimeout(r, 2000));
    setUploading(false);
    setDone(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <a href="/admin" className="text-gray-400 hover:text-gray-600 text-sm">← Admin</a>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">Upload Products via Excel / CSV</h1>
      </div>

      {/* Template download */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <h2 className="text-sm font-semibold text-blue-900 mb-1">📋 Expected CSV Format</h2>
        <p className="text-xs text-blue-700 mb-2">
          Your CSV must have the following columns (in any order):
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {EXPECTED_COLUMNS.map((col) => (
            <code key={col} className="text-[10px] bg-white border border-blue-200 text-blue-700 px-2 py-0.5 rounded font-mono">
              {col}
            </code>
          ))}
        </div>
        <p className="text-xs text-blue-600">
          <strong>compatibleBrands</strong> and <strong>compatibleModels</strong> should be pipe-separated (|) within the cell.
          E.g.: <code className="bg-white px-1 rounded">Samsung|LG|Sony</code>
        </p>
      </div>

      {/* Upload zone */}
      <div
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors mb-6 ${
          file ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300 bg-white"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        role="button"
        aria-label="Upload CSV file"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => handleFile(e.target.files[0])}
          className="hidden"
        />
        <div className="text-4xl mb-3">📂</div>
        {file ? (
          <>
            <p className="font-semibold text-gray-800">{file.name}</p>
            <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
          </>
        ) : (
          <>
            <p className="font-semibold text-gray-700">Drop your CSV/Excel file here</p>
            <p className="text-sm text-gray-400 mt-1">or click to select</p>
          </>
        )}
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-red-700 mb-2">⚠️ {errors.length} validation error{errors.length > 1 ? "s" : ""} found</h3>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {errors.map((e) => (
              <div key={e.row} className="text-xs text-red-600">
                <strong>Row {e.row}:</strong> {e.errors.join(", ")}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview table */}
      {preview && errors.length === 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">
              ✅ Preview — {preview.total} products detected
            </h3>
            <span className="text-xs text-gray-400">Showing first 5 rows</span>
          </div>
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
            <table className="text-xs w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {preview.headers.slice(0, 6).map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {preview.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {preview.headers.slice(0, 6).map((h) => (
                      <td key={h} className="px-3 py-2 text-gray-700 max-w-[160px] truncate">
                        {row[h] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload button */}
      {file && errors.length === 0 && !done && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading {preview?.total} products...
            </>
          ) : (
            `Upload ${preview?.total || ""} Products`
          )}
        </button>
      )}

      {done && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <p className="text-2xl mb-2">✅</p>
          <p className="font-semibold text-green-800">
            {preview?.total} products uploaded successfully!
          </p>
          <p className="text-sm text-green-700 mt-1">Products are now live on the store.</p>
          <a href="/admin" className="inline-block mt-4 text-blue-600 text-sm font-medium hover:underline">
            Back to Dashboard
          </a>
        </div>
      )}
    </div>
  );
}
