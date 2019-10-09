import Photos from "../Components/Photos";
import Home from "../Components/Home";
import Users from "../Components/Users";
export const routes = [
  {
    path: "/photos",
    component: Photos,
    exact: true
  },
  {
    path: "/",
    component: Home,
    exact: false
  },
  {
    path: "/users",
    component: Users,
    exact: false
  }
];