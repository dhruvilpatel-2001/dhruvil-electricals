// import { supabase } from "@/lib/supabaseClient.js";

// export default async function FAQPage() {
//   const { data: faq } = await supabase
//     .from("faq")
//     .select("*")
//     .order("id", { ascending: true });

//   return (
//     <section id="faq" className="py-5 container">
//       <h1 className="display-5 fw-bold mb-4 text-center">Frequently Asked Questions</h1>

//       <div className="accordion" id="faqAccordion">
//         {faq?.map((item) => (
//           <div className="accordion-item mb-2" key={item.id}>
//             <h2 className="accordion-header">
//               <button
//                 className="accordion-button collapsed fw-bold"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target={`#faq-${item.id}`}
//               >
//                 {item.question}
//               </button>
//             </h2>
//             <div
//               id={`faq-${item.id}`}
//               className="accordion-collapse collapse"
//               data-bs-parent="#faqAccordion"
//             >
//               <div className="accordion-body">{item.answer}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


import { supabase } from "@/lib/supabaseClient.js";

export default async function FAQPage() {
  const { data: faqs } = await supabase
    .from("faq")
    .select("*")
    .order("id", { ascending: true });

  return (
    <section id="faq" className="faq-page container py-5">
      <div className="text-center mb-5">
        <span className="text-primary fw-bold mt-4">FAQ</span>
        <h1 className="display-5 fw-bold mt-2">Frequently Asked Questions</h1>
        <p className="text-muted mt-2">
          Clear answers to help you understand our services better.
        </p>
      </div>

      <div className="faq-wrapper mx-auto">
        {faqs?.map((item) => (
          <div className="faq-item" key={item.id}>
            <input
              type="checkbox"
              id={`faq-${item.id}`}
              className="faq-toggle"
            />

            <label htmlFor={`faq-${item.id}`} className="faq-question">
              <span>{item.question}</span>
              <i className="ri-arrow-down-s-line faq-arrow"></i>
            </label>

            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
