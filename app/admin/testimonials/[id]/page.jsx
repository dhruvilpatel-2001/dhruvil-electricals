"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "@/lib/supabaseClient.js";

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState(null);

  useEffect(() => {
    const loadTestimonial = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error) {
        setForm(data);
      }
    };

    loadTestimonial();
  }, [id]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("testimonials").update(form).eq("id", id);

    if (error) return alert("Error: " + error.message);

    router.push("/admin/testimonials");
  };

  if (!form) return <AdminShell title="Edit Testimonial">Loading…</AdminShell>;

  return (
    <AdminShell title={`Edit Testimonial #${id}`}>
      <form onSubmit={handleSubmit} className="admin-form">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea name="message" className="form-control" rows={3} value={form.message} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Rating</label>
          <input name="rating" type="number" min="1" max="5" className="form-control"
            value={form.rating} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Avatar Image URL</label>
          <input name="avatar_url" className="form-control" value={form.avatar_url} onChange={handleChange} />
        </div>

        <button className="btn btn-primary mt-2">Update</button>
      </form>
    </AdminShell>
  );
}
