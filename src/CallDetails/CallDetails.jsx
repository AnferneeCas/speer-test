import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import HorizontalDivider from "../Dividers/HorizontalDivider.jsx";

const CallDetails = ({ call_id, onClose, onArchive }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [call, setCall] = useState({});

  useEffect(() => {
    // fetch data from API
    axios.get(`/activities/${call_id}`).then(({ data }) => {
      setCall(data);
    });
  }, [call_id]);

  const handleSubmit = (e) => {
    //   make call to API for archiving callss
    e.preventDefault();
    axios
      .post(`/activities/${call_id}`, { is_archived: !call.is_archived })
      .then(({ data }) => {
        onArchive();
      });
  };
  return (
    <div
      className="bg-white h-100 w-100 p-3"
      style={{ zIndex: 3000, minHeight: "500px", minWidth: "376px" }}
    >
      <div className="row">
        <div className="col-12 border-dotted-bottom">
          <div className="row">
            <div className="col-8 d-flex align-items-center">
              {call.call_type != "voicemail" ? (
                call.direction == "inbound" ? (
                  <i className="fas fa-phone-volume p-2 inbound-icon"></i>
                ) : (
                  <i className="fas fa-phone-slash p-2 outbound-icon"></i>
                )
              ) : (
                <i className="fas fa-voicemail"></i>
              )}

              <span className="ml-2"> {call.from}</span>
            </div>

            <div className="col-4">
              <span
                className="float-right cursor-pointer"
                onClick={() => {
                  onClose();
                }}
              >
                <i className="fas fa-times text-orange"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="col-12 pt-2 pb-2 border-dotted-bottom">
          <div className="row">
            <div className="col-1">
              <b className="mr-2"> To: </b>
            </div>
            <div className="col-11">
              <span className="float-left">{call.to}</span>
            </div>
          </div>
        </div>

        <div className="col-12 pt-2 pb-2 border-dotted-bottom">
          <div className="row">
            <div className="col-1">
              <b className="mr-2"> Via: </b>
            </div>
            <div className="col-11">
              <span className="float-left">{call.via}</span>
            </div>
          </div>
        </div>

        <div className="col-12 pt-2 pb-2 ">
          <div className="row">
            <div className="col-1">
              <b className="mr-2"> When: </b>
            </div>
            <div className="col-11">
              <span className="float-left pl-3">
                {moment(call.created_at).format("LL")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <button
          className={`btn btn-outline-${
            call.is_archived ? "secondary" : "info"
          } w-100 btn-sm mt-4`}
          type="submit"
        >
          {call.is_archived ? "Unarchive" : "Archive"}
        </button>
      </form>
    </div>
  );
};

export default CallDetails;
