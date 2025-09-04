import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const ComplianceResultQuestionTable = ({page, category,mappedQuestion, questions, answers,resultId }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        if(mappedQuestion.length>0){
            setIsLoading(false)
        }
    },[mappedQuestion])

    const handleEdit = ()=>{
        console.log("handle click")
        navigate("/dashboard/school-compliance/"+mappedQuestion[0]?.question?.complianceId+"/continue/" + resultId+"/edit/currentPage/"+page);
    }


  const calculateGrade = (score, totalScore) => {
    let percentage = Math.ceil((score / totalScore) * 100).toFixed();
    
    if (percentage <= 0) {
      percentage = 0;
    } else if (percentage >= 100) {
      percentage = 100;
    }
    return percentage ? percentage + "%" : "0%";
  };
 
  return (
    <>
      {
        // question wise table start here

        <>
          <div className="d-flex justify-content-between bg-dark text-white p-2">
            <div><h5 className="fw-semibold text-white">{category.title}</h5></div>
            <div className="d-flex justify-content-between">
            <h5 className="text-white mr-4">{calculateGrade(category.score, category.totalScore)}</h5>
            <div onClick={handleEdit} style={{cursor:'pointer', marginLeft:'12px'}} className="cursor-pointer">
            <ModeEditIcon />
            </div>
            </div>
          </div>
         {
            isLoading ? <>
                <div className="d-flex justify-content-center align-items-center">
                <Spinner/>
                </div>
            </>:
            <>
            <Table striped borderless hover>
            <thead>
              <tr>
                <th>S.No.</th>
                <th colSpan={3}>Question</th>
                <th colSpan={2}>Options</th>
                <th>Answer</th>
                <th>Marks</th>

              </tr>
            </thead>
            <tbody>
              {mappedQuestion.length > 0 &&
                mappedQuestion.map((ques, index) => {
                  return (
                    <tr>
                      <td className="col-1"><p>{index + 1}</p></td>
                      <td colSpan={3} className="col-7">
                        {
                          <>
                            {/* <span>{ques.question.text}</span> */}
                            <div className="m-0 p-0" dangerouslySetInnerHTML={{ __html: ques.question.text }} />
                            {ques?.answer.comment && <span>comment:-</span>
                              }
                            {ques?.answer?.comment}
                          </>
                        }
                      </td>
                      <td colSpan={2} className="col-1">
                        {ques.question.options.length > 0 ? (
                          <ol className="p-0 m-0">
                            {ques.question.options.map((op,index) => {
                              return (
                                <li>
                                <small>{index+1 }. <span>{op.text}</span></small>
                                </li>
                              );
                            })}
                          </ol>
                        ) : null}
                      </td>
                      <td className="col-2">
                       <small>{
                          ques?.answer?.text
                        }</small>
                      </td>
                      <td>
                     {ques?.answer?.score ? <small>{ques?.answer?.score}/{ques?.answer?.max_score}</small>:"0/1"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
            </>
         }
        </>
      }

     

    </>
  );
};

export default ComplianceResultQuestionTable;
