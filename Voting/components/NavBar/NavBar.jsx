import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

import { VotingContext } from "../../context/Voter";
import Style from './NavBar.module.css';

const NavBar = () => {
  const { connectWallet, error, currentAccount } = useContext(VotingContext);
  const [openNav, setOpenNav] = useState(false);

  const openNavigation = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className={Style.navbar}>
      {error && (
        <div className={Style.message_box}>
          <div className={Style.message}>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className={Style.navbar_box}>
        <div className={Style.title}>
          <Link href="/">
            <a>
              <Image src="/assets/loading.gif" alt="logo" width={80} height={80} />
            </a>
          </Link>
        </div>
        <div className={Style.connect}>
          {currentAccount ? (
            <div>
              <div className={Style.connect_flex}></div>
              <button onClick={openNavigation}>
                {currentAccount.slice(0, 10)}
              </button>
              {currentAccount && (
                <span>
                  {openNav ? (
                    <AiFillUnlock onClick={openNavigation} />
                  ) : (
                    <AiFillLock onClick={openNavigation} />
                  )}
                </span>
              )}
              {openNav && (
                <div className={Style.navigation}>
                  <p>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </p>
                  <p>
                    <Link href="/candidate-registration">
                      <a>Candidate Regis</a>
                    </Link>
                  </p>
                  <p>
                    <Link href="/allowed-voters">
                      <a>Voter Regis</a>
                    </Link>
                  </p>
                  <p>
                    <Link href="/voterList">
                      <a>Voter List</a>
                    </Link>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
