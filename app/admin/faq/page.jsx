"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import { supabase } from "../../lib/supabaseClient.js";

export default function AdminFAQPage() {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFaq = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("faq")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setFaq(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadFaq();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    await supabase.from("faq").delete().eq("id", id);
    loadFaq();
  };

  return (
    <AdminShell title="Manage FAQ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">FAQ</h2>
        <Link href="/admin/faq/new" className="btn btn-primary btn-sm">
          + Add FAQ
        </Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Answer</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {faq.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="fw-bold">{item.question}</td>
                <td className="text-truncate" style={{ maxWidth: 350 }}>
                  {item.answer}
                </td>

                <td className="text-end">
                  <Link
                    href={`/admin/faq/${item.id}`}
                    className="btn btn-outline-secondary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {faq.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No FAQ entries.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </AdminShell>
  );
}
