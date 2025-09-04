import React from "react";

export const PollButton = ({ option, handlePoll, quesId }) => {
  return (
    <button
      className="mb-1 w-100 py-2 lh-sm text-start border border-success bg-white rounded-2 text-success"
      onClick={() => {
        handlePoll(option, quesId);
      }}>
      <small className="fw-semibold">{option}</small>
    </button>
  );
};
