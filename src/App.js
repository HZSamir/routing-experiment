import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useLocation,
  UNSAFE_NavigationContext,
  useNavigate,
} from "react-router-dom";
import NavigationLayout from "./layouts/NavigationLayout";
import SearchPage from "./pages/SearchPage";
import TodoPage from "./pages/TodoPage";
import FeedPage from "./pages/FeedPage";
import StaffPage from "./pages/StaffPage";
import SchedulePage from "./pages/SchedulePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import { pushRoute, popRoute, popFromTab } from "./layouts/NavigationSlice";
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

  const navigation = useSelector((state) => state.navigationStoreReducer);

  console.log("navigation", navigation);

  const onPush = (payload) => {
    dispatch(pushRoute(payload.location.pathname));
  };
  const onPop = (payload) => {
    dispatch(popRoute(payload.location.pathname));
    const tabKey = payload.location.pathname.split("/")[1] || "search";
    // Get the route which we should go back to.
    // Then pop from the tab stack
    const routeToGoBackTo = navigation[tabKey][navigation[tabKey].length - 1];
    if (routeToGoBackTo) {
      navigate(routeToGoBackTo, { replace: true });
      dispatch(popFromTab({ tabKey }));
    } else {
      // No route to go back to, this means we clear our entire stack
      // And go back to home
      navigate("/", { replace: true });
    }
  };

  useBackListener({ onPush, onPop });

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
