import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Campaing from "../../Web3/campaing";
import web3 from "../../Web3/web3";
import ContributeForm from "./ContributeForm";

function CampaingDetails() {
  const { id } = useParams();

  const [dataCampaing, setDataCampaing] = useState([]);

  const campaing = Campaing(id);

  async function componentDidMount() {
    const dataFromFetch = await campaing.methods.getSummary().call();
    const balance = await web3.eth.getBalance(campaing.options.address);

    setDataCampaing({
      approversCount: dataFromFetch[0],
      minimumContribution: await web3.utils.fromWei(dataFromFetch[1], "ether"),
      numRequests: dataFromFetch[2],
      manager: dataFromFetch[3],
      balance: await web3.utils.fromWei(balance, "ether"),
    });
  }

  componentDidMount();

  return (
    <>
      <div>
        <p>Manager</p>
        <p>{dataCampaing.manager}</p>
        <p>
          The manager created this campaing and can create requests to withdraw
          money
        </p>
      </div>
      <div>
        <p>Minimal Contribution ( in Ether )</p>
        <p>{dataCampaing.minimumContribution}</p>
        <p>You must contribute at least this much wei to become an approver</p>
      </div>
      <div>
        <p>Campaing Balance ( in Ether )</p>
        <p>{dataCampaing.balance}</p>
      </div>
      <div>
        <p>Requests/requests</p>
        <p>{dataCampaing.numRequests}</p>
        <p>
          <Link to={`/campaigns/${id}/requests`}>View Request</Link>
        </p>
      </div>
      <div>
        <p>Approvers</p>
        <p>{dataCampaing.approversCount}</p>
      </div>
      <div>
        <ContributeForm address={id} />
      </div>
    </>
  );
}

export default CampaingDetails;
