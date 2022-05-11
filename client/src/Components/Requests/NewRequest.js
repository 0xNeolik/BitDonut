import React, { useState } from "react";
import { useParams } from "react-router-dom";
import web3 from "../../Web3/web3";
import Campaing from "../../Web3/campaing";

function NewRequest() {
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState();
  const [recipient, setRecipient] = useState();
  const [value, setValue] = useState();
  const { id } = useParams();

  const campaing = Campaing(id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();

      setMessage("Transaction in progress");
      await campaing.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      setMessage();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <div>NewRequest</div>{" "}
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Description</label>
            <input
              onChange={(event) => setDescription(event.target.value)}
              name="description"
              type="text"
            />
          </div>
          <div>
            <label>Recipient</label>
            <input
              onChange={(event) => setRecipient(event.target.value)}
              name="recipient"
              type="text"
            />
          </div>
          <div>
            <label>Amount</label>
            <input
              onChange={(event) => setValue(event.target.value)}
              name="value"
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

export default NewRequest;
