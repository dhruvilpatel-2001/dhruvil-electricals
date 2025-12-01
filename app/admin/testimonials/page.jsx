"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import { supabase } from "@/lib/supabaseClient";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: false });

    if (!error) setTestimonials(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    loadTestimonials();
  };

  return (
    <AdminShell title="Manage Testimonials">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Testimonials</h2>
        <Link href="/admin/testimonials/new" className="btn btn-primary btn-sm">
          + Add New Testimonial
        </Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Avatar</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td className="text-truncate" style={{ maxWidth: 250 }}>
                  {t.message}
                </td>
                <td>{t.rating} ★</td>
                <td className="text-truncate" style={{ maxWidth: 180 }}>
                  {t.avatar_url}
                </td>

                <td className="text-end">
                  <Link
                    href={`/admin/testimonials/${t.id}`}
                    className="btn btn-outline-secondary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {testimonials.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No testimonials yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </AdminShell>
  );
}
