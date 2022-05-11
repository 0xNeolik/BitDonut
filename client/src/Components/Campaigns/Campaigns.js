import React, { useState } from "react";
import { Link } from "react-router-dom";
import factory from "../../Web3/factory";

function Campaings() {
  const [campaings, setCampaings] = useState([]);

  async function componentDidMount() {
    const campaingsFromFetch = await factory.methods
      .getDeployedCampaing()
      .call();

    setCampaings(campaingsFromFetch);
  }

  componentDidMount();

  return (
    <>
      {campaings.map((campaing) => {
        return (
          <>
            <div>{campaing}</div>
            <Link to={`${campaing}`}>View campaing</Link>
          </>
        );
      })}
      <div>
        <Link to={"/newCampaign"}>Create a new Campaing</Link>
      </div>
    </>
  );
}

export default Campaings;
