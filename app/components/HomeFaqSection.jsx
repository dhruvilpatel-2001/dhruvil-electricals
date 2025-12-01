// export default function HomeFaqSection({ faq }) {
//   if (!faq?.length) return null;

//   return (
//     <section className="py-5 bg-light">
//       <div className="container">

//         <div className="text-center mb-5">
//           <span className="section-tag text-primary fw-bold">FAQ</span>
//           <h2 className="section-title">Frequently Asked Questions</h2>
//         </div>

//         <div className="accordion" id="faqPreview">
//           {faq.map((item) => (
//             <div className="accordion-item" key={item.id}>
//               <h2 className="accordion-header">
//                 <button className="accordion-button collapsed" type="button"
//                   data-bs-toggle="collapse" data-bs-target={`#faq-${item.id}`}>
//                   {item.question}
//                 </button>
//               </h2>

//               <div id={`faq-${item.id}`} className="accordion-collapse collapse">
//                 <div className="accordion-body">{item.answer}</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-4">
//           <a href="/faq" className="btn btn-primary">View All FAQ</a>
//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";

export default function HomeFaqSection({ faq }) {
  if (!faq?.length) return null;

  const [showAll, setShowAll] = useState(false);

  // Show 4 items OR all items
  const visibleFaq = showAll ? faq : faq.slice(0, 3);

  return (
    <section className="home-faq-section py-5">
      <div className="container">
        
        <div className="text-center mb-5">
          <span className="section-tag text-primary fw-bold">FAQ</span>
          <h2 className="section-title fw-bold mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-preview-wrapper mx-auto">
          {visibleFaq.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>

        <div className="text-center mt-4">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="btn btn-primary px-4"
            >
              View All FAQ
            </button>
          ) : (
            <button
              onClick={() => setShowAll(false)}
              className="btn btn-outline-primary px-4"
            >
              Show Less
            </button>
          )}
        </div>

      </div>
    </section>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  const toggleFAQ = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div 
      className={`faq-preview-item ${open ? "open" : ""}`} 
      onClick={toggleFAQ}
    >
      <div className="faq-preview-question">
        <span>{item.question}</span>
        <i className={`ri-arrow-down-s-line arrow ${open ? "rotate" : ""}`}></i>
      </div>

      <div className="faq-preview-answer">
        <p>{item.answer}</p>
      </div>
    </div>
  );
}

