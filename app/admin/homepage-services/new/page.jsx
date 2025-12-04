"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "@/lib/supabaseClient.js";
import { uploadImage } from "@/lib/uploadImage";
import Toast from "@/app/components/Toast";

export default function NewHomeServicePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: ""
  });

  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, "homepage-services");
      setForm((f) => ({ ...f, [field]: url }));
      setToast("Image uploaded!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("homepage_services").insert([form]);

    if (error) alert(error.message);
    else {
      setToast("Service added!");
      setTimeout(() => router.push("/admin/homepage-services"), 1500);
    }
  };

  return (
    <AdminShell title="Add Homepage Service">

      <form onSubmit={handleSubmit} className="admin-form">
        
        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            name="title" 
            className="form-control" 
            value={form.title} 
            onChange={handleChange}
            required 
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            name="description"
            className="form-control"
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

   
        

        {/* Upload Service Image */}
        <div className="mb-3">
          <label className="form-label">Upload Service Image</label>
          <input type="file" className="form-control" onChange={(e) => handleFileUpload(e, "image_url")} />

          {uploading && <small className="text-info">Uploading…</small>}

          {form.image_url && (
            <img 
              src={form.image_url}
              width="150"
              className="mt-2 rounded"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        <button className="btn btn-primary mt-2">Save</button>
      </form>

      <Toast message={toast} show={toast !== ""} />
    </AdminShell>
  );
}
