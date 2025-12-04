"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "../../lib/supabaseClient.js";

export default function NewTestimonialPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
    avatar_url: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("testimonials").insert([form]);
    if (error) return alert("Error: " + error.message);

    router.push("/admin/testimonials");
  };

  return (
    <AdminShell title="Add Testimonial">
      <form onSubmit={handleSubmit} className="admin-form">

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea name="message" className="form-control" rows={3} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating (1–5)</label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Avatar Image URL</label>
          <input name="avatar_url" className="form-control" onChange={handleChange} />
        </div>

        <button className="btn btn-primary mt-2">Save</button>
      </form>
    </AdminShell>
  );
}
