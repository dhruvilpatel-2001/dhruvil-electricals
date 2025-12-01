"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "@/lib/supabaseClient";

export default function AdminWorkNewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image_url: ""
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("works").insert([form]);
    if (error) {
      alert("Error saving: " + error.message);
    } else {
      router.push("/admin/works");
    }
  };

  return (
    <AdminShell title="Add New Work">
      <form onSubmit={handleSubmit} className="admin-form">
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

        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            name="category"
            className="form-control"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Motor, Pump, Fan"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="image_url"
            className="form-control"
            value={form.image_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows={3}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </AdminShell>
  );
}
