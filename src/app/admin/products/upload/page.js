'use client';

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { slug: "tv-remotes", label: "TV Remotes" },
  { slug: "ac-remotes", label: "AC Remotes" },
  { slug: "set-top-box-remotes", label: "Set-Top Box Remotes" },
  { slug: "speaker-remotes", label: "Home Theatre & Speaker Remotes" },
  { slug: "streaming-remotes", label: "Streaming Device Remotes" },
  { slug: "projector-remotes", label: "Projector Remotes" },
  { slug: "universal-remotes", label: "Universal & Smart Remotes" },
];

// Toast component for notifications
function Toast({ message, type = "success", onClose }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 250);
    }, 1500); // Shorter duration before redirect
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border ${exiting ? "toast-slide-out" : "toast-slide-in"} ${
      type === "success"
        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
        : "bg-red-50 border-red-200 text-red-800"
    }`}>
      <span className="text-lg">{type === "success" ? "✓" : "✕"}</span>
      <span className="text-sm font-medium">{message}</span>
      <button onClick={() => { setExiting(true); setTimeout(onClose, 250); }} className="ml-2 text-current/50 hover:text-current transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function UploadProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;
  const fileInputRef = useRef();

  // ── Form State ──
  const [form, setForm] = useState({
    sku: "",
    title: "",
    category: "",
    brand: "",
    price: "",
    mrp: "",
    description: "",
    warranty: "30 days replacement",
    weight_grams: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    in_stock: true,
    popular: false,
    status: "draft",
    compatible_brands: "",
    compatible_models: "",
  });

  const [specs, setSpecs] = useState([{ key: "", value: "" }]);
  const [images, setImages] = useState([]); // Array of { file, preview, url, uploading }
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [savingBrand, setSavingBrand] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode); // Block form render while loading edit data

  // ── Computed ──
  const discount =
    form.price && form.mrp && Number(form.mrp) > Number(form.price)
      ? Math.round(((Number(form.mrp) - Number(form.price)) / Number(form.mrp)) * 100)
      : 0;

  // ── Init Data ──
  useEffect(() => {
    // Fetch brands
    fetch("/api/brands")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBrands(data.brands);
        }
      })
      .catch(console.error);

    // Fetch product if editing
    if (isEditMode) {
      fetch(`/api/products/${editId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const p = data.product;
            setForm({
              sku: p.sku || "",
              title: p.title || "",
              category: p.category || "",
              brand: p.brand || "",
              price: p.price || "",
              mrp: p.mrp || "",
              description: p.description || "",
              warranty: p.warranty || "30 days replacement",
              weight_grams: p.weight_grams || "",
              length_cm: p.length_cm || "",
              width_cm: p.width_cm || "",
              height_cm: p.height_cm || "",
              in_stock: p.in_stock,
              popular: p.popular || false,
              status: p.status || "draft",
              compatible_brands: (p.compatible_brands || []).join(", "),
              compatible_models: (p.compatible_models || []).join(", "),
            });
            if (p.specs && p.specs.length > 0) {
              setSpecs(p.specs);
            }
            if (p.images && p.images.length > 0) {
              setImages(p.images.map(url => ({ file: null, preview: url, url, uploading: false })));
            }
          } else {
            setToast({ message: "Failed to load product", type: "error" });
          }
        })
        .catch(err => {
          console.error(err);
          setToast({ message: "Error loading product", type: "error" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [editId, isEditMode]);

  // ── Handlers ──
  function updateForm(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Brands
  async function handleAddBrand(e) {
    e.preventDefault();
    if (!newBrandName.trim()) return;
    setSavingBrand(true);
    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newBrandName })
      });
      const data = await res.json();
      if (data.success) {
        setBrands(prev => {
          // Check if already in list
          if (prev.some(b => b.slug === data.brand.slug)) return prev;
          return [...prev, data.brand].sort((a, b) => a.name.localeCompare(b.name));
        });
        updateForm("brand", data.brand.slug);
        setIsAddingBrand(false);
        setNewBrandName("");
        setToast({ message: "Brand added successfully", type: "success" });
      } else {
        setToast({ message: data.error || "Failed to add brand", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: "Error adding brand", type: "error" });
    } finally {
      setSavingBrand(false);
    }
  }

  // Specs
  function updateSpec(index, field, value) {
    setSpecs((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  function addSpec() {
    setSpecs((prev) => [...prev, { key: "", value: "" }]);
  }

  function removeSpec(index) {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  }

  // Images
  function handleImageSelect(e) {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      url: null,
      uploading: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  }

  function removeImage(index) {
    setImages((prev) => {
      const removed = prev[index];
      if (removed.file && removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function uploadImageToCloudinary(imageObj, index) {
    if (imageObj.url) return imageObj.url; // Already uploaded (e.g. from DB)

    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, uploading: true } : img))
    );

    try {
      // Get signed upload params from our server
      const sigRes = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "products" }),
      });
      const sigData = await sigRes.json();

      if (!sigData.success) throw new Error("Failed to get upload signature");

      // Upload directly to Cloudinary
      const formData = new FormData();
      formData.append("file", imageObj.file);
      formData.append("api_key", sigData.apiKey);
      formData.append("timestamp", sigData.timestamp);
      formData.append("signature", sigData.signature);
      formData.append("folder", sigData.folder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const uploadData = await uploadRes.json();

      if (!uploadData.secure_url) throw new Error("Upload failed");

      const url = uploadData.secure_url;
      setImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, url, uploading: false } : img
        )
      );
      return url;
    } catch (err) {
      console.error("Image upload error:", err);
      setImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, uploading: false } : img
        )
      );
      throw err;
    }
  }

  // Submit
  async function handleSubmit(e) {
    e.preventDefault();

    // Validation
    if (!form.sku.trim()) return setToast({ message: "SKU is required", type: "error" });
    if (!form.title.trim()) return setToast({ message: "Product title is required", type: "error" });
    if (!form.category) return setToast({ message: "Category is required", type: "error" });
    if (!form.brand) return setToast({ message: "Brand is required", type: "error" });
    if (!form.price || Number(form.price) <= 0) return setToast({ message: "Valid price is required", type: "error" });
    if (!form.mrp || Number(form.mrp) <= 0) return setToast({ message: "Valid MRP is required", type: "error" });

    setSaving(true);

    try {
      // 1. Upload all new images to Cloudinary
      const uploadedUrls = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadImageToCloudinary(images[i], i);
        uploadedUrls.push(url);
      }

      // 2. Prepare specs (filter out empty rows)
      const cleanSpecs = specs.filter((s) => s.key.trim() && s.value.trim());

      // 3. Parse compatible brands/models from comma-separated text
      const compatBrands = form.compatible_brands
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const compatModels = form.compatible_models
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      // 4. Build product object
      const product = {
        sku: form.sku.trim().toUpperCase(),
        title: form.title.trim(),
        category: form.category,
        brand: form.brand.trim().toLowerCase(),
        images: uploadedUrls,
        price: Number(form.price),
        mrp: Number(form.mrp),
        discount,
        specs: cleanSpecs,
        description: form.description.trim(),
        weight_grams: form.weight_grams ? Number(form.weight_grams) : null,
        length_cm: form.length_cm ? Number(form.length_cm) : null,
        width_cm: form.width_cm ? Number(form.width_cm) : null,
        height_cm: form.height_cm ? Number(form.height_cm) : null,
        in_stock: form.in_stock,
        status: form.status,
        warranty: form.warranty.trim(),
        popular: form.popular,
        compatible_brands: compatBrands,
        compatible_models: compatModels,
        tags: [],
      };

      // 5. Save to DB
      const url = isEditMode ? `/api/products/${editId}` : "/api/products";
      const method = isEditMode ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await res.json();

      if (!data.success) {
        setToast({ message: data.error || `Failed to ${isEditMode ? "update" : "create"} product`, type: "error" });
        setSaving(false);
        return;
      }

      setToast({ message: `Product "${product.title}" ${isEditMode ? "updated" : "created"} successfully!`, type: "success" });
      
      // Redirect to Manage Products page
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);

    } catch (err) {
      console.error(err);
      setToast({ message: "An error occurred while saving the product.", type: "error" });
      setSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-medium">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.push("/admin/products")} className="text-gray-400 hover:text-gray-600 text-sm">
          ← Admin
        </button>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">{isEditMode ? "Edit Product" : "Upload Product"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ═══════════════ 1. PRODUCT IMAGES ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">📸 Product Images</h2>
          <p className="text-xs text-gray-500 mb-4">
            Upload one or more product images. First image will be the main display image.
          </p>

          <div className="flex flex-wrap gap-3 mb-3">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
              >
                <img
                  src={img.preview}
                  alt={`Product ${i + 1}`}
                  className="w-full h-full object-contain p-1"
                />
                {img.uploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <svg className="animate-spin w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </div>
                )}
                {img.url && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 left-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}

            {/* Add image button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors"
            >
              <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span className="text-[10px] font-medium">Add</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
        </section>

        {/* ═══════════════ 2. PRODUCT INFO ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">📝 Product Information</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Title — full width */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="e.g. Compatible AC Remote for Voltas Split AC (All Capacity)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* SKU */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.sku}
                onChange={(e) => updateForm("sku", e.target.value.toUpperCase())}
                placeholder="e.g. RESORB-RE-29J"
                disabled={isEditMode}
                className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono outline-none focus:border-blue-500 transition-colors ${isEditMode ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`}
              />
              {form.sku && (
                <p className="text-[10px] text-gray-400 mt-1">
                  URL: /product/{form.sku.toLowerCase().replace(/\s+/g, "-")}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => updateForm("category", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white transition-colors"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Brand <span className="text-red-500">*</span>
              </label>
              {isAddingBrand ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="New Brand Name"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleAddBrand}
                    disabled={savingBrand}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsAddingBrand(false); setNewBrandName(""); }}
                    className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <select
                  value={form.brand}
                  onChange={(e) => {
                    if (e.target.value === "ADD_NEW") {
                      setIsAddingBrand(true);
                    } else {
                      updateForm("brand", e.target.value);
                    }
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white transition-colors capitalize"
                >
                  <option value="">Select brand</option>
                  {brands.map((b) => (
                    <option key={b.slug} value={b.slug}>
                      {b.name}
                    </option>
                  ))}
                  <option value="ADD_NEW" className="font-bold text-blue-600">
                    + Add New Brand...
                  </option>
                </select>
              )}
            </div>

            {/* Warranty */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Warranty
              </label>
              <input
                type="text"
                value={form.warranty}
                onChange={(e) => updateForm("warranty", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════ 3. PRICING ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">💰 Pricing</h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Selling Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => updateForm("price", e.target.value)}
                placeholder="299"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                MRP (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.mrp}
                onChange={(e) => updateForm("mrp", e.target.value)}
                placeholder="549"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Discount
              </label>
              <div className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2.5 text-sm font-semibold text-green-600">
                {discount > 0 ? `${discount}% off` : "—"}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ 4. FEATURES & SPECS ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">📋 Features & Specifications</h2>
          <p className="text-xs text-gray-500 mb-4">
            Add key-value pairs. These appear as clean rows on the product page.
          </p>

          <div className="space-y-2">
            {specs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => updateSpec(i, "key", e.target.value)}
                  placeholder="e.g. Special Feature"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
                />
                <span className="text-gray-300">→</span>
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  placeholder="e.g. Ergonomic"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition-colors"
                />
                {specs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSpec}
            className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Row
          </button>
        </section>

        {/* ═══════════════ 5. DESCRIPTION ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">📄 Product Description</h2>
          <p className="text-xs text-gray-500 mb-4">
            Write the product description. You can use basic HTML for formatting (e.g. &lt;b&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;br&gt;).
          </p>
          <textarea
            value={form.description}
            onChange={(e) => updateForm("description", e.target.value)}
            placeholder="Plug-and-play IR replacement remote for Voltas split ACs. Supports all modes: Cool, Fan, Dry, Auto, Sleep. Temperature range 16–30°C."
            rows={6}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors"
          />
        </section>

        {/* ═══════════════ 6. MEASUREMENTS ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">📐 Measurements</h2>
          <p className="text-xs text-gray-500 mb-4">
            Used for Shiprocket shipping integration. Optional but recommended.
          </p>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Weight (g)
              </label>
              <input
                type="number"
                min="0"
                value={form.weight_grams}
                onChange={(e) => updateForm("weight_grams", e.target.value)}
                placeholder="50"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Length (cm)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.length_cm}
                onChange={(e) => updateForm("length_cm", e.target.value)}
                placeholder="5.6"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Width (cm)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.width_cm}
                onChange={(e) => updateForm("width_cm", e.target.value)}
                placeholder="2.6"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={form.height_cm}
                onChange={(e) => updateForm("height_cm", e.target.value)}
                placeholder="7.6"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════ 7. SEARCH & COMPATIBILITY (OPTIONAL) ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1">🔍 Search & Compatibility</h2>
          <p className="text-xs text-gray-500 mb-4">
            Optional. Powers search results — not displayed on the product page.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Compatible Brands
              </label>
              <input
                type="text"
                value={form.compatible_brands}
                onChange={(e) => updateForm("compatible_brands", e.target.value)}
                placeholder="Voltas, Daikin, Blue Star (comma-separated)"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Compatible Models
              </label>
              <textarea
                value={form.compatible_models}
                onChange={(e) => updateForm("compatible_models", e.target.value)}
                placeholder="Voltas 183V DZA, Voltas 185V ADW, Voltas 123S DZA (comma-separated)"
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════ 8. SETTINGS & STATUS ═══════════════ */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">⚙️ Settings</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">
                Visibility Status
              </label>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {["draft", "published", "archived"].map(status => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateForm("status", status)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                      form.status === status
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-8 mt-2 sm:mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.in_stock}
                  onChange={(e) => updateForm("in_stock", e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm text-gray-700 font-medium">In Stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) => updateForm("popular", e.target.checked)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-sm text-gray-700 font-medium">Popular / Best Seller</span>
              </label>
            </div>
          </div>
        </section>

        {/* ═══════════════ SUBMIT ═══════════════ */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
        >
          {saving ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Saving Product...
            </>
          ) : (
            isEditMode ? "Update Product" : "Save Product"
          )}
        </button>
      </form>
    </div>
  );
}

export default function UploadProductPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-sm font-medium">Loading...</p>
        </div>
      </div>
    }>
      <UploadProductForm />
    </Suspense>
  );
}
