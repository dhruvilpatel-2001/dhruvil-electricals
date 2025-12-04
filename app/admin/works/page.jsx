"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import { supabase } from "../../lib/supabaseClient.js";
import Toast from "@/app/components/Toast";

export default function AdminWorksPage() {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // Search + Pagination
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // ⭐ SORTING
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");

  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / pageSize);

  const loadWorks = async () => {
    setLoading(true);

    let query = supabase
      .from("works")
      .select("*", { count: "exact" });

    // Search filter
    if (search.trim() !== "") {
      query = query.or(`title.ilike.%${search}%,category.ilike.%${search}%`);
    }

    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // ⭐ SORTING
    query = query.order(sortField, {
      ascending: sortDirection === "asc",
    });

    const { data, count, error } = await query.range(from, to);

    if (!error) {
      setWorks(data || []);
      setTotal(count);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadWorks();
  }, [page, search, sortField, sortDirection]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;

    await supabase.from("works").delete().eq("id", id);

    setToast("Deleted successfully!");
    loadWorks();
  };

  // ⭐ CLICK TO SORT FUNCTION
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle asc/desc
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Switch to new column
      setSortField(field);
      setSortDirection("asc");
    }

    // Reset to page 1
    setPage(1);
  };

  // ⭐ SORT ARROW UI
  const sortIcon = (field) => {
    if (sortField !== field) return "↕"; // default icon
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <AdminShell title="Manage Works">

      {/* TOP BAR */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Works</h2>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search title or category..."
            style={{ width: 220 }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          <Link href="/admin/works/new" className="btn btn-primary btn-sm">
            + Add New Work
          </Link>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <>
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("id")}
                >
                  ID {sortIcon("id")}
                </th>

                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("title")}
                >
                  Title {sortIcon("title")}
                </th>

                <th
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSort("category")}
                >
                  Category {sortIcon("category")}
                </th>

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

                  <td className="text-truncate" style={{ maxWidth: 220 }}>
                    {w.image_url}
                  </td>

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
                    No matching results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="mb-0">
                Page {page} of {totalPages}
              </p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  ← Previous
                </button>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* TOAST */}
      <Toast message={toast} show={toast !== ""} />
    </AdminShell>
  );
}
