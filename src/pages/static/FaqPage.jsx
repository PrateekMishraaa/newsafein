import BreadCrumb from "layout/BreadCrumb";
import React from "react";

const faqs = [
    {
        id: 1,
        q: "What does G20 stand for?",
        a: "The Group of Twenty (G20) is one of the premier forums for international economic cooperation. It holds meetings to discuss the most pressing global matters and formulate reforms to strengthen global architecture.",
    },
    {
        id: 2,
        q: "What is the purpose of the Model G20 Summit?",
        a: "Model G20 summit is a creative stimulation that mirrors the actual G20 summit gatherings. It is designed by actual G20 experts for the youth to give a phenomenal overview of G20 discussions.",
    },
    {
        id: 3,
        q: "Why is India in the news for G20 this time?",
        a: "In December 2022, India bagged the presidency of the G20 summit for 2023. This means that India will steer the G20 agenda for one year with a series of events and host the actual G20 summit of Leaders in October 2023.",
    },
    {
        id: 4,
        q: "What is the significance of India’s presidency for G20?",
        a: "India’s G20 Presidency comes at a time when the world is facing social and economic disruptions. The effects of the pandemic gave rise to poverty, unemployment, and inflation. So, world peace, and geopolitical stability are at high stakes. India as a G20 leader can be a bridge for East to West by being a strong diplomatic nation and fast emerging economy.",
    },
    {
        id: 5,
        q: "Who can participate in the Model G20?",
        a: "Model G20 summit programme is majorly open for youth who are undergraduates and graduates from any institution or school. Also, young professionals are welcome to participate in the summit as well.",
    },
    {
        id: 6,
        q: "Can you please explain two tracks of Model G20?",
        a: "Similar to the real G20 summit, Model G20 has two vital tracks namely, ‘Sherpa Track’ and ‘Finance Track.’ The Sherpa track focuses on socio-political issues like agriculture, climate change, education, etc. whereas the finance track supervises the finance and economic issues like taxation, debts. Delegations are formed to cover both tracks so that a final communique document can be curated.",
    },
    {
        id: 7,
        q: "How many members need to register to form a Model G20 delegation?",
        a: "Typically, a delegation needs to have 1-7 members. The main role members are a Sherpa, Sous Sherpa(deputy), Finance Minister, Central Bank Governor, and senior advisors (yaks).",
    },
    {
        id: 8,
        q: "What are the benefits or perks of participating in the Model G20 summit?",
        a: "As a delegate in the Model G20 summit you will learn the art of diplomacy, multilateral negotiations, team strategy and collaborations, public speaking. Moreover, you will be entitled to share your views and opinions on issues like education policy, the digital economy, etc. As a participant, you will receive certificates with your team and even more accolades if you’re adjudged as the best delegation in the summit.",
    },
    {
        id: 9,
        q: "Are there any extra events apart from Model G20 summit meetings for participants?",
        a: "Of course, the organising team has worked sincerely hard to come up with networking meet-ups for delegates with G20 experts and diplomats. Moreover, there will be a series of cultural events and delectable cuisines from all across the country for you to have a global experience.",
    },
    {
        id: 10,
        q: " There is no wifi or mobile internet at the venues can I stillconduct a yuvamanthan ModelG20?",
        a: "Yes you can, resolution points can be recorded on paper. Voting can be done by raising of hands and a communique can be drafted on paper as well. You will have to email the final communique on modelg20@yuvamanthan.org"

    },
    {
        id: 11,
        q: " What If Total Participants Are Not In Multiples Of 20? A Few Extra Students Want To Participate And We Already Have 40 Students.",
        a: "We suggest that participants should be in multiples of 20 as there are 20 member countries in G20. However, there may be a situation where a few extra students may want to participate in that case you can add guest countries during 'Plan Your YMG20'. It adds a number of new delegates as per the designations selected. So for example, if you selected 2 designations, adding 1 new guest country will add 2 new students as participants. If you added 3 guest countries then 2x3 = 6 new participants can be added."

    },
    {
        id: 21,
        q: "Why Can't I Choose A Theme For The Leaders Track?",
        a: "Leaders Track is not a Discussion Track, it is a track that decides the agenda. In its meeting, students are chosen as Heads of States participate in a debate to choose the best sub-theme for the rest of the tracks. Therefore, they discuss why certain sub-theme is more important than the other. Other track members (Sherpa, Finance and Foreign) sit as audiences in this track's main meeting, called the Agenda Meeting."

    },
    {
        id: 12,
        q: " What happens when I select only one track while planning my YMG20?",
        a: "If you select only one Track while planning your YMG20 you will be able to conduct a summit with at least 20 student delegates or a maximum of 40 as long as you have selected one of the 3 discussion tracks, namely Sherpa, Finance and Foreign Ministers Track. However, you cannot select just the Leaders Track and organise a summit as it is not a discussion track."

    },
    {
        id: 13,
        q: "I have over 200 students wanting to participate, what should I do?",
        a: "If you add all 9 guest countries and organise all 4 tracks with all designations you can have 140 + 63 i.e 203 participants, thats the maximum capacity. Make sure you have enough space to sit 203 students in Declaration Meetings in a rectangular format facing each other. Also, a good working microphone is critical in such a situation!"

    },
    {
        id: 14,
        q: "I have only 20 students who have registered, the maximum Participation I can ensure in a week is 40 students. Will it be Enough?",
        a: " Although we encourage schools to have as many participants as long as they are below the maximum capacity of 203. We know sometimes students are busy. You can organise YMG20 with just 20 students. Select any one of the Discussion Tracks like Sherpa Track and select one designation i.e Sherpa and you will have an amazing YM20 with just 20 students. In case you  manage to reach your target of 40 students add Sous-sherpa in the designation and 40 students can participate."

    },
    {
        id: 15,
        q: " We want to keep leaders track and sherpa track but we have only 40 students participating.",
        a: "Of course, you can, however for the sake of having more ideas we don't recommend it. See, essentially members of Leaders Track only discuss which sub-themes have to be picked up for other tracks which lacks generation of new ideas. But we know students want to become Head of States too, if that is important choose Leaders Track and Sherpa Track and do not select Sous-Sherpa in Designation while planning your summit."

    },
    {
        id: 16,
        q: " Can teacher coordinators be judges as well?",
        a: "The Jury in the YMG20 is another vital group that would determine the results and top achievers for the day. The jury for the event will have four key members: two faculty, one journalist, one eminent social personality and one civil servant or a political leader or a Y20 representative (if available). So yes, Teacher Coordinators can be a part of the Jury."

    },
    {
        id: 17,
        q: "  I am a teacher coordinator and i am not able to activate the Discussion board. Software not working!",
        a: "Only one selected Teacher Coordinator can manage the discussion board. We hope you are the one! However, in the worst-case scenario where the software has a glitch we don't want your preparation to go in vain. You can organise the meetings without depending on the Discussion Board. In such cases resolution points can be recorded on paper. Voting can be done by raising of hands and a communique can be drafted on  paper as well. You will have to email the final communique on modelg20@yuvamanthan.org"

    },
    {
        id: 18,
        q: " We sent out the joining link invites to students and many have Shown interest in participating. What to do next?",
        a: "We hope all of them have completed the G20 Orientation module. if not, ask all of them to complete it, it will give them a certificate too. Now for next steps, the Teacher coordinator will organise meetings with the eager  participants and explain the summit format and what is expected of them. They will also orient them on what G20 forum is. Once this. is done, they can be added as delegates. Once added as delegates, go to Plan Your YMG20 and depending upon their numbers you may design your summit"

    },
    {
        id: 19,
        q: " How do we plan venues, is there anything specific needed?",
        a: "Venues are crucial for YMG20. A bad venue can spoil the fun of debating. Make sure each Discussion Track gets. a separate room/hall and there is a hall that can sit all participants in a rectangular or circular format, facing each other preferably with a desk in from of each. If you feel there is a space or infrastructure constraint you may cut down on the number of participants. The venues should also be comfortable, and equipped with a microphone so that students can hear and discuss with each other."

    },
    {
        id: 20,
        q: "  What should participating students carry with them on the Event day?",
        a: "If you are using YM Discussion Board, the students should be allowed mobile phones, laptops or tablets with them to the venues. Else pen and paper will work too!"

    },
];

