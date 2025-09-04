import React from "react";

const CourseEnroll = () => {
  return (
    <div
      class="modal fade"
      id="courseEnroll"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
             G20 Certification Course
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">Enroll For the G20 Certification Course</div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnroll;
