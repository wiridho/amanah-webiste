import React from "react";

import { Card } from "../../components/organism";
import CardList from "../../components/organism/CardList/CardList";

const Beranda = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-8 max-w-7xl mx-auto">
        <Card />
      </div>
      <br />
      <CardList />
    </>
  );
};

export default Beranda;
