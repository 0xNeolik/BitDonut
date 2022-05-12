import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import factory from "../../Web3/factory";
import NavBar from "../Layout/NavBar";

import "./Campaigns.css";

function Campaings() {
  const [campaings, setCampaings] = useState([]);

  async function fetchData() {
    const campaingsFromFetch = await factory.methods
      .getDeployedCampaing()
      .call();

    setCampaings(campaingsFromFetch);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div id="display">
        <Link to={"/newCampaign"} id="btn-new-campaing">
          <button>Create a new Campaing </button>
        </Link>

        <div id="wrapper">
          {campaings.map((campaing) => {
            return (
              <Link to={`${campaing}`} id="section-campaigns">
                <div>
                  <p>Campaing Hash {campaing}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Campaings;
