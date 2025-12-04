export default function AboutPage() {
  return (
    <section id="about" className="about-section py-5">
      <div className="container">
        
        <div className="text-center mb-5">
          <span className="section-tag text-primary fw-bold">ABOUT US</span>
          <h2 className="section-title fw-bold mt-2">About Us</h2>
        </div>

        <div className="row align-items-center g-5">

          {/* LEFT TEXT */}
          <div className="col-lg-6">
            <p className="about-text">
              Dhruvil Electricals is a trusted name in **motor rewinding, electrical repair, 
              and precision maintenance services**. With years of hands-on experience, we provide 
              reliable solutions for industrial motors, pumps, compressors, and various 
              electrical systems.
            </p>

            <p className="about-text">
              Our expertise includes
              <span className="highlight">
                &nbsp;expert motor rewinding, fault diagnosis, panel repair, and high-quality 
                electrical service workmanship.
              </span>
              We follow industry-grade standards to ensure strong performance, durability, 
              and long-term reliability.
            </p>

            <p className="about-text">
              We are committed to delivering:
              <br />— Timely service  
              <br />— Transparent pricing  
              <br />— High-grade materials  
              <br />— Strong customer support  
            </p>

            <p className="about-text">
              At Dhruvil Electricals, our mission is simple —
              <span className="highlight"> deliver quality, trust, and precision in every job we do.</span>
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6 text-center">
            <div className="about-image-wrapper">
              <img
                src="./images/about.jpg"
                alt="Motor Rewinding"
                className="about-image"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
