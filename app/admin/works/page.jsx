"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import { supabase } from "@/lib/supabaseClient";

export default function AdminWorksPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWorks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("works").select("*").order("id", { ascending: false });
    if (!error) setWorks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadWorks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this work item?")) return;
    await supabase.from("works").delete().eq("id", id);
    loadWorks();
  };

  return (
    <AdminShell title="Manage Works">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Works</h2>
        <Link href="/admin/works/new" className="btn btn-primary btn-sm">
          + Add New Work
        </Link>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="table table-sm align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Image URL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {works.map((w) => (
              <tr key={w.id}>
                <td>{w.id}</td>
                <td>{w.title}</td>
                <td>{w.category}</td>
                <td className="text-truncate" style={{ maxWidth: 220 }}>{w.image_url}</td>
                <td className="text-end">
                  <Link
                    href={`/admin/works/${w.id}`}
                    className="btn btn-outline-secondary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(w.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {works.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No works yet. Click “Add New Work”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </AdminShell>
  );
}
