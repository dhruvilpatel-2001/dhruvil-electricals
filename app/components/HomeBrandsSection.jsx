export default function HomeBrandsSection() {
  const logos = [
    "/brands/lg.png",
    "/brands/havells.png",
    "/brands/crompton.png",
    "/brands/siemens.png",
    "/brands/abb.png"
  ];

  return (
    <section className="py-4 brand-strip">
      <div className="brand-slider">
        {logos.concat(logos).map((logo, idx) => (
          <img src={logo} className="brand-logo" key={idx} />
        ))}
      </div>
    </section>
  );
}
