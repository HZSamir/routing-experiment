import React from 'react';
import { useSelector } from 'react-redux'
import { Outlet, Link, useNavigate } from "react-router-dom";
//import { navigationSlice } from '../layouts/NavigationSlice.js';


const NavigationLayout = () => {
  const navigate = useNavigate();

  // We get the navigationStoreReducer from our redux store
  // And then we simply destructure its "insides", in this case
  // search, todo.... schedule. That way we have an easier access to them
  const { routes,
    search,
    todo,
    feed,
    staff,
    schedule,
  } = useSelector(
    (state) => state.navigationStoreReducer
  );


  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="navigationContainer">

      <div id="header">
        {routes.length > 1 && <button onClick={goBack} id="backButton">Back</button>}
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
              <Link to={search[search.length - 1] || "/"}>Search</Link>
            </li>
            <li>
              <Link to={todo[todo.length - 1] || "/todo"}>Todo</Link>
            </li>
            <li>
              <Link to={feed[feed.length - 1] || "/feed"}>Feed</Link>
            </li>
            <li>
              <Link to={staff[staff.length - 1] || "/staff"}>Staff</Link>
            </li>
            <li>
              <Link to={schedule[schedule.length - 1] || "/schedule"}>Schedule</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationLayout;