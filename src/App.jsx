import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import ActivityFeed from "./ActivityFeed/ActivityFeed.jsx";
import { useTransition, animated } from "react-spring";
import Header from "./Header.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import { __RouterContext } from "react-router";
import AbsoluteWrapper from "./Utilities/AbsoluteWrapper.jsx";
import CallDetails from "./CallDetails/CallDetails.jsx";
import LoadingScreen from "./LoadingScreen/LoadingScreen.jsx";
import Backdrop from "./Utilities/Backdrop.jsx";

const App = () => {
  const [activityFeed, setActivityFeed] = useState([]);
  const [selectedCall, setSelectedCall] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [reload, setReload] = useState(1);
  const [loading, setLoading] = useState(false);

  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translate(15%,0)" },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-5%,0)" },
  });

  const callDetailsTransition = useTransition(showDetails, {
    from: { opacity: 0, x: 0, y: 800, position: "absolute", left: "0" },
    enter: { opacity: 1, y: 400, x: 0, position: "absolute", left: "0" },
    leave: { opacity: 0, x: 0, y: 800, position: "absolute", left: "0" },
  });

  // Axios configuration
  axios.defaults.baseURL = "https://aircall-job.herokuapp.com";

  useEffect(() => {
    setLoading(true);
    setShowDetails(false);

    // Getting Activity Feed from API
    axios.get("/activities").then(({ data }) => {
      setActivityFeed(data);
      setLoading(false);
    });
  }, [reload]);

  const handleClick = (call_id) => {
    setShowDetails(false);
    setSelectedCall(call_id);
    setShowDetails(true);
  };

  return (
    <div className="container position-relative">
      <Header />
      {loading ? <LoadingScreen></LoadingScreen> : null}

      {transitions((props, item) => (
        <animated.div style={props}>
          <Switch location={item}>
            {/* show feed hidding archived calls */}
            <Route exact path="/">
              <AbsoluteWrapper>
                <ActivityFeed
                  onClick={handleClick}
                  feed={activityFeed.filter((feed) => feed.is_archived != true)}
                ></ActivityFeed>
              </AbsoluteWrapper>
            </Route>

            {/* show feed with archived callss */}
            <Route path="/all">
              <AbsoluteWrapper>
                <ActivityFeed
                  feed={activityFeed}
                  onClick={handleClick}
                ></ActivityFeed>
              </AbsoluteWrapper>
            </Route>
          </Switch>
        </animated.div>
      ))}

      {showDetails ? <Backdrop></Backdrop> : null}

      {callDetailsTransition((props, item) =>
        item ? (
          <animated.div style={props}>
            <CallDetails
              call_id={selectedCall}
              onClose={() => {
                setShowDetails(false);
              }}
              onArchive={() => {
                setReload(reload + 1);
              }}
            ></CallDetails>
          </animated.div>
        ) : null
      )}

      <Navbar feed={activityFeed}></Navbar>
    </div>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);

export default App;
