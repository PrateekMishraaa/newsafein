import React from "react";

export const QuizResultSummary = ({ questions, response }) => {
  console.log({ questions, response });
  const Progress = Boolean(response) ? JSON.parse(response) : false;

  // Function to handle displaying user response for each question
  function returnStr(Progress, ques) {
    try {
      if (ques.type == 5) {
        return <img src={Progress[ques?.id]} className="w-50"></img>;
      }
      if (ques.type !== 3) {
        let stringValue = String(Progress[ques?.id]);
        return stringValue?.replaceAll('"', "");
      } else {
        let ProgArr = Progress[ques?.id];
        let ProgArrMap = ProgArr.map((pro, index) => (
          <div className="d-inline-block me-2 border px-2 rounded bg-light mb-1">
            {pro}
          </div>
        ));
        return ProgArrMap;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Function to handle displaying the list of options
  function GiveOptions(Options, ques) {
    try {
      if (ques.type == 5) {
        return "";
      }
      let OptArr = JSON.parse(Options);
      let OptArrPrint = OptArr.map((optItem, optIndex) => {
        return (
          <li className={`option d-block me-2 p-1 ${ColorDecider(optItem, ques)}`}>
            {optIndex + 1}.&nbsp;{optItem}
          </li>
        );
      });
      return (
        <ul className="options ps-1">
          <b>Options :</b> {OptArrPrint}
        </ul>
      );
    } catch (err) {
      console.log(err);
      return "";
    }
  }

  // Function to display the correct answer
  function CorrectAnswers(ans) {
    try {
      let result = ans.replaceAll('"', "");
      return result;
    } catch (err) {
      console.log(err);
      return "";
    }
  }

  // Color the options - Only the correct answer will be green
  function ColorDecider(opt, ques) {
    try {
      let classes = "";
      if (Progress) {
        const CorrectAnswer = ques?.ans?.replaceAll('"', "").toLowerCase();
        // Only color the correct option green
        if (CorrectAnswer === opt.toLowerCase()) {
          classes += "text-success"; // Correct option: green
        }
      }
      return classes;
    } catch (err) {
      console.log(err);
      return "";
    }
  }

  // Color for user's answer (red if incorrect, green if correct)
  function ColorDeciderForAnswer(Progress, ques) {
    try {
      let classes = "";
      if (Progress) {
        const SubmittedAnswer = Boolean(Progress[ques?.id])
          ? Progress[ques?.id].replaceAll('"', "").toLowerCase()
          : "";
        const CorrectAnswer = ques?.ans?.replaceAll('"', "").toLowerCase();

        // If the user's submitted answer matches the correct answer
        if (SubmittedAnswer === CorrectAnswer) {
          classes += "text-success"; // Correct answer: green
        } else {
          classes += "text-danger"; // Incorrect answer: red
        }
      }
      return classes;
    } catch (err) {
      console.log(err);
      return "";
    }
  }

  return (
    <div className="py-3">
      <div className="ques-summary">
        {questions?.map((ques, quesIndex) => {
          return (
            <div key={quesIndex} className="ques-summary-list mb-2">
              <h6 className="mb-1 d-flex">
                <span>{`Q${quesIndex + 1}- `}</span>&nbsp;
                <span dangerouslySetInnerHTML={{ __html: ques?.ques }}></span>
              </h6>

              {Boolean(ques?.image) && Boolean(JSON.parse(ques?.image).length) && (
                <div className="row row-cols-1 row-cols-lg-2 g-2">
                  {JSON.parse(ques?.image).map((img, index) => (
                    <div className="col" key={index}>
                      <img className="w-100" src={img} />
                    </div>
                  ))}
                </div>
              )}

              {Boolean(ques?.ans) && ques?.type < 3 && ques?.ans?.length && (
                <div>
                  <b>Correct Answer :</b> {CorrectAnswers(ques?.ans)}
                </div>
              )}

              {Boolean(Progress[ques?.id]) && (
                <div>
                  <b>Your's Ans :</b>
                  <span className={ColorDeciderForAnswer(Progress, ques)}>
                    {returnStr(Progress, ques)}
                  </span>
                </div>
              )}

              {Boolean(ques?.options) && GiveOptions(ques?.options, ques)}

              {Boolean(ques?.desc) && (
                <div className="border border-2 border-success p-2 bg-success bg-opacity-25 rounded mt-2">
                  {ques?.desc?.replaceAll('"', "")}
                </div>
              )}

              {quesIndex + 1 < questions.length && <hr />}
            </div>
          );
        })}
      </div>
    </div>
  );
};
