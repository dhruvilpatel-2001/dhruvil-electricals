"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const { error } = await supabase.from("contact_messages").insert([form]);

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }

    setLoading(false);
  };

  return (
    <>
      {/* WHATSAPP FLOAT BUTTON */}
      <a
        href="https://wa.me/919726629397?text=Hi%20Dhruvil%2C%20I%20want%20help%20with%20your%20services."
        target="_blank"
        className="whatsapp-float"
      >
        <i className="ri-whatsapp-line"></i>
      </a>

      <section className="contact-section py-5">
        <div className="container">

          <div className="text-center mb-5">
            <span className="section-tag text-primary fw-bold">CONTACT</span>
            <h1 className="fw-bold display-5 mt-2">Get In Touch</h1>
            <p className="text-muted">
              We’re here to help — reach out for any rewinding or electrical service queries.
            </p>
          </div>

          <div className="row g-4">
            
            {/* CONTACT DETAILS */}
            <div className="col-lg-4">
              <div className="contact-info-card p-4 rounded shadow-sm">
                <h5 className="fw-bold mb-3">Contact Details</h5>

                <p className="mb-2">
                  <i className="ri-map-pin-line text-primary me-2"></i>
                  Dhruvil Electricals, Shop 35, Shantaram Complex, Near Nirnay Nagar sec I, 
                  Ahmedabad, Gujarat - 382481
                </p>

                <p className="mb-2">
                  <i className="ri-phone-line text-primary me-2"></i>
                  +91 97266 29397
                </p>

                <p className="mb-2">
                  <i className="ri-mail-line text-primary me-2"></i>
                  support@rewindingpros.in
                </p>
              </div>

              {/* GOOGLE MAP */}
              <div className="map-container mt-4 rounded shadow-sm overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.4150213695354!2d72.56028876446167!3d23.07364372154802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83000b14ec75%3A0x3683363d44cd6b55!2sDhruvil%20Electricals!5e0!3m2!1sen!2sin!4v1764616209570!5m2!1sen!2sin"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>


            {/* CONTACT FORM */}
            <div className="col-lg-8">
              <form className="contact-form p-4 rounded shadow-sm" onSubmit={handleSubmit}>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="form-control"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="mt-3">
                  <label className="form-label fw-bold">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button disabled={loading} className="btn btn-primary px-4 mt-4">
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <p className="text-success mt-3">Message sent successfully!</p>
                )}
                {status === "error" && (
                  <p className="text-danger mt-3">Something went wrong. Try again.</p>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
