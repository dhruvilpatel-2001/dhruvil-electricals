"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient.js";

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
      setForm({ name: "", phone: "", email: "", message: "" });
    }

    setLoading(false);
  };

  return (
    <>
      {/* 🔥 WHATSAPP FLOAT BUTTON */}
      <a
        href="https://wa.me/919726629397?text=Hi%20Dhruvil%20Electricals%20%26%20Motor%20Rewinding%2C%20I%20need%20your%20help%20with%20an%20electrical%2Fmotor%20rewinding%20service"
        target="_blank"
        className="whatsapp-float"
      >
        <i className="ri-whatsapp-line"></i>
      </a>

      {/* 🌟 CONTACT SECTION */}
      <section className="contact-premium-section py-5" id="contact">
        <div className="container">

          {/* HEADER */}
          <div className="text-center mb-5 fade-in">
            <span className="section-tag text-primary fw-bold">CONTACT</span>
            <h1 className="fw-bold display-5 mt-2">Get In Touch</h1>
            <p className="text-muted">
              We’re here to help — reach out for any rewinding or electrical service queries.
            </p>
          </div>

          <div className="row g-4">

            {/* LEFT SIDE – CONTACT INFO + MAP */}
            <div className="col-lg-4 fade-up delay-1">
              <div className="contact-card glass-card p-4 rounded">
                <h5 className="fw-bold mb-3">Contact Details</h5>

                <p className="mb-3 d-flex align-items-start">
                  <i className="ri-map-pin-line text-primary me-2 fs-5"></i>
                  Dhruvil Electricals, Shop 35, Shantaram Complex, Near Nirnay Nagar sec I, Ahmedabad, Gujarat - 382481
                </p>

                <p className="mb-3">
                  <i className="ri-phone-line text-primary me-2"></i>
                  +91 97266 29397
                </p>

                <p className="mb-3">
                  <i className="ri-mail-line text-primary me-2"></i>
                  support@rewindingpros.in
                </p>
              </div>

              {/* MAP */}
              <div className="map-wrapper mt-4 shadow-sm rounded overflow-hidden fade-up delay-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.4150213695354!2d72.56028876446167!3d23.07364372154802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83000b14ec75%3A0x3683363d44cd6b55!2sDhruvil%20Electricals!5e0!3m2!1sen!2sin!4v1764616209570!5m2!1sen!2sin"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* RIGHT SIDE – FORM */}
            <div className="col-lg-8 fade-up delay-2">
              <form className="contact-form glass-card p-4 rounded" onSubmit={handleSubmit}>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="form-control premium-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      className="form-control premium-input"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="form-control premium-input"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="mt-3">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="form-control premium-input"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button disabled={loading} className="btn btn-primary px-4 mt-4 premium-btn">
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && <p className="text-success mt-3">Message sent successfully!</p>}
                {status === "error" && <p className="text-danger mt-3">Something went wrong. Try again.</p>}
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
