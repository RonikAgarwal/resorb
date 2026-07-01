'use client';

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";

// ── Default Spec Rows ──
const DEFAULT_SPECS = [
  { key: "Material Type", value: "ABS Plastic" },
  { key: "Power Source", value: "Battery Powered" },
  { key: "Number Of Batteries", value: "2" },
  { key: "Battery Included", value: "No" },
  { key: "Connectivity Technology", value: "Infrared" },
  { key: "Package Content Type", value: "1 Remote Control" },
];

// ── Toast ──
function Toast({ message, type = "success", onClose }) {
  const [exiting, setExiting] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 250);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg border ${exiting ? "toast-slide-out" : "toast-slide-in"} ${
      type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
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

// ── Tag Input Component ──
function TagInput({ tags, onChange, placeholder = "Type and press Enter..." }) {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = inputValue.trim().replace(/,$/g, "");
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  function removeTag(index) {
    onChange(tags.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-2 min-h-[44px] border border-gray-200 rounded-lg bg-white focus-within:border-blue-500 transition-colors cursor-text" onClick={() => inputRef.current?.focus()}>
      {tags.map((tag, i) => (
        <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md text-sm font-semibold text-gray-800 tracking-wide">
          {tag}
          <button type="button" onClick={() => removeTag(i)} className="flex items-center justify-center w-4 h-4 rounded-full text-gray-400 hover:bg-gray-300 hover:text-gray-700 transition-colors p-0.5">
            <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : "Add model and press Enter..."}
        className="flex-1 min-w-[150px] bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 py-1"
      />
    </div>
  );
}

// ── Wizard Step Indicator ──
function StepIndicator({ currentStep, steps }) {
  return (
    <div className="flex items-center w-full bg-white border border-gray-200 rounded-xl px-4 sm:px-6 py-4 shadow-sm">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;
        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 text-xs sm:text-sm font-bold ${
                isCompleted ? "bg-green-500 border-green-500 text-white" :
                isActive ? "bg-blue-600 border-blue-600 text-white shadow-md" :
                "bg-white border-gray-300 text-gray-400"
              }`}>
                {isCompleted ? (
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" /></svg>
                ) : stepNum}
              </div>
              <span className={`font-semibold text-xs sm:text-sm whitespace-nowrap ${isActive ? "text-gray-900" : isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 mx-2 sm:mx-4 h-[2px] bg-gray-200 rounded-full">
                <div className={`h-full rounded-full transition-all duration-300 ${isCompleted ? "bg-green-500 w-full" : "w-0"}`} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN WIZARD FORM
// ══════════════════════════════════════════════════════════
function UploadProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditMode = !!editId;
  const fileInputRef = useRef();

  // ── Step State ──
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 = category select, 1-3 = wizard steps

  // ── Form State ──
  const [form, setForm] = useState({
    sku: "",
    item_name: "",
    model_name: "",
    brand: "",
    price: "",
    mrp: "",
    model_family: [],
    compatibility: "",
    quality: "",
    quality_assurance: "Every remote is tested before dispatch before shipping.",
    disclaimer: "Please match your existing remote with the product image before placing an order.",
    safety_information: "Remove batteries when not in use for extended periods. Avoid exposure to heat and moisture.",
    pairing_required: false,
    pairing_instructions: "",
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

  const [specs, setSpecs] = useState(DEFAULT_SPECS.map(s => ({ ...s })));
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [savingBrand, setSavingBrand] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // ── Computed ──
  const discount =
    form.price && form.mrp && Number(form.mrp) > Number(form.price)
      ? Math.round(((Number(form.mrp) - Number(form.price)) / Number(form.mrp)) * 100)
      : 0;

  // ── Init ──
  useEffect(() => {
    fetch("/api/brands")
      .then(res => res.json())
      .then(data => { if (data.success) setBrands(data.brands); })
      .catch(console.error);

    if (isEditMode) {
      fetch(`/api/products/${editId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const p = data.product;
            setSelectedCategory(p.category);
            setCurrentStep(1);
            setForm({
              sku: p.sku || "",
              item_name: p.item_name || p.title || "",
              model_name: p.model_name || "",
              brand: p.brand || "",
              price: p.price || "",
              mrp: p.mrp || "",
              model_family: p.model_family || [],
              compatibility: p.compatibility || "",
              quality: p.quality || "",
              quality_assurance: p.quality_assurance || "Every remote is tested before dispatch before shipping.",
              disclaimer: p.disclaimer || "Please match your existing remote with the product image before placing an order.",
              safety_information: p.safety_information || "Remove batteries when not in use for extended periods. Avoid exposure to heat and moisture.",
              pairing_required: p.pairing_required || false,
              pairing_instructions: p.pairing_instructions || "",
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
            if (p.specs && p.specs.length > 0) setSpecs(p.specs);
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
        .finally(() => setIsLoading(false));
    }
  }, [editId, isEditMode]);

  // ── Handlers ──
  function updateForm(key, value) {
    setForm(f => ({ ...f, [key]: value }));
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
        body: JSON.stringify({ name: newBrandName }),
      });
      const data = await res.json();
      if (data.success) {
        setBrands(prev => {
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
    setSpecs(prev => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }
  function addSpec() {
    setSpecs(prev => [...prev, { key: "", value: "" }]);
  }
  function removeSpec(index) {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  }

  // Images
  function handleImageSelect(e) {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      url: null,
      uploading: false,
    }));
    setImages(prev => [...prev, ...newImages]);
  }

  function removeImage(index) {
    setImages(prev => {
      const removed = prev[index];
      if (removed.file && removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  async function uploadImageToCloudinary(imageObj, index) {
    if (imageObj.url) return imageObj.url;
    setImages(prev => prev.map((img, i) => (i === index ? { ...img, uploading: true } : img)));
    try {
      const sigRes = await fetch("/api/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "products" }),
      });
      const sigData = await sigRes.json();
      if (!sigData.success) throw new Error("Failed to get upload signature");

      const formData = new FormData();
      formData.append("file", imageObj.file);
      formData.append("api_key", sigData.apiKey);
      formData.append("timestamp", sigData.timestamp);
      formData.append("signature", sigData.signature);
      formData.append("folder", sigData.folder);

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.secure_url) throw new Error("Upload failed");

      const url = uploadData.secure_url;
      setImages(prev => prev.map((img, i) => (i === index ? { ...img, url, uploading: false } : img)));
      return url;
    } catch (err) {
      console.error("Image upload error:", err);
      setImages(prev => prev.map((img, i) => (i === index ? { ...img, uploading: false } : img)));
      throw err;
    }
  }

  // Step validation
  function validateStep1() {
    if (!form.item_name.trim()) { setToast({ message: "Item Name is required", type: "error" }); return false; }
    if (!form.sku.trim()) { setToast({ message: "SKU / Model Number is required", type: "error" }); return false; }
    if (!form.brand) { setToast({ message: "Brand is required", type: "error" }); return false; }
    if (!form.price || Number(form.price) <= 0) { setToast({ message: "Valid selling price is required", type: "error" }); return false; }
    if (!form.mrp || Number(form.mrp) <= 0) { setToast({ message: "Valid MRP is required", type: "error" }); return false; }
    return true;
  }

  function goNext() {
    if (currentStep === 1 && !validateStep1()) return;
    setCurrentStep(s => Math.min(s + 1, 3));
  }
  function goBack() {
    setCurrentStep(s => Math.max(s - 1, 1));
  }

  // Submit
  async function handleSubmit(e, targetStatus) {
    if (e && e.preventDefault) e.preventDefault();
    setSaving(true);
    try {
      const uploadedUrls = [];
      for (let i = 0; i < images.length; i++) {
        const url = await uploadImageToCloudinary(images[i], i);
        uploadedUrls.push(url);
      }

      const cleanSpecs = specs.filter(s => s.key.trim() && s.value.trim());
      const compatBrands = form.compatible_brands.split(",").map(s => s.trim()).filter(Boolean);
      const compatModels = form.compatible_models.split(",").map(s => s.trim()).filter(Boolean);

      const product = {
        sku: form.sku.trim().toUpperCase(),
        title: form.item_name.trim(),
        item_name: form.item_name.trim(),
        model_name: form.model_name.trim(),
        category: selectedCategory,
        brand: form.brand.trim().toLowerCase(),
        images: uploadedUrls,
        price: Number(form.price),
        mrp: Number(form.mrp),
        discount,
        specs: cleanSpecs,
        model_family: form.model_family,
        compatibility: form.compatibility.trim(),
        quality: form.quality.trim(),
        quality_assurance: form.quality_assurance.trim(),
        disclaimer: form.disclaimer.trim(),
        safety_information: form.safety_information.trim(),
        pairing_required: form.pairing_required,
        pairing_instructions: form.pairing_required ? form.pairing_instructions.trim() : "",
        description: "",
        weight_grams: form.weight_grams ? Number(form.weight_grams) : null,
        length_cm: form.length_cm ? Number(form.length_cm) : null,
        width_cm: form.width_cm ? Number(form.width_cm) : null,
        height_cm: form.height_cm ? Number(form.height_cm) : null,
        in_stock: form.in_stock,
        status: targetStatus || form.status || "published",
        popular: form.popular,
        compatible_brands: compatBrands,
        compatible_models: compatModels,
        tags: [],
      };

      const url = isEditMode ? `/api/products/${editId}` : "/api/products";
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(product) });
      const data = await res.json();

      if (!data.success) {
        setToast({ message: data.error || `Failed to ${isEditMode ? "update" : "create"} product`, type: "error" });
        setSaving(false);
        return;
      }

      setToast({ message: `Product "${product.item_name}" ${isEditMode ? "updated" : "created"} successfully!`, type: "success" });
      setTimeout(() => router.push("/admin/products"), 1500);
    } catch (err) {
      console.error(err);
      setToast({ message: "An error occurred while saving the product.", type: "error" });
      setSaving(false);
    }
  }

  // ── Loading State ──
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

  // ══════════════════════════════════════════════════════════
  // STEP 0 — Category Selection
  // ══════════════════════════════════════════════════════════
  if (currentStep === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload New Product</h1>
          <p className="text-sm text-gray-500">Select a category to begin</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setSelectedCategory(cat.slug); setCurrentStep(1); }}
                className="category-select-card"
              >
                <div className="category-select-card-icon">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="category-select-card-label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Selected category info ──
  const selectedCat = categories.find(c => c.slug === selectedCategory);

  // ══════════════════════════════════════════════════════════
  // WIZARD (Steps 1-3)
  // ══════════════════════════════════════════════════════════
  return (
    <div className="max-w-[900px] mx-auto px-4 py-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <button onClick={() => router.push("/admin/products")} className="text-gray-400 hover:text-gray-600 text-sm">
              ← Admin
            </button>
            <span className="text-gray-300">/</span>
            <h1 className="text-xl font-bold text-gray-900">{isEditMode ? "Edit Product" : "Upload Product"}</h1>
          </div>
          {selectedCat && (
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-sm text-gray-500 font-medium">Category:</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-semibold text-gray-700">
                {(() => { const Icon = selectedCat.icon; return <Icon className="w-3.5 h-3.5" />; })()}
                {selectedCat.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <StepIndicator currentStep={currentStep} steps={["Basic Info", "Product Info", "Specs & Shipping"]} />
      </div>

      <form className="space-y-6">
        {/* ═══════════════ STEP 1 — Basic Info ═══════════════ */}
        {currentStep === 1 && (
          <div key="step1" className="wizard-step-content space-y-6">
            {/* Images */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-1">Product Images</h2>
              <p className="text-xs text-gray-500 mb-4">Upload product images. First image becomes the primary display image.</p>

              <div className="flex flex-wrap gap-3 mb-3">
                {images.map((img, i) => (
                  <div key={i} className="relative w-24 h-24 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <img src={img.preview} alt={`Product ${i + 1}`} className="w-full h-full object-contain p-1" />
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
                    {i === 0 && (
                      <span className="absolute bottom-0.5 left-0.5 text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">PRIMARY</span>
                    )}
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-1 left-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">×</button>
                  </div>
                ))}
                <button type="button" onClick={() => fileInputRef.current?.click()} className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
                  <svg className="w-6 h-6 mb-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span className="text-[10px] font-medium">Add</span>
                </button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageSelect} className="hidden" />
            </section>

            {/* Product Details */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Product Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Item Name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.item_name} onChange={e => updateForm("item_name", e.target.value)} placeholder="e.g. Compatible AC Remote for Voltas Split AC" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Model Name</label>
                  <input type="text" value={form.model_name} onChange={e => updateForm("model_name", e.target.value)} placeholder="e.g. RE-168" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">SKU / Model Number <span className="text-red-500">*</span></label>
                  <input type="text" value={form.sku} onChange={e => updateForm("sku", e.target.value.toUpperCase())} placeholder="e.g. RESORB-RE-29J" disabled={isEditMode} className={`w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono outline-none focus:border-blue-500 transition-colors ${isEditMode ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''}`} />
                  {form.sku && <p className="text-[10px] text-gray-400 mt-1">URL: /product/{form.sku.toLowerCase().replace(/\s+/g, "-")}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">MRP (₹) <span className="text-red-500">*</span></label>
                  <input type="number" min="0" value={form.mrp} onChange={e => updateForm("mrp", e.target.value)} placeholder="549" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Selling Price (₹) <span className="text-red-500">*</span></label>
                  <input type="number" min="0" value={form.price} onChange={e => updateForm("price", e.target.value)} placeholder="299" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                {discount > 0 && (
                  <div className="col-span-2">
                    <div className="text-sm font-semibold text-green-600 bg-green-50 border border-green-100 rounded-lg px-3 py-2 inline-block">{discount}% off</div>
                  </div>
                )}
              </div>
            </section>

            {/* Brand */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Brand</h2>
              {isAddingBrand ? (
                <div className="flex gap-2">
                  <input type="text" value={newBrandName} onChange={e => setNewBrandName(e.target.value)} placeholder="New Brand Name" className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" autoFocus />
                  <button type="button" onClick={handleAddBrand} disabled={savingBrand} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">Save</button>
                  <button type="button" onClick={() => { setIsAddingBrand(false); setNewBrandName(""); }} className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">Cancel</button>
                </div>
              ) : (
                <select value={form.brand} onChange={e => { if (e.target.value === "ADD_NEW") { setIsAddingBrand(true); } else { updateForm("brand", e.target.value); } }} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 bg-white transition-colors capitalize">
                  <option value="">Select brand</option>
                  {brands.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
                  <option value="ADD_NEW" className="font-bold text-blue-600">+ Add New Brand...</option>
                </select>
              )}
            </section>

            {/* Model Family Tags */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-1">Model Family</h2>
              <p className="text-xs text-gray-500 mb-4">Type a model number and press Enter or Comma to add. Used for the "Similar Models" section.</p>
              <TagInput tags={form.model_family} onChange={tags => updateForm("model_family", tags)} placeholder="e.g. RE168, RE168A, RE168B..." />
            </section>

            {/* Next Button */}
            <div className="flex justify-end">
              <button type="button" onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm flex items-center gap-2">
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ STEP 2 — Product Information ═══════════════ */}
        {currentStep === 2 && (
          <div key="step2" className="wizard-step-content space-y-6">
            <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-gray-900">Product Information</h2>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Compatibility</label>
                <textarea value={form.compatibility} onChange={e => updateForm("compatibility", e.target.value)} placeholder="e.g. Compatible with Lloyd Split AC models." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors" />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Quality</label>
                <textarea value={form.quality} onChange={e => updateForm("quality", e.target.value)} placeholder="e.g. Premium ABS Plastic Body." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors" />
              </div>

              {/* Advanced info accordion */}
              <div className="pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                   Advanced Information
                   <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" /></svg>
                </button>
                
                {showAdvanced && (
                  <div className="mt-5 space-y-5 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Quality Assurance <span className="text-[10px] text-gray-400 font-normal">(prefilled)</span></label>
                      <textarea value={form.quality_assurance} onChange={e => updateForm("quality_assurance", e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Disclaimer <span className="text-[10px] text-gray-400 font-normal">(prefilled)</span></label>
                      <textarea value={form.disclaimer} onChange={e => updateForm("disclaimer", e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors" />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Safety Information <span className="text-[10px] text-gray-400 font-normal">(prefilled)</span></label>
                      <textarea value={form.safety_information} onChange={e => updateForm("safety_information", e.target.value)} rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors" />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Pairing Toggle */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Pairing Required?</h2>
              <div className="flex bg-gray-100 p-1 rounded-lg w-fit mb-4">
                <button type="button" onClick={() => updateForm("pairing_required", false)} className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${!form.pairing_required ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>No</button>
                <button type="button" onClick={() => updateForm("pairing_required", true)} className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${form.pairing_required ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>Yes</button>
              </div>

              {form.pairing_required && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Pairing Instructions</label>
                  <textarea value={form.pairing_instructions} onChange={e => updateForm("pairing_instructions", e.target.value)} placeholder="e.g. Hold Setup button for 5 seconds and follow pairing process." rows={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none resize-y focus:border-blue-500 transition-colors" />
                </div>
              )}
            </section>

            {/* Back / Next */}
            <div className="flex justify-between">
              <button type="button" onClick={goBack} className="text-gray-600 hover:text-gray-800 font-medium px-6 py-3 rounded-xl transition-colors text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" /></svg>
                Back
              </button>
              <button type="button" onClick={goNext} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm flex items-center gap-2">
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* ═══════════════ STEP 3 — Specs & Shipping ═══════════════ */}
        {currentStep === 3 && (
          <div key="step3" className="wizard-step-content space-y-6">
            {/* Specifications Table */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-1">Specifications</h2>
              <p className="text-xs text-gray-500 mb-4">Edit values as needed. These appear on the product page.</p>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 w-[45%]">Specification</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">Value</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {specs.map((spec, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-2">
                          <input type="text" value={spec.key} onChange={e => updateSpec(i, "key", e.target.value)} placeholder="Key" className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                        </td>
                        <td className="px-4 py-2">
                          <input type="text" value={spec.value} onChange={e => updateSpec(i, "value", e.target.value)} placeholder="Value" className="w-full border border-gray-200 rounded-md px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                        </td>
                        <td className="px-2 py-2">
                          {specs.length > 1 && (
                            <button type="button" onClick={() => removeSpec(i)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">×</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" onClick={addSpec} className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                Add Row
              </button>
            </section>

            {/* Measurements */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-1">Measurements</h2>
              <p className="text-xs text-gray-500 mb-4">Used for shipping calculations.</p>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Length (cm)</label>
                  <input type="number" min="0" step="0.1" value={form.length_cm} onChange={e => updateForm("length_cm", e.target.value)} placeholder="5.6" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Width (cm)</label>
                  <input type="number" min="0" step="0.1" value={form.width_cm} onChange={e => updateForm("width_cm", e.target.value)} placeholder="2.6" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input type="number" min="0" step="0.1" value={form.height_cm} onChange={e => updateForm("height_cm", e.target.value)} placeholder="7.6" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Weight (g)</label>
                  <input type="number" min="0" value={form.weight_grams} onChange={e => updateForm("weight_grams", e.target.value)} placeholder="50" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors" />
                </div>
              </div>
            </section>

            {/* Additional Settings (In Stock & Popular) */}
            <section className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Settings</h2>
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.in_stock} onChange={e => updateForm("in_stock", e.target.checked)} className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-gray-700 font-medium">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.popular} onChange={e => updateForm("popular", e.target.checked)} className="w-4 h-4 accent-blue-600" />
                  <span className="text-sm text-gray-700 font-medium">Popular / Best Seller</span>
                </label>
              </div>
            </section>

            {/* Back / Submit */}
            <div className="flex justify-between pt-4">
              <button type="button" onClick={goBack} className="text-gray-600 hover:text-gray-800 font-medium px-6 py-3 rounded-xl transition-colors text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7" /></svg>
                Back
              </button>
              
              <div className="flex items-center gap-3">
                <button type="button" onClick={(e) => handleSubmit(e, "draft")} disabled={saving} className="bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 font-semibold px-6 py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 border border-gray-200">
                  Save as Draft
                </button>
                <button type="button" onClick={(e) => handleSubmit(e, "published")} disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                  {saving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {isEditMode ? "Updating..." : "Uploading..."}
                    </>
                  ) : (
                    isEditMode ? "Update Product" : "Upload Product"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
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
