"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "@/lib/supabaseClient";

export default function AdminWorkEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchWork = async () => {
      const { data, error } = await supabase.from("works").select("*").eq("id", id).maybeSingle();
      if (!error && data) {
        setForm({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          image_url: data.image_url || ""
        });
      }
    };
    if (id) fetchWork();
  }, [id]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("works").update(form).eq("id", id);
    if (error) {
      alert("Error updating: " + error.message);
    } else {
      router.push("/admin/works");
    }
  };

  if (!form) {
    return (
      <AdminShell title="Edit Work">
        <p>Loading…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={`Edit Work #${id}`}>
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="image_url"
            className="form-control"
            value={form.image_url}
            onChange={handleChange}
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
          Update
        </button>
      </form>
    </AdminShell>
  );
}
