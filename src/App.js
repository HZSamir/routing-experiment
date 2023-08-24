import React, { useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  UNSAFE_NavigationContext,
  useNavigate,
} from "react-router-dom";
import { last } from "lodash";
import NavigationLayout from "./layouts/NavigationLayout";
import SearchPage from "./pages/SearchPage";
import TodoPage from "./pages/TodoPage";
import FeedPage from "./pages/FeedPage";
import StaffPage from "./pages/StaffPage";
import SchedulePage from "./pages/SchedulePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import { pushRoute, popRoute, popFromRoutes } from "./layouts/NavigationSlice";
import "./App.css";

const useBackListener = ({ onPush, onPop }) => {
  const navigator = useContext(UNSAFE_NavigationContext).navigator;

  useEffect(() => {
    if (!onPush || !onPop) return;
    const listener = ({ location, action }) => {
      if (action === "PUSH") {
        onPush({ location, action });
      } else if (action === "POP") {
        onPop({ location, action });
      }
    };

    const unlisten = navigator.listen(listener);
    return unlisten;
  }, [onPush, onPop, navigator]);
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const disableListener = useRef(false);

  const navigation = useSelector((state) => state.navigationStoreReducer);

  const onPush = (payload) => {
    if (!disableListener.current) {
      dispatch(pushRoute(payload.location.pathname));
    } else {
      console.log("tried to push but listener was disabled");
    }
  };

  const onPop = (payload) => {
    console.log("do Nothing");
  };

  useBackListener({ onPush, onPop });

  console.log("navigation", navigation);

  const handlePushState = (e) => {
    console.log("pushing");
  };

  const handlePopState = (e) => {
    e.preventDefault();

    if (navigation.routes.length <= 1) return;

    let activeTab;
    //  navigation.routes[navigation.routes.length - 1].split("/")[1] || "search";
    const currentTab =
      navigation.routes[navigation.routes.length - 1].split("/")[1] || "search";
    if (last(navigation.routes) != currentTab) activeTab = currentTab;
    else
      activeTab =
        navigation.routes[navigation.routes.length - 2].split("/")[1] ||
        "search";

    // If the current route contains a parent
    // Go back to that first
    // const toGoTo = navigation[activeTab].length > 1 ? navigation[activeTab][navigation[activeTab].length - 2] : navigation.routes[navigation.routes.length - 2]

    let toGoTo;
    // Go back up in the tab
    // console.log("e", e);
    // console.log("navigation", navigation);
    // console.log("activeTab", activeTab);
    // console.log("length", navigation[activeTab].length);

    if (navigation[activeTab].length > 1) {
      console.log("Pop from tab");
      toGoTo = navigation[activeTab][navigation[activeTab].length - 2];

      disableListener.current = true;
      navigate(toGoTo);
      dispatch(popFromRoutes());
      disableListener.current = false;

      // Remove it from both tab reducer and routes reducer
    } else {
      // Go to previous tab
      console.log("Pop from routes");
      toGoTo = navigation.routes[navigation.routes.length - 2];

      disableListener.current = true;
      console.log("toGoTo", toGoTo);
      navigate(toGoTo);
      dispatch(popRoute(activeTab));
      disableListener.current = false;

      // Remove it from routes reducer
    }
  };

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("onpushstate", handlePushState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigation]);

  return (
    <div className="appContainer">
      <Routes>
        <Route path="/" element={<NavigationLayout />}>
          <Route index element={<SearchPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="profile" element={<ProfilePage />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
