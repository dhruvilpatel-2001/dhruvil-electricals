"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "../AdminShell";
import { supabase } from "@/lib/supabaseClient";
import Toast from "@/app/components/Toast";

export default function AdminHomeServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const loadServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("homepage_services")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setServices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;

    await supabase.from("homepage_services").delete().eq("id", id);
    setToast("Deleted successfully!");
    loadServices();
  };

  return (
    <AdminShell title="Homepage Services">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">Homepage Services</h2>
        <Link href="/admin/homepage-services/new" className="btn btn-primary btn-sm">
          + Add Service
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
              <th>Image</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.title}</td>

                {/* Image Preview */}
                <td>
                  {s.image_url ? (
                    <img 
                      src={s.image_url} 
                      width="90" 
                      height="60"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                  ) : (
                    <span className="text-muted">No image</span>
                  )}
                </td>

                <td className="text-end">
                  <Link 
                    href={`/admin/homepage-services/${s.id}`} 
                    className="btn btn-outline-secondary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No services added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <Toast message={toast} show={toast !== ""} />
    </AdminShell>
  );
}
