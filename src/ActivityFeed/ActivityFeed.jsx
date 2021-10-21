import moment from "moment";
import React, { useEffect, useState } from "react";
import HorizontalDivider from "../Dividers/HorizontalDivider.jsx";
import ActivityDetail from "./ActivityDetail.jsx";
const ActivityFeed = ({ feed, onClick }) => {
  const [structuredFeed, setStructuredFeed] = useState([]);

  useEffect(() => {
    //   Todo: this can and should be refactored
    var newFeed = [];
    feed.forEach((f) => {
      if (newFeed.length > 0) {
        var found = false;
        newFeed.some((nf, index) => {
          //date
          var date = moment(f.created_at).format("DD-MM-YYYY");
          var date2 = moment(nf.created_at).format("DD-MM-YYYY");

          // if date are the same
          if (date == date2) {
            nf.calls.push(f);

            // NOTE: AGROUPING CALLS BY CALL_TYPE AND PHONENUMBER CAN'T BE TESTED WITH THE CURRENT RESPONsE FROM THE API (this is mostly for showing a call counter)
            //look for the same phone number and call_type now to accumulate calls
            // var foundCall = false;
            // nf.users.some((user) => {
            //   if (user.phoneNumber == f.from) {

            //     foundCall = true;
            //     return true;
            //   }
            // });

            // if (!foundCall) {
            //   nf.users.push({
            //     phoneNumber: f.from,
            //     call_type: f.call_type,
            //     calls: [f],
            //   });
            // }

            found = true;
            return true;
          }
        });
        if (!found) {
          newFeed.push({
            created_at: f.created_at,
            calls: [f],
          });
        }
      } else {
        newFeed.push({
          created_at: f.created_at,
          calls: [f],
        });
      }
    });
    setStructuredFeed(newFeed);
  }, [feed]);

  return (
    <div className="activity-feed">
      <div className="row">
        <div className="col-12">
          {structuredFeed.map((f) => {
            // printing date subset
            return (
              <React.Fragment>
                <HorizontalDivider
                  text={moment(f.created_at).format("LL")}
                ></HorizontalDivider>
                {f.calls.map((user) => {
                  return (
                    <ActivityDetail
                      activity={user}
                      key={user.id}
                      onClick={onClick}
                    ></ActivityDetail>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
