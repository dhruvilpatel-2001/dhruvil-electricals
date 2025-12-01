"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminShell from "../../AdminShell";
import { supabase } from "@/lib/supabaseClient";

export default function EditFAQPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const loadFAQ = async () => {
      const { data } = await supabase.from("faq").select("*").eq("id", id).maybeSingle();
      setForm(data);
    };
    loadFAQ();
  }, [id]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("faq").update(form).eq("id", id);
    router.push("/admin/faq");
  };

  if (!form) return <AdminShell title="Edit FAQ">Loading…</AdminShell>;

  return (
    <AdminShell title={`Edit FAQ #${id}`}>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="mb-3">
          <label className="form-label">Question</label>
          <input name="question" className="form-control" value={form.question} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Answer</label>
          <textarea name="answer" className="form-control" rows={3} value={form.answer} onChange={handleChange}></textarea>
        </div>

        <button className="btn btn-primary mt-2">Update</button>
      </form>
    </AdminShell>
  );
}
