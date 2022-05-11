import React, { useState } from "react";
import factory from "../../Web3/factory";
import web3 from "../../Web3/web3";
import { useNavigate } from "react-router-dom";

function NewCampaings() {
  const [message, setMessage] = useState("");
  const [minimalAmount, setMinimalAmount] = useState("");
  const navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();

      setMessage("Transaction in progress");

      await factory.methods.createCampaing(minimalAmount).send({
        from: accounts[0],
      });

      navigate("/campaigns");
      setMessage();
    } catch (err) {
      setMessage(err.message);
    }
  };
  return (
    <>
      <div>NewCampaings</div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Minimal Contribution</label>
            <input
              onChange={(event) => setMinimalAmount(event.target.value)}
              name="name"
              type="number"
            />
          </div>
        </div>
        <button type="submit">Contribute</button>
      </form>
      {message}
    </>
  );
}

export default NewCampaings;
