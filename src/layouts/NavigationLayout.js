import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { popFromTab } from "./NavigationSlice";

const NavigationLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // We get the navigationStoreReducer from our redux store
  // And then we simply destructure its "insides", in this case
  // search, todo.... schedule. That way we have an easier access to them
  const navigation = useSelector((state) => state.navigationStoreReducer);

  // The goBack button should only be displayed if its own tab
  // Is inside a nested route

  const tabKey = location.pathname.split("/")[1] || "search";

  const goBack = useCallback(() => {
    const routeToGoBackTo = navigation[tabKey][navigation[tabKey].length - 2];

    if (routeToGoBackTo) {
      navigate(routeToGoBackTo, { replace: true });
      dispatch(popFromTab({ tabKey }));
    } else {
      // No route to go back to, this means we clear our entire stack
      // And go back to home
      navigate("/", { replace: true });
    }
  }, [location]);

  const shouldShowBackButton = navigation[tabKey]?.length > 1;
  console.log("tabKey", tabKey);
  console.log("routes[tabKey]", navigation[tabKey]);
  console.log("shouldShowBackButton", shouldShowBackButton);

  return (
    <div className="navigationContainer">
      <div id="header">
        {shouldShowBackButton && (
          <button onClick={goBack} id="backButton">
            Back
          </button>
        )}
        <div id="headerTitle">Title</div>
        <div id="headerAction">Action</div>
      </div>

      <div className="navigationOutletContainer">
        <Outlet />
      </div>

      <div className="navigationBarContainer">
        <nav>
          <ul>
            <li>
              <Link to={navigation.search[navigation.search.length - 1] || "/"}>
                Search
              </Link>
            </li>
            <li>
              <Link to={navigation.todo[navigation.todo.length - 1] || "/todo"}>
                Todo
              </Link>
            </li>
            <li>
              <Link to={navigation.feed[navigation.feed.length - 1] || "/feed"}>
                Feed
              </Link>
            </li>
            <li>
              <Link
                to={navigation.staff[navigation.staff.length - 1] || "/staff"}
              >
                Staff
              </Link>
            </li>
            <li>
              <Link
                to={
                  navigation.schedule[navigation.schedule.length - 1] ||
                  "/schedule"
                }
              >
                Schedule
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationLayout;
