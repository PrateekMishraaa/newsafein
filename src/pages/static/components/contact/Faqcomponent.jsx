import React from "react";

const Faqcomponent = (props) => {
  return (
    <li className="accordion-item">
      <h2 className="accordion-header" id={props.faqLabelId}>
        <button
          className="accordion-button collapsed fw-semibold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${props.faqId}`}
          aria-expanded="false"
          aria-controls={props.faqId}
        >
          {props.faqTitle}
        </button>
      </h2>
      <div
        id={props.faqId}
        className="accordion-collapse collapse"
        aria-labelledby={props.faqLabelId}
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <p className="lh-sm text-secondary">{props.faqDescription}</p>
        </div>
      </div>
    </li>
  );
};

export default Faqcomponent;
