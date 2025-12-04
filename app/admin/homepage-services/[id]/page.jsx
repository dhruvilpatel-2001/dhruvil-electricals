"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "../../lib/supabaseClient.js";
import { uploadImage } from "@/lib/uploadImage";
import Toast from "@/app/components/Toast";

export default function EditHomeServicePage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  // Load item data
  useEffect(() => {
    const loadService = async () => {
      const { data, error } = await supabase
        .from("homepage_services")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error) setForm(data);
    };

    loadService();
  }, [id]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Upload function (icon or image)
  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadImage(file, "homepage-services");
      setForm((f) => ({ ...f, [field]: url }));
      setToast("Image updated!");
    } catch (error) {
      alert("Upload failed: " + error.message);
    }

    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("homepage_services")
      .update(form)
      .eq("id", id);

    if (error) alert(error.message);
    else {
      setToast("Service updated!");
      setTimeout(() => router.push("/admin/homepage-services"), 1200);
    }
  };

  if (!form)
    return (
      <AdminShell title="Edit Homepage Service">
        <p>Loading…</p>
      </AdminShell>
    );

  return (
    <AdminShell title={`Edit Service #${id}`}>
      <form onSubmit={handleSubmit} className="admin-form">

        {/* TITLE */}
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

        {/* DESCRIPTION */}
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

       

        {/* IMAGE UPLOAD */}
        <div className="mb-3">
          <label className="form-label">Replace Service Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileUpload(e, "image_url")}
          />
          {uploading && <small className="text-info">Uploading…</small>}

          {form.image_url && (
            <img
              src={form.image_url}
              width="180"
              className="mt-2 rounded"
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        <button className="btn btn-primary mt-3">Update</button>
      </form>

      <Toast message={toast} show={toast !== ""} />
    </AdminShell>
  );
}
