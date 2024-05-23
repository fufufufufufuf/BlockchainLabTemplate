import React from "react";
import Image from "next/image";

import images from '../../assets'
import Style from '../card/card.module.css'
import voterCardStyle from './voterCard.module.css'

const voterCard = ({voterArray}) => {
  return(
    <div className={Style.card}>
      {voterArray.map((el, i)=>(
        <div className={Style.card_box}>
          <div className={Style.image}>
            <img src={el[4]} alt="profile photo"/>
          </div>

          <div className={Style.card_info}>
            <h2>
              {el[1]} #{el[0].toNumber()}
            </h2>
            <p>Address: {el[3].slice(0,30)}...</p>
            <p>details</p>
            <p className={voterCardStyle.vote_Status}>
              {el[6]== true ? "you alredy voted" : "not voting again"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default voterCard;
