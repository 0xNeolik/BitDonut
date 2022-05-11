import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Campaing from "../../Web3/campaing";
import web3 from "../../Web3/web3";

function CampaingRequests() {
  const [requests, setRequests] = useState([]);
  const [approversCounter, setApproversCounter] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const campaing = Campaing(id);

  const compound = async () => {
    const requestCounter = await campaing.methods.getRequestCount().call();

    const approversCounterFromFetch = await campaing.methods
      .approversCount()
      .call();
    setApproversCounter(approversCounterFromFetch);

    const requestsFromFetch = await Promise.all(
      Array(parseInt(requestCounter))
        .fill()
        .map((request, index) => {
          return campaing.methods.requests(index).call();
        })
    );
    setRequests(requestsFromFetch);
  };

  const onApprove = async (index) => {
    try {
      const accounts = await web3.eth.getAccounts();
      setMessage("Transaction in progress");

      await campaing.methods.approveRequest(index).send({
        from: accounts[0],
      });
      setMessage();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const onFinalize = async (index) => {
    try {
      const accounts = await web3.eth.getAccounts();
      setMessage("Transaction in progress");

      await campaing.methods.finalizeRequest(index).send({
        from: accounts[0],
      });
      setMessage();
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    compound();
  }, []);

  return (
    <>
      <div>Campaing Requests</div>
      <div>
        <Link to={`/campaigns/${id}/requests/new`}>Create a new Request</Link>
      </div>
      {requests.map((request, index) => {
        return (
          <div key={index}>
            <div>ID: {index}</div>
            <div>Description: {request.description}</div>
            <div>Recipient: {request.recipient}</div>
            <div>
              Objetive ETH: {web3.utils.fromWei(request.value, "ether")}
            </div>
            <div>
              Approvers: {request.approvalCount}/{approversCounter}
            </div>
            {!request.complete ? (
              <>
                <button onClick={onApprove.bind(null, index)}>
                  Approve request
                </button>
                <button onClick={onFinalize.bind(null, index)}>
                  Finalize request
                </button>
              </>
            ) : (
              <div>Request Complete</div>
            )}
          </div>
        );
      })}
      {message}
    </>
  );
}

export default CampaingRequests;
