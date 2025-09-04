import React, { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import {
  Route,
  Routes,
} from "react-router-dom";
import { useGlobalContext } from "global/context";
import YuvaLoader from "layout/loader/Loader/YuvaLoader";
import Layout from "Layout";
import useRoutes from "hooks/useRoutes";
import MainDashboardOutlet from "pages/dashboard/MainDashboardOutlet";
import DashboardAdminOutlet from "pages/Admin/DashboardAdminOutlet";
const StudentEditProfile = React.lazy(() =>
  import("pages/dashboard/components/student/EditProfile/StudentEditProfile")
);
const InstituteEditProfile = React.lazy(() =>
  import("pages/dashboard/components/institute/setting/InstituteEditProfile")
);
const Error = React.lazy(() => import("./pages/Error"));

function App() {
  const { publicRoutes, userRoutes, adminRoutes, settingRoutes } = useRoutes();
  const { userData } = useGlobalContext();
  {
    //!Important
    /*
    ------------TYPE DECLARED ------------
     0=>studentComponent
     1=>INSTITUTE
     2=>ADMIN 
     */
  }
  const userTypeChecker = (
    studentComponent,
    instituteComponent,
    AdminComponent
  ) => {
    switch (Number(userData.type)) {
      case 0:
        return studentComponent ? studentComponent : <Error />;
      case 4:
        return studentComponent ? studentComponent : <Error />;
      case 5:
        return studentComponent ? studentComponent : <Error />;
      case 1:
        return instituteComponent ? instituteComponent : <Error />;
      case 2:
        return AdminComponent ? AdminComponent : <Error />;
      default:
        return <Error />
    }
  };
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<YuvaLoader />}>
          <Routes>
            <Route
              path="/admin"
              element={<DashboardAdminOutlet />}
            >
              {adminRoutes?.map((routeItem, index) => (
                <Route key={index} index={routeItem?.index}
                  path={routeItem?.path} element={routeItem?.element} />
              ))}
            </Route>
            {/* User Internal Routes  */}
            <Route
              path="/dashboard"
              element={<MainDashboardOutlet />}
            >
              {userRoutes.map((routeItem, index) => (
                <Route
                  key={index}
                  index={routeItem?.index}
                  path={routeItem.path}
                  element={routeItem.element}
                >
                  {routeItem.children &&
                    routeItem.children.map((childRouteItem, childIndex) => (
                      <Route
                        key={childIndex}
                        index={childRouteItem?.index}
                        path={childRouteItem.path}
                        element={childRouteItem.element}
                      />
                    ))}
                </Route>
              ))}
            </Route>
            {/* Settings Routes */}
            <Route
              path="/edit"
              element={userTypeChecker(
                <StudentEditProfile />,
                <InstituteEditProfile />
              )}
            >
              {settingRoutes.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  index={childRoute.index}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))}
            </Route>
           
           
            {/* static Designs  */}
            {publicRoutes?.map((routeItem, index) => {
              return <Route key={index} exact path={routeItem?.path} element={routeItem?.component} />
            })}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
