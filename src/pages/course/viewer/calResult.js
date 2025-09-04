const calResult = (ques,ans,passing_criteria) => {
    ans = Object(ans)
    const totalQuestions = ques.length
    const totalAttemted =  Object.keys(ans).length // ans
    // console.log(totalAttemted,totalQuestions)
    var totalCorrected = 0
    ques.map(list => {
        if(list.type==1){
            if(ans[list.id]){
                if(ans[list.id]===list.ans){
                    totalCorrected++
                }
            }
        }else{
            if(ans[list.id]) totalCorrected++
        }
    })
    let result = (totalCorrected/totalQuestions*100) >= passing_criteria ? "PASS" : "FAIL"
    console.log(totalQuestions,totalCorrected,result)
    return {totalQuestions , totalAttemted , totalCorrected, result}
}

export default calResult