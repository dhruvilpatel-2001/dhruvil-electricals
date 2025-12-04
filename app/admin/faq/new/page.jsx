"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AdminShell from "../../AdminShell";
import { supabase } from "../../lib/supabaseClient.js";

export default function NewFAQPage() {
  const router = useRouter();
  const [form, setForm] = useState({ question: "", answer: "" });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("faq").insert([form]);

    if (error) return alert("Error: " + error.message);
    router.push("/admin/faq");
  };

  return (
    <AdminShell title="Add FAQ">
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="mb-3">
          <label className="form-label">Question</label>
          <input name="question" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Answer</label>
          <textarea name="answer" className="form-control" rows={3} onChange={handleChange} required />
        </div>

        <button className="btn btn-primary mt-2">Save</button>
      </form>
    </AdminShell>
  );
}
