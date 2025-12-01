export default function HomeFaqSection({ faq }) {
  if (!faq?.length) return null;

  return (
    <section className="py-5 bg-light">
      <div className="container">

        <div className="text-center mb-5">
          <span className="section-tag text-primary fw-bold">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="accordion" id="faqPreview">
          {faq.map((item) => (
            <div className="accordion-item" key={item.id}>
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse" data-bs-target={`#faq-${item.id}`}>
                  {item.question}
                </button>
              </h2>

              <div id={`faq-${item.id}`} className="accordion-collapse collapse">
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <a href="/faq" className="btn btn-primary">View All FAQ</a>
        </div>

      </div>
    </section>
  );
}
