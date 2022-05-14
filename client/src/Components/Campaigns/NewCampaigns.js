import React, { useState } from "react";
import factory from "../../Web3/factory";
import web3 from "../../Web3/web3";
import { useNavigate } from "react-router-dom";
import NavBar from "../Layout/NavBar";

function NewCampaings() {
  const [message, setMessage] = useState("");
  const [minimalAmount, setMinimalAmount] = useState("");
  const [urlEther, setUrlEther] = useState("");
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();

      setMessage("Transaction in progress");
      const amount = await web3.utils.toWei(minimalAmount, "ether");

      await factory.methods
        .createCampaing(amount)
        .send({
          from: accounts[0],
        })
        .on("transactionHash", (hash) => {
          setUrlEther("https://rinkeby.etherscan.io/tx/" + hash);
        });

      navigate("/campaigns");
      setMessage("");
    } catch (err) {
      setMessage(err.message);
      setTimeout(() => {
        setMessage("");
      }, 6000);
    }
  };
  return (
    <>
      <NavBar />
      <div id="new-campaing-bg">
        <div id="form-new-campaign">
          <div>
            <h1>Create a new Campaign</h1>
            <form onSubmit={handleSubmit}>
              <p>
                <label>Minimal Contribution</label>
                <input
                  onChange={(event) => setMinimalAmount(event.target.value)}
                  name="name"
                  step="any"
                  min="0.000000001"
                  type="number"
                />
              </p>
              <button type="submit">Contribute</button>
            </form>
          </div>
        </div>
        <p>
          {!message ? (
            <></>
          ) : message == "Successful transaction" ? (
            <div id="correct-transaction">
              {message}
              <div>
                <a href={urlEther} target="_blank" id="seeEtherscan">
                  See in Etherscan
                </a>
              </div>
            </div>
          ) : message !== "Transaction in progress" ? (
            <div id="error-transaction">
              {message}
              <div>
                <a href={urlEther} target="_blank" id="seeEtherscan">
                  See in Etherscan
                </a>
              </div>
            </div>
          ) : (
            <div id="current-transaction">
              {message}
              <div>
                <a href={urlEther} target="_blank" id="seeEtherscan">
                  See in Etherscan
                </a>
              </div>
            </div>
          )}
        </p>
      </div>
    </>
  );
}

export default NewCampaings;
