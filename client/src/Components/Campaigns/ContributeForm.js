import React, { useState } from "react";
import Campaing from "../../Web3/campaing";
import web3 from "../../Web3/web3";

function ContributeForm({ address, getMessage }) {
  const [amountToContribute, setAmountToContribute] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    const campaing = Campaing(address);
    try {
      const accounts = await web3.eth.getAccounts();

      getMessage("Transaction in progress");
      await campaing.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amountToContribute, "ether"),
      });
      getMessage("Successful transaction");
      setTimeout(() => {
        getMessage("");
      }, 6000);
    } catch (err) {
      getMessage(err.message);
      setTimeout(() => {
        getMessage("");
      }, 6000);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} id="form-contribute">
        <div>
          <label>Contribution to the Campaing</label>
          <p>
            <input
              onChange={(event) => setAmountToContribute(event.target.value)}
              name="name"
              id="contribution-input"
              step="any"
              type="number"
            />
            ETH
          </p>
        </div>
        <div>
          <button type="submit">Contribute</button>
        </div>
      </form>
    </>
  );
}
export default ContributeForm;
