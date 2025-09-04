import React, { lazy } from "react";
import SchoolManagementPlan from "pages/dashboard/components/common/SchoolManagmentPlan";
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ChecklistIcon from '@mui/icons-material/Checklist';
import {
  AnalyticsOutlined,
  ArrowForwardIosOutlined,
  BadgeOutlined,
  BookOnlineOutlined,
  SchoolOutlined,
  DashboardOutlined,
  EmailOutlined,
  FormatQuoteOutlined,
  GroupOutlined,
  HouseOutlined,
  PasswordOutlined,
  Person2Outlined,
  PollOutlined,
  QuestionAnswerOutlined,
  BookOutlined,
  SettingsOutlined,
  SubscriptionsOutlined,
  VideoCameraBackOutlined,
  School,
  EmergencyRecording,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "global/context";
import StudentDashboard from "pages/dashboard/components/student/StudentDashboard";
import EnrolledCourses from "pages/dashboard/components/common/EnrolledCourses";
import DashboardAdmin from "pages/Admin/pages/DashboardAdmin";
import AdminAnalytics from "pages/Admin/pages/analytics/AdminAnalytics";
import { AccountVerify } from "components/auth";
import EditIntituteDetails from "components/admin/user/institute/EditIntituteDetails";
import Compliance from "pages/compliance/Compliance";
import ComplianceResult from "pages/compliance/ComplianceResult";
import AttemptsTable from "pages/compliance/components/AttemptsTable";
import EditStudentData from "components/admin/user/institute/EditStudentData";
import { TeamMainComponent } from "pages/team/component";
import CertifiedTeacherDetails from "pages/dashboard/components/institute/CertifiedTeacherDetails";
import { UncertifiedTeacherDetails } from "pages/dashboard/components/institute/UncertifiedTeacherDetails";
import { TotalTeacherIn_Institute } from "pages/dashboard/components/institute/TotalTeacherIn_Institute";
import { Add_School_Scroll } from "pages/Admin/pages/Add_School_scroll/Add_School_Scroll";
import EmergencyManagementCheckListPlan from "pages/Registration/EmergencyManagmentCheckList/EmergencyManagementCheckListPlan.jsx";
import SSPFORM from "pages/compliance/components/SSPFORM";
import ManagementPlan from "components/ManagementPlan/ManagementPlan";
import SchoolForm from "pages/SchoolForm/SchoolForm.jsx";
import { School2Icon } from "lucide-react";
const Login = lazy(() => import("pages/Auth/Login"));
const ForgetPassword = lazy(() =>
  import("pages/Auth/reset-password/ForgetPassword")
);
const ResetPassword = lazy(() =>
  import("pages/Auth/reset-password/ResetPassword")
);
const AllBlogs = lazy(() => import("pages/static/Blog/AllBlogs"));
const SingleBlog = lazy(() => import("pages/static/Blog/SingleBlog"));
const AllNews = lazy(() => import("pages/static/News/SingleNews"));
const SingleNews = lazy(() => import("pages/static/News/SingleNews"));
const DynamicNews = lazy(() => import("pages/static/News/DynamicNews"));
const InstituteRegister2 = lazy(() =>
  import("pages/Registration/InstituteRegister2")
);
const StudentOpenRegister = lazy(() =>
  import("pages/Registration/student/StudentOpenRegister")
);
const AllCourses = lazy(() => import("pages/course/AllCourses"));
const CourseDetails = lazy(() => import("pages/course/CourseDetails"));
const ShowCertificate = lazy(() =>
  import("pages/dashboard/components/common/ShowCertificate")
);
const About = lazy(() => import("pages/static/pages/About/About"));
const Career = lazy(() => import("pages/static/pages/About/Career"));
const Event = lazy(() => import("pages/static/pages/About/Event"));
const Community = lazy(() => import("pages/static/pages/Community/Community"));
const Partner = lazy(() => import("pages/static/pages/Partner/Partner"));
const SisCertification = lazy(() =>
  import("pages/static/pages/Solution/SisCertification")
);
const SisCompliance = lazy(() =>
  import("pages/static/pages/Solution/SisCompliance")
);
const SisLearning = lazy(() =>
  import("pages/static/pages/Solution/SisLearning")
);
const ContactPage = lazy(() =>
  import("pages/static/pages/contact/ContactPage")
);
const TermsAndConditions = lazy(() =>
  import("pages/static/pages/TermsAndConditions")
);
const Home = lazy(() => import("pages/static/pages/home/Home"));
const InstitutePublicPage = lazy(() =>
  import("pages/dashboard/components/institute/InstitutePublicPage")
);
const Error = lazy(() => import("pages/Error"));
const YuvaLoader = lazy(() => import("layout/loader/Loader/YuvaLoader"));
const DashboardInstitute = lazy(() =>
  import("pages/dashboard/components/institute/DashboardInstitute")
);
const InstituteDataTable = lazy(() =>
  import("pages/Admin/components/InstituteDataTable")
);
const AdminCompliance = lazy(() => import("pages/Admin/AdminCompliance"));
const AdminComplianceQuestion = lazy(() =>
  import("pages/Admin/pages/AdminComplianceQuestion")
);
const AdminComplianceCategory = lazy(() =>
  import("pages/Admin/pages/AdminComplianceCategory")
);
const SingleInstitutesData = lazy(() =>
  import("pages/Admin/pages/SingleInstitutesData")
);
const StudentDataTable = lazy(() =>
  import("pages/Admin/components/StudentDataTable")
);
const WebsiteContent = lazy(() =>
  import("pages/Admin/pages/websitecontent/WebsiteContent")
);
const Certificates = lazy(() => import("pages/Admin/pages/Certificates"));
const QuotesDataTable = lazy(() =>
  import("pages/Admin/components/QuotesDataTable")
);
const Blogs = lazy(() => import("pages/Admin/pages/websitecontent/Blogs"));
const AddBlog = lazy(() => import("pages/Admin/pages/websitecontent/AddBlog"));
const EditBlog = lazy(() =>
  import("pages/Admin/pages/websitecontent/EditBlog")
);
const News = lazy(() => import("pages/Admin/pages/websitecontent/News"));
const AddNews = lazy(() => import("pages/Admin/pages/websitecontent/AddNews"));
const EditNews = lazy(() =>
  import("pages/Admin/pages/websitecontent/EditNews")
);
const States = lazy(() => import("pages/Admin/pages/States"));
const AdminCourses = lazy(() =>
  import("pages/Admin/pages/courses/AdminCourses")
);
const AdminCoursesSection = lazy(() =>
  import("pages/Admin/pages/courses/AdminCoursesSection")
);
const AdminCoursesSectionVideo = lazy(() =>
  import("pages/Admin/pages/courses/AdminCoursesSectionVideo")
);
const QuizQuestions = lazy(() =>
  import("pages/Admin/pages/websitecontent/QuizQuestions")
);
const SingleState = lazy(() => import("pages/Admin/pages/SingleState"));
const StudentPoll = lazy(() => import("pages/Admin/pages/StudentPoll"));
const Contact = lazy(() => import("pages/Admin/pages/Contact"));
const InstituteAffiliatedinstitute = lazy(() =>
  import("pages/dashboard/components/institute/InstituteAffiliatedinstitute")
);
const InstituteCertifiedUser = lazy(() =>
  import("pages/dashboard/components/institute/InstituteCertifiedUser")
);
const InstituteEnrolledUser = lazy(() =>
  import("pages/dashboard/components/institute/InstituteEnrolledUser")
);
const InstituteRegisteredUser = lazy(() =>
  import("pages/dashboard/components/institute/InstituteRegisteredUser")
);
const SingleForumPage = lazy(() => import("pages/Forum/SingleForumPage"));
const AllQuestions = lazy(() =>
  import("pages/Forum/components/Questions/AllQuestions")
);
const Forum = lazy(() => import("pages/Forum/Forum"));
const IssuedCertificates = lazy(() =>
  import("pages/dashboard/components/common/IssuedCertificates")
);
const CoursePlayerContainer = lazy(() =>
  import("pages/courseplayer/CoursePlayerContainer")
);
const CourseScreen = lazy(() =>
  import("pages/courseplayer/components/CourseScreen")
);
const PrintCertificate = lazy(() =>
  import("pages/dashboard/components/common/PrintCertificate")
);
const EditBasicDetails = lazy(() =>
  import("pages/dashboard/components/student/EditProfile/EditBasicDetails")
);
const InstituteBasicDetails = lazy(() =>
  import("pages/dashboard/components/institute/setting/InstituteBasicDetails")
);
const EditProfilePic = lazy(() =>
  import("pages/dashboard/components/student/EditProfile/EditProfilePic")
);
const InstituteProfilePic = lazy(() =>
  import("pages/dashboard/components/institute/setting/InstituteProfilePic")
);
const EditPassword = lazy(() =>
  import("pages/dashboard/components/student/EditProfile/EditPassword")
);
const InstituteEditPassword = lazy(() =>
  import("pages/dashboard/components/institute/setting/InstituteEditPassword")
);
const EditAdditionalDetails = lazy(() =>
  import("pages/dashboard/components/student/EditProfile/EditAdditionalDetails")
);
const InstituteAdditionalDetails = lazy(() =>
  import(
    "pages/dashboard/components/institute/setting/InstituteAdditionalDetails"
  )
);
const InstituteEditPreference = lazy(() =>
  import("pages/dashboard/components/institute/setting/InstituteEditPreference")
);

const FAQ = lazy(()=> import("pages/FAQ"));

const PublicOnlyRoute = ({ component }) => {
  const { token } = useGlobalContext();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return <>{!token ? component : <YuvaLoader space={true} />}</>;
};
const PrivateRoute = ({ component, roles }) => {
  const navigate = useNavigate();
  const { userData } = useGlobalContext();
  React.useEffect(() => {
    if (!roles?.includes(userData.role)) {
      navigate("/");
    }
  }, []);
  return <>{roles?.includes(userData.role) ? component : <YuvaLoader />}</>;
};
const useRoutes = (props) => {
  const { userData } = useGlobalContext();
  const userTypeChecker = (
    studentComponent,
    instituteComponent,
    AdminComponent,
    coordinatorComp
  ) => {
    switch (userData.role) {
      case "teacher":
      case "student":
        return studentComponent ? studentComponent : <Error />;
      case "institute":
        return instituteComponent ? instituteComponent : <Error />;
      case "coordinator":
        return coordinatorComp ? coordinatorComp : <Error />;
      case "admin":
        return AdminComponent ? AdminComponent : <Error />;
      default:
        return <Error />;
    }
  };

  const publicRoutes = [
    //Index Page
    { path: "/", component: <Home /> },
    //Static Pages
    { path: "/about", component: <About /> },
    {path: "/faq", component: <FAQ />},
    { path: "/event", component: <Event /> },
    { path: "/partner", component: <Partner /> },
    { path: "/career", component: <Career /> },
    { path: "/compliance", component: <SisCompliance /> },
    { path: "/learning", component: <SisLearning /> },
    { path: "/certification", component: <SisCertification /> },
    { path: "/community", component: <Community /> },
    { path: "/contact", component: <ContactPage /> },
    // Blog Routes
    { path: "/blog", component: <AllBlogs /> },
    { path: "/blog/:slug", component: <SingleBlog /> },
    // News Routes
    // { path: "/news", component: <AllNews /> },
    { path: "/news", component: <DynamicNews /> },
    { path: "/news/:slug", component: <SingleNews /> },
    
    // Course Routes
    { path: "/courses", component: <AllCourses /> },
    { path: "/courses/:slug", component: <CourseDetails /> },
    { path: "/course/detail/:slug", component: <CourseDetails /> },
    {
      path: "/courses/:slug/certificates/:certkey",
      component: <ShowCertificate />,
    },
    // Auth
    { path: "/auth/account-verify/:token", component: <AccountVerify /> },
    //Protected Routes
    { path: "/login", component: <PublicOnlyRoute component={<Login />} /> },
    {
      path: "/registration",
      component: <PublicOnlyRoute component={<InstituteRegister2 />} />,
    },
    {
      path: "/:state/registration",
      component: <PublicOnlyRoute component={<InstituteRegister2 />} />,
    },
    {
      path: "/registration/:user",
      component: <PublicOnlyRoute component={<StudentOpenRegister />} />,
    },
    {
      path: "/forget-password",
      component: <PublicOnlyRoute component={<ForgetPassword />} />,
    },
    {
      path: "/auth/password-reset/:token",
      component: <PublicOnlyRoute component={<ResetPassword />} />,
    },
    {
      path: "/:slug/",
      component: <PublicOnlyRoute component={<InstitutePublicPage />} />,
    },
    {
      path: "/:slug/:user",
      component: <PublicOnlyRoute component={<InstitutePublicPage />} />,
    },
    // important Static Routes
    { path: "/terms-conditions", component: <TermsAndConditions /> },
    { path: "*", component: <Error /> },
    { path: "/certified-Teacher", component: <CertifiedTeacherDetails /> },
    { path: "/uncertified-Teacher", component: <UncertifiedTeacherDetails /> },
      // { path: "/ssp-form", component: <SSPFORM /> },
    { path: "/All-Teacher", component: <TotalTeacherIn_Institute /> },
  ];

  const adminRoutes = [
    {
      path: "/admin/",
      element: (
        <PrivateRoute component={<DashboardAdmin />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/institutes",
      element: (
        <PrivateRoute component={<InstituteDataTable />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/team",
      element: (
        <PrivateRoute component={<TeamMainComponent />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/compliance",
      element: (
        <PrivateRoute component={<AdminCompliance />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/compliance/questions/:id",
      element: (
        <PrivateRoute
          component={<AdminComplianceQuestion />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/compliance/category/:id",
      element: (
        <PrivateRoute
          component={<AdminComplianceCategory />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/analytics",
      element: (
        <PrivateRoute component={<AdminAnalytics />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/AddSchools",
      element: (
        <PrivateRoute component={<Add_School_Scroll />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/editdetail/institute/:id",
      element: (
        <PrivateRoute component={<EditIntituteDetails />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/institutes/:id",
      element: (
        <PrivateRoute component={<SingleInstitutesData />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/users",
      element: (
        <PrivateRoute component={<StudentDataTable />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/editdetail/users/:id",
      element: (
        <PrivateRoute component={<EditStudentData />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/content",
      element: (
        <PrivateRoute component={<WebsiteContent />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/certificates",
      element: <PrivateRoute component={<Certificates />} roles={["admin"]} />,
    },
    {
      path: "/admin/quotes",
      element: (
        <PrivateRoute component={<QuotesDataTable />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/blogs",
      element: <PrivateRoute component={<Blogs />} roles={["admin"]} />,
    },
    {
      path: "/admin/blogs/add",
      element: <PrivateRoute component={<AddBlog />} roles={["admin"]} />,
    },
    {
      path: "/admin/blogs/edit/:id",
      element: <PrivateRoute component={<EditBlog />} roles={["admin"]} />,
    },
    {
      path: "/admin/news",
      element: <PrivateRoute component={<News />} roles={["admin"]} />,
    },
    {
      path: "/admin/news/add",
      element: <PrivateRoute component={<AddNews />} roles={["admin"]} />,
    },
    {
      path: "/admin/news/edit/:id",
      element: <PrivateRoute component={<EditNews />} roles={["admin"]} />,
    },
    {
      path: "/admin/states",
      element: <PrivateRoute component={<States />} roles={["admin"]} />,
    },
    {
      path: "/admin/courses",
      element: <PrivateRoute component={<AdminCourses />} roles={["admin"]} />,
    },
    {
      path: "/admin/quiz/:quiz",
      element: <PrivateRoute component={<QuizQuestions />} roles={["admin"]} />,
    },
    {
      path: "/admin/courses/sections/:id",
      element: (
        <PrivateRoute component={<AdminCoursesSection />} roles={["admin"]} />
      ),
    },
    {
      path: "/admin/courses/sections/:id/videos/:id",
      element: (
        <PrivateRoute
          component={<AdminCoursesSectionVideo />}
          roles={["admin"]}
        />
      ),
    },
    {
      path: "/admin/courses/sections/:id/videos/:id/:quiz",
      element: <PrivateRoute component={<QuizQuestions />} roles={["admin"]} />,
    },
    {
      path: "/admin/states/:id",
      element: <PrivateRoute component={<SingleState />} roles={["admin"]} />,
    },
    {
      path: "/admin/createpoll",
      element: <PrivateRoute component={<StudentPoll />} roles={["admin"]} />,
    },
    {
      path: "/admin/contactus",
      element: <PrivateRoute component={<Contact />} roles={["admin"]} />,
    },
  ];

  const userRoutes = [
    {
      index: true,
      element: userTypeChecker(
        <StudentDashboard />,
        <DashboardInstitute />,
        null,
        <StudentDashboard />
      ),
    },
    {
      path: "/dashboard/mycourses",
      element: userTypeChecker(
        <EnrolledCourses />,
        null,
        null,
        <EnrolledCourses />
      ),
    },
    //  {
    //   path: "/dashboard/ssp",
    //   element: userTypeChecker(
    //     <SSPFORM />,
    //     null,
    //     null,
    //     <SSPFORM />
    //   ),
    // },
     {
      path: "/dashboard/emergeny management checklist",
      element: userTypeChecker(
        <EmergencyManagementCheckListPlan />,
        null,
        null,
        <EmergencyManagementCheckListPlan />
      ),
    },
    {
      path: "/dashboard/mycertificates",
      element: userTypeChecker(
        <IssuedCertificates />,
        null,
        null,
        <IssuedCertificates />
      ),
    },
     {
      path: "/dashboard/ssp",
      element: userTypeChecker(
        <SSPFORM/>,
        null,
        null,
        <SSPFORM />
      ),
    },
     {
      path: "/dashboard/rolesandres",
      element: userTypeChecker(
        <SchoolForm/>,
        null,
        null,
        <SchoolForm/>
      ),
    },
    {
      path: "/dashboard/forum",
      element: userTypeChecker(<Forum />, <Forum />, <Forum />, <Forum />),
      children: [
        {
          index: true,
          element: userTypeChecker(<AllQuestions />),
        },
        {
          path: "/dashboard/forum/:slug",
          element: userTypeChecker(<SingleForumPage />),
        },
      ],
    },

    // ROUTES COMPLIANCE
    {
      path: "/dashboard/school-compliance/:complianceid",
      element: userTypeChecker(null, <Compliance />, null, <Compliance />),
    },
    {
      path: "/dashboard/school-compliance/:complianceid/continue/:reportId",
      element: userTypeChecker(null, <Compliance />, null, <Compliance />),
    },
    {
      path: "/dashboard/school-compliance/:complianceid/continue/:reportId/edit/currentPage/:page",
      element: userTypeChecker(null, <Compliance />, null, <Compliance />),
    },
    {
      path: "/dashboard/school-compliance/report/:resultid",
      element: userTypeChecker(
        null,
        <ComplianceResult />,
        null,
        <ComplianceResult />
      ),
    },
    {
      path: "/dashboard/school-compliance/attempt-table",
      element: userTypeChecker(
        null,
        <AttemptsTable />,
        null,
        <AttemptsTable />
      ),
    },
     {
      path: "/dashboard/ssp-form",
      element: userTypeChecker(
        null,
        <SSPFORM />,
        null,
        <SSPFORM />
      ),
    },
     {
      path: "/dashboard/school-management Plan",
      element: userTypeChecker(
        null,
        <ManagementPlan />,
        null,
        <ManagementPlan />
      ),
    },
    {
      path:'/dashboard/School-Dm',
      element:userTypeChecker(
        null,
        <SchoolForm/>,
        null,
        <SchoolForm/>
      )
    }
,
    // ROUTES INSTITUTE DASHBOARD
    {
      path: "/dashboard/registeration/:role",
      element: userTypeChecker(
        null,
        <InstituteRegisteredUser />,
        null,
        <InstituteRegisteredUser />
      ),
    },
    {
      path: "/dashboard/enrollments/:role",
      element: userTypeChecker(
        null,
        <InstituteEnrolledUser />,
        null,
        <InstituteEnrolledUser />
      ),
    },
    {
      path: "/dashboard/certifications/:role",
      element: userTypeChecker(
        null,
        <InstituteCertifiedUser />,
        null,
        <InstituteCertifiedUser />
      ),
    },
    {
      path: "/dashboard/affiliate-institutes",
      element: userTypeChecker(null, <InstituteAffiliatedinstitute />),
    },
    {
      path: "/dashboard/affiliate-institutes/:id",
      element: userTypeChecker(null, <SingleInstitutesData />),
    },
    // student Dashboard
    {
      path: "/dashboard/certificate/:courseId",
      element: userTypeChecker(<PrintCertificate />),
    },
    {
      path: "/dashboard/courseview/:courseId",
      element: userTypeChecker(
        <CoursePlayerContainer />,
        null,
        null,
        <CoursePlayerContainer />
      ),
      children: [
        {
          index: true,
          element: userTypeChecker(
            <CourseScreen />,
            null,
            null,
            <CourseScreen />
          ),
        },
      ],
    },
  ];
  const settingRoutes = [
    {
      index: true,
      path: "/edit",
      element: userTypeChecker(
        <EditBasicDetails />,
        <InstituteBasicDetails />,
        null,
        <EditBasicDetails />
      ),
    },
    {
      path: "/edit/password",
      element: userTypeChecker(
        <EditPassword />,
        <InstituteEditPassword />,
        null,
        <EditPassword />
      ),
    },
    {
      path: "/edit/preference",
      element: userTypeChecker(
        <EditAdditionalDetails />,
        <InstituteEditPreference />,
        null,
        <EditAdditionalDetails />
      ),
    },
  ];

  // roles are
  /* student parent teacher coordinator instititute staff admin*/

  const sideDrawer = [
    {
      icon: <DashboardOutlined />,
      path: "/dashboard/",
      title: "Dashboard",
      roles: ["student", "teacher", "coordinator", "coordinator", "institute"],
      dock: true,
    },
    {
      icon: <BookOutlined />,
      path: "/dashboard/school-compliance/attempt-table",
      title: "Compliance",
      roles: ["institute", "coordinator"],
      dock: true,
    },
     {
      icon: <ViewStreamIcon />,
      path: "/dashboard/ssp-form",
      title: "SSP FORM",
      roles: ["institute", "coordinator"],
      dock: true,
    },
     {
      icon: <ChecklistIcon/>,
      path: "/dashboard/school-management Plan",
      title: "School risk management plan",
      roles: ["institute", "coordinator"],
      dock: true,
    },
    {
      icon:<School2Icon/>,
      path:"/dashboard/School-Dm",
      title:"School-Dm Profile",
      roles:["institute","coordinator"],
      dock:true,
    },
    {
      icon: <BookOutlined />,
      path: "/admin/team",
      title: "Team Member",
      roles: ["admin"],
      dock: true,
    },
    {
      icon: <Person2Outlined />,
      path: "/dashboard/registeration/coordinator",
      title: "Safety Coordinators",
      roles: ["institute"],
      dock: true,
    },
    {
      icon: <Person2Outlined />,
      path: "/dashboard/registeration/teacher",
      title: "Safety Teachers",
      roles: ["institute", "coordinator"],
      dock: true,
    },
   


    {
      icon: <SubscriptionsOutlined />,
      path: "#",
      title: "Enrollments",
      roles: ["institute", "coordinator"],
      dock: false,
      subList: [
        {
          icon: <Person2Outlined />,
          path: "dashboard/enrollments/teacher",
          title: "Teacher Enrollments",
          roles: ["institute", "coordinator"],
        },
        {
          icon: <SchoolOutlined />,
          path: "dashboard/enrollments/student",
          title: "Student Enrollments",
          roles: ["institute", "coordinator"],
        },
      ],
    },


    {
      icon: <BadgeOutlined />,
      path: "#",
      title: "Certfications",
      roles: ["institute", "coordinator"],
      dock: false,
      subList: [
        {
          icon: <Person2Outlined />,
          path: "dashboard/certifications/teacher",
          title: "Teacher Certifications",
          roles: ["institute", "coordinator"],
        },
        {
          icon: <SchoolOutlined />,
          path: "dashboard/certifications/student",
          title: "Student Certifications",
          roles: ["institute", "coordinator"],
        },
      ],
    },

    {
      icon: <SubscriptionsOutlined />,
      path: "/dashboard/mycourses",
      title: "My Courses",
      roles: ["student", "teacher", "coordinator"],
      dock: true,
    },
     {
      icon: <School />,
      path: "/dashboard/ssp",
      title: "SSP Form",
      roles: ["student", "teacher", "coordinator"],
      dock: true,
    },
     {
      icon: <EmergencyRecording />,
      path: "/dashboard/emergeny management checklist",
      title: "Emergency Management CheckList",
      roles: ["student", "teacher", "coordinator"],
      dock: true,
    },
    {
      icon: <BadgeOutlined />,
      path: "/dashboard/mycertificates",
      title: "My Certificates",
      roles: ["student", "teacher", "coordinator"],
      dock: true,
    },
     {
      icon: <BadgeOutlined />,
      path: "/dashboard/rolesandres",
      title: "School DM",
      roles: ["student", "teacher", "coordinator"],
      dock: true,
    },
    //   {
    //   icon: <BadgeOutlined />,
    //   path: "/dashboard/ssp",
    //   title: "ssp",
    //   roles: ["student", "teacher", "coordinator"],
    //   dock: true,
    // },
    {
      icon: <QuestionAnswerOutlined />,
      path: "/dashboard/forum",
      title: "Q&A Portal",
      roles: ["student", "teacher", "coordinator"],
      dock: false,
    },
    {
      icon: <SettingsOutlined />,
      path: "/edit/",
      title: "Settings",
      roles: ["institute", "student", "teacher", "staff", "coordinator"],
      dock: true,
    },
    {
      icon: <GroupOutlined />,
      path: "/admin/",
      title: "Admin Users",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <QuestionAnswerOutlined />,
      path: "/admin/compliance",
      title: "Compliances",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <AnalyticsOutlined />,
      path: "/admin/analytics",
      title: "Analytics",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <AnalyticsOutlined />,
      path: "/admin/AddSchools",
      title: "School",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <HouseOutlined />,
      path: "/admin/institutes",
      title: "Institutes",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <SchoolOutlined />,
      path: "/admin/users",
      title: "Users",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <BadgeOutlined />,
      path: "/admin/certificates",
      title: "Certificates",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <FormatQuoteOutlined />,
      path: "/admin/content",
      title: "Content",
      roles: ["admin"],
      dock: false,
      subList: [
        {
          icon: <FormatQuoteOutlined />,
          path: "/admin/content",
          title: "Website Content",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <FormatQuoteOutlined />,
          path: "/admin/quotes",
          title: "Quotes",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <DashboardOutlined />,
          path: "/admin/blogs",
          title: "Blogs",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <DashboardOutlined />,
          path: "/admin/news",
          title: "News",
          roles: ["admin"],
          dock: false,
        },
        {
          icon: <PollOutlined />,
          path: "/admin/createPoll",
          title: "Public Polls",
          roles: ["admin"],
          dock: false,
        },
      ],
    },
    {
      icon: <VideoCameraBackOutlined />,
      path: "/admin/courses",
      title: "Courses",
      roles: ["admin"],
      dock: false,
    },
    {
      icon: <EmailOutlined />,
      path: "/admin/contactUs",
      title: "Contacts",
      roles: ["admin"],
      dock: false,
    },
  ];
  const MegaMenuArr = [
    {
      id: 1,
      title: "Solutions",
      icon: <BookOnlineOutlined />,
      state: props?.solutionCollapse,
      setState: props?.setSolutionCollapse,
      links: [
        {
          icon: <ArrowForwardIosOutlined />,
          name: "SIS Learning",
          path: "/learning",
          description:
            "Whether it is a student, teacher, staff or a parent, we have everything they ought to know about safety in your school. Packaged as training, courses and exercises, get access to the most comprehensive school safety modules ever created.",
        },
        {
          icon: <ArrowForwardIosOutlined />,
          name: "SIS Compliances",
          path: "/compliance",
          description:
            "An easy to use interface built for the school administration to ensure that your school meets the mandatory safety standards prescribed by the Government",
        },
        {
          icon: <ArrowForwardIosOutlined />,
          name: "SIS Certifications",
          path: "/certification",
          description:
            "It's time to get certified! We have special training sessions with certifications for school staff, students and parents alike. These certifications will help us create school safety experts for sustainable schools.",
        },
      ],
    },
    {
      id: 2,
      icon: <GroupOutlined />,
      title: "About",
      state: props?.aboutCollapse,
      setState: props?.setAboutCollapse,
      links: [
        {
          icon: <ArrowForwardIosOutlined />,
          name: "About Us",
          path: "/about",
          description:
            "Read about our vision, mission and story and know more about values that guide us at SafeInSchool.",
        },
        {
          icon: <ArrowForwardIosOutlined />,
          name: "Blogs",
          path: "/blog",
          description:
            "Get the latest news on our events, programmes and initiatives as and when they happen.",
        },
        {
          icon: <ArrowForwardIosOutlined />,
          name: "Events",
          path: "/event",
          description:
            "Check the latest upcoming and past events and get dates for our webinars, trainings and podcasts",
        },
        {
          icon: <ArrowForwardIosOutlined />,
          name: "Careers",
          path: "/career",
          description:
            "Join our mission to create safer schools as a member of our growing team. Browse career opportunities at SafeInSchool.",
        },
      ],
    },
  ];
  return {
    publicRoutes,
    adminRoutes,
    sideDrawer,
    MegaMenuArr,
    userRoutes,
    settingRoutes,
  };
};

export default useRoutes;
