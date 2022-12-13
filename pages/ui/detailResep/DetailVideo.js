import React from "react";
import { Layouts2 } from "../../../components/layouts/Layout2";

const DetailVideo = () => {
  return (
    <div>
      <Layouts2 />
      <div className="row">
        <div className="col-sm-9 px-5">
          <div className="flex-column">
            <div>
              <input type="file" placeholder="video" />
            </div>
            <div>
              <h1>judul</h1>
              <p>tanggal</p>
            </div>
          </div>
        </div>
        <div className="col-sm-3 px-5">
          <h3>Next</h3>
          <div>
            <div>video</div>
            <h4>judul</h4>
            <p>tanggal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVideo;
