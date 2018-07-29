import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Receipt from "@material-ui/icons/Receipt";
import Settings from "@material-ui/icons/Settings";
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import SignIn from "views/SignIn/SignIn.jsx";
import SignUp from "views/SignUp/SignUp.jsx";
import EmailVerification from "views/EmailVerification/EmailVerification.jsx";
import Reports from "views/Reports/Reports.jsx";
import Config from "views/Config/Config.jsx";

const dashboardRoutes = [
    {
      path: "/dashboard",
      sidebarName: "Dashboard",
      navbarName: "Dashboard",
      icon: Dashboard,
      component: DashboardPage
    },
    {
      path: "/reports",
      sidebarName: "Reports",
      navbarName: "Reports",
      icon: Receipt,
      component: Reports
    },
    {
      path: "/config",
      sidebarName: "Config",
      navbarName: "Config",
      icon: Settings,
      component: Config
    },
    {
        path: "/signin",
        sidebarName: "Sign in",
        navbarName: "Sign in",
        icon: Person,
        component: SignIn
    },
    {
        path: "/signup",
        sidebarName: "Sign up",
        navbarName: "Sign up",
        icon: Person,
        component: SignUp
    },
    {
        path: "/emailverification",
        sidebarName: "Email verification",
        navbarName: "Email verification",
        icon: Person,
        component: EmailVerification,
        token: false
    },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;