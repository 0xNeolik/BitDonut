import React, { useState } from "react";
import Campaing from "../../Web3/campaing";
import web3 from "../../Web3/web3";

function ContributeForm({ address }) {
  const [message, setMessage] = useState("");
  const [amountToContribute, setAmountToContribute] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    const campaing = Campaing(address);
    try {
      const accounts = await web3.eth.getAccounts();

      setMessage("Transaction in progress");

      await campaing.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amountToContribute, "ether"),
      });
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
            <label>Contribution to the Campaing</label>
            <input
              onChange={(event) => setAmountToContribute(event.target.value)}
              name="name"
              step="any"
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
export default ContributeForm;
