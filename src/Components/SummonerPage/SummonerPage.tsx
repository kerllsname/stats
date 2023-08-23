import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Store } from '../InterfacesAndTypes/Interfaces/StoreInterfaces';

function SummonerPage() {
  const summonersData = useSelector((state: Store) => state.summoners.summoners);

  return (
    <div className="summoner-page__wrapper">
      <h1>{summonersData[1].initialSummonerData.name}</h1>
    </div>
  );
}

export default SummonerPage;
