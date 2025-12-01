import { supabase } from "@/lib/supabaseClient";

export default async function Footer() {
  const { data: contact } = await supabase
    .from("footer_contact")
    .select("*")
    .maybeSingle();

  return (
    <footer className="footer-section mt-5" id="contact">
      <div className="container">

        <div className="footer-grid">
          {/* Logo + Description */}
          <div>
            <div className="footer-logo">
              <i className="ri-flashlight-fill"></i>
              <span>Dhruvil Electricals</span>
            </div>

            <p className="footer-description">
              Dhruvil Electricals specializes in motor rewinding, pump servicing, fan repair, and complete electrical solutions in Ahmedabad.
We provide fast service, professional workmanship, and durable repairs at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="footer-title">Contact</h5>
            <ul className="footer-contact">
              <li>
                <i className="ri-map-pin-line"></i>
                {contact?.address ?? "Your shop address here"}
              </li>
              <li>
                <i className="ri-phone-line"></i>
                {contact?.phone ?? "Your phone number"}
              </li>
              <li>
                <i className="ri-mail-line"></i>
                {contact?.email ?? "you@example.com"}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Dhruvil Electricals. All rights reserved.</span>
          <span>Designed with <i className="ri-heart-fill text-danger"></i> for motors & electrics.</span>
        </div>

      </div>
    </footer>
  );
}
