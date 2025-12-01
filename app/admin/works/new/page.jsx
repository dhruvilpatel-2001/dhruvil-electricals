"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "@/lib/supabaseClient";
import { uploadImage } from "@/lib/uploadImage";
import Toast from "@/app/components/Toast";

export default function AdminWorkNewPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image_url: ""
  });

  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // 📌 Image Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadImage(file, "works");
      setForm((f) => ({ ...f, image_url: url }));
      setToast("Image uploaded!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }

    setUploading(false);
  };

  // 📌 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("works").insert([form]);

    if (error) {
      alert("Error saving: " + error.message);
    } else {
      setToast("Work added successfully!");
      setTimeout(() => router.push("/admin/works"), 1500);
    }
  };

  return (
    <AdminShell title="Add New Work">
      <form onSubmit={handleSubmit} className="admin-form">

        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" className="form-control" onChange={handleChange} required />
        </div>

        {/* CATEGORY */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input name="category" className="form-control" onChange={handleChange} />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input type="file" className="form-control" onChange={handleFileUpload} />
          {uploading && <small className="text-info">Uploading...</small>}

          {form.image_url && (
            <img
              src={form.image_url}
              className="img-fluid mt-2 rounded"
              style={{ maxHeight: "150px" }}
            />
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="btn btn-primary">Save</button>
      </form>

      <Toast message={toast} show={toast !== ""} />
    </AdminShell>
  );
}