const FaqItem = ({ faq, index }) => {
    return (
        <div className="accordion-item border-0">
            <h4 className="accordion-header">
                <button
                    className={`accordion-button ${index == 0 ? "" : "collapsed"} fs-5`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accord${index}`}
                >
                    {faq.q}
                </button>
            </h4>
            <div
                id={`accord${index}`}
                className={`accordion-collapse collapse ${index == 0 ? "show" : ""}`}
                data-bs-parent="#accordionFAQ"
            >
                <div className="accordion-body">
                    <p className="text-dark fs-5">
                        {faq.a}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FaqPage = () => {
    return (
        <>
            <BreadCrumb heading={"FAQs"} />
            <section id="scrollspyFaq" className="faq section">
                <div className="container" style={{ maxWidth: "1000px" }}>
                    <div className=" text-center">
                        <span className="section-title-border mx-auto"></span>
                        <h2 className="section-title mb-2">Frequently Asked Questions</h2>
                        <p className="mb-5 fs-5">
                            Take a look at some of the most asked queries related to model G20
                            by aspiring participants in this section. If you still have more
                            unanswered questions, please <a href="#">contact us</a> here.
                        </p>
                    </div>
                    <div className="accordion" id="accordionFAQ">
                        {faqs.map((faq, index) => {
                            return <FaqItem key={index} index={index} faq={faq} />
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default FaqPage;
