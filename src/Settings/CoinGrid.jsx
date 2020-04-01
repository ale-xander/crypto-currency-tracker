import React from 'react';
import styled from 'styled-components';
import {AppContext} from "../App/AppProvider";

export const CoinGridStyled = styled.div`
  display: grid;   
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); 
  
`

export default function (){
  return (
    <AppContext.Consumer>
    {({coinList}) => (
      <CoinGridStyled>
            {Object.keys(coinList).map(coinKey => <>{coinKey}</>)}
        
      </CoinGridStyled>
    )}
  </AppContext.Consumer>
  );
}
