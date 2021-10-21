import axios from "axios";
import moment from "moment";

import React, { useEffect, useState } from "react";
import HorizontalDivider from "../Dividers/HorizontalDivider.jsx";
import VerticalDivider from "../Dividers/VerticalDivider.jsx";
const ActivityDetail = ({ activity, onClick }) => {
  const [created_at, setCreated_at] = useState(moment(activity.created_at));

  return (
    <React.Fragment>
      <div className=" mt-3">
        <div
          className="w-100 row bg-white border-grey  m-1 rounded pt-1 pb-1 cursor-pointer "
          onClick={() => onClick(activity.id)}
        >
          <div className="col-2">
            {activity.call_type != "voicemail" ? (
              activity.direction == "inbound" ? (
                <i className="fas fa-phone-volume p-2 inbound-icon"></i>
              ) : (
                <i className="fas fa-phone-slash p-2 outbound-icon"></i>
              )
            ) : (
              <i className="fas fa-voicemail"></i>
            )}
          </div>

          <div className="col-7 ">
            {activity.from}
            {activity.call_type != "voicemail" ? (
              <div className="text-muted text-truncate">
                tried to call on {activity.to}
              </div>
            ) : null}
          </div>
          <div className="col-3">
            <div className="row h-100 p-0 text-grey">
              <div className="col-8 p-0 d-flex align-items-center justify-content-center">
                <span className="border-dotted-left pl-2">
                  {created_at.format("hh:mm")}
                </span>
              </div>
              <div className="col-4 d-flex align-items-center justify-content-center p-0 text-center">
                <span className="border-grey  w-100 float-right hour">
                  {created_at.format("a")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ActivityDetail;
