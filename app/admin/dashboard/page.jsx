import AdminShell from "../AdminShell";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="row gy-4">
        <div className="col-md-4">
          <div className="admin-stat-card">
            <h5>Works</h5>
            <p>Manage your portfolio projects.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="admin-stat-card">
            <h5>Testimonials</h5>
            <p>Control what customers say on your site.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="admin-stat-card">
            <h5>FAQ</h5>
            <p>Edit common questions and answers.</p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
