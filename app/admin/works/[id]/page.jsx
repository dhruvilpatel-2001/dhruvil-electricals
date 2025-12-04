"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "../../lib/supabaseClient.js";
import { uploadImage } from "@/lib/uploadImage";
import Toast from "@/app/components/Toast";

export default function AdminWorkEditPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const loadWork = async () => {
      const { data } = await supabase.from("works").select("*").eq("id", id).maybeSingle();
      setForm(data);
    };
    loadWork();
  }, [id]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // 📌 Upload new image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file, "works");
      setForm((f) => ({ ...f, image_url: url }));
      setToast("Image updated!");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("works").update(form).eq("id", id);

    if (error) alert("Update error: " + error.message);
    else {
      setToast("Updated!");
      setTimeout(() => router.push("/admin/works"), 1500);
    }
  };

  if (!form) return <AdminShell title="Edit Work">Loading…</AdminShell>;

  return (
    <AdminShell title={`Edit Work #${id}`}>
      <form onSubmit={handleSubmit} className="admin-form">

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" className="form-control" value={form.title} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input name="category" className="form-control" value={form.category} onChange={handleChange} />
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-3">
          <label className="form-label">Upload New Image</label>
          <input type="file" className="form-control" onChange={handleFileUpload} />
          {uploading && <small className="text-info">Uploading…</small>}

          {form.image_url && (
            <img
              src={form.image_url}
              className="img-fluid mt-2 rounded"
              style={{ maxHeight: "150px" }}
            />
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows="3"
            value={form.description} onChange={handleChange}></textarea>
        </div>

        <button className="btn btn-primary">Update</button>
      </form>

      <Toast message={toast} show={toast !== ""} />
    </AdminShell>
  );
}
