import React from "react";
import { Link } from "react-router-dom";
import "./CoinPortfolioCard.css";

function CoinPortfolioCard(props) {
  return (
    <Link id="display-info" to={`/${props.currentCoin[0].id}`}>
      <span>
        {props.onecurrent.coins} {props.onecurrent.symbol.toUpperCase()}
      </span>
    </Link>
  );
}

export default CoinPortfolioCard;
