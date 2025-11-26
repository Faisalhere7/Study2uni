import React, { useState } from "react";

export default function Faq() {
  const faqs = [
    {
      id: 1,
      question: "What is Study2Uni?",
      answer:
        "The Study2Uni website assists foreign students in enrolling in universities in the United Kingdom. We will lead you through applications, documents, and visa assistance.",
    },
    {
      id: 2,
      question: "What courses are available?",
      answer:
        "You may undertake undergraduate, postgraduate, and professional programs in such areas as business, computing, engineering, healthcare, law, social sciences, and so on.",
    },
    {
      id: 3,
      question: "Which universities are available to apply to using Study2Uni?",
      answer:
        "Our partners among universities in the UK include both Russell Group universities and some of the other accredited universities in England, Scotland, Wales, and Northern Ireland.",
    },
    {
      id: 4,
      question: "Am I expected to take IELTS or some other English test?",
      answer:
        "Yes, most of the UK universities demand IELTS or some other type of test, such as TOEFL, PTE, or Duolingo. Others can be satisfied with evidence of English-medium education.",
    },
    {
      id: 5,
      question: "Does Study2Uni assist with student visas?",
      answer:
        "Yes. We assist in the UK Student Visa process, including documentation required, online application, and interview practice.",
    },
    {
      id: 6,
      question: "Is it possible to work in the UK as a student?",
      answer:
        "Yes. You are allowed to work part-time (20 hours per week) during the term time and full-time during university holidays with a valid UK student visa.",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#E6F0FF" }}>
      <div className="container">
        <h2 className="text-center mb-5 fw-bold" style={{ color: "#0F172A" }}>
          Frequently Asked Questions
        </h2>

        <div className="row">
          {faqs.map((faq) => (
            <div key={faq.id} className="col-md-6 mb-4">
              <div
                className="p-4 rounded shadow-sm"
                style={{ backgroundColor: "#fff", cursor: "pointer" }}
                onClick={() => toggleFaq(faq.id)}
              >
                <h5 className="fw-bold d-flex justify-content-between align-items-center">
                  {faq.question}
                  <span
                    style={{
                      transform: openId === faq.id ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                  >
                    +
                  </span>
                </h5>
                {openId === faq.id && (
                  <p className="mt-3" style={{ color: "#374151" }}>
                    {faq.answer}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
