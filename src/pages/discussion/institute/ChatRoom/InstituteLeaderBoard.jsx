import { apiJsonAuth } from 'api'
import { useGlobalContext } from 'global/context';
import useChat from 'pages/discussion/useChat';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import LeaderboradItem from './LeaderboradItem';

const InstituteLeaderBoard = ({ limit }) => {
    // Function to Fetch Messages
    const { token, userData } = useGlobalContext()
    const params = useParams()
    const { reloader } = useChat(params?.meetingid)
    const [leaderboard, setLeaderBoard] = useState([])
    const fetchLeaderBoard = async () => {
        if (params?.meetingid) {
            try {
                if (limit > 10) {
                    const response = await apiJsonAuth.get(`/discussion/points/leaderboard?roomId=` + params?.meetingid + "&limit=" + limit, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    console.log("LEADERBOARD===>", response);
                    if (response.status === 200) {
                        setLeaderBoard(response?.data?.result);
                    }
                } else {
                    const response = await apiJsonAuth.post(`/discussion/declaration/leaderboard`, {
                        instituteId: userData?.id,
                        roomId: params?.meetingid
                    }, {
                        headers: {
                            Authorization: token,
                        },
                    });
                    console.log("LEADERBOARD===>", response);
                    if (response.status === 200) {
                        setLeaderBoard(response?.data?.result);
                    }
                }
            } catch (error) {
                console.log(error)
                // ErrorResponder(error);
            }
        }
    };
    React.useEffect(() => {
        fetchLeaderBoard();
    }, [params?.meetingid, reloader])

    return (
        <div>
            <h3 className="fs-3 text-center py-4">LeaderBoard <span className="text-primary">Top {limit}</span> </h3>
            <ol className="messages-list p-0">
                {leaderboard?.map((point, i) => (
                    <LeaderboradItem key={i} const={userData} message={point} i={i} />
                ))}
            </ol>
        </div>
    )
}

export default InstituteLeaderBoard