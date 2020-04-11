import React from 'react';
import styled, {css} from 'styled-components';
import {SelectableTile} from "../Shared/Tile";
import {fontSize3, fontSizeBig, greenBoxShadow} from "../Shared/Styles";
import {CoinHeaderGridStyled} from "../Settings/CoinHeaderGrid";

const JustifyRight = styled.div`
    justify-self: right; 
`

const JustifyLeft = styled.div`
    justify-self: left; 
`

const TickerPrice = styled.div`
    ${fontSizeBig};
`

const ChangePct = styled.div`
    color: green; 
    ${props => props.red && css`
        color: red; 
    `}
`

const numberFormat = number => {
    return +(number + '').slice(0, 6);
}

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        display: grid; 
        ${fontSize3}
        grid-gap: 5px; 
        grid-template-columns: repeat(3, 1fr); 
        justify-items: right; 
    `}
    
    ${props => props.currentFavorite && css`
        ${greenBoxShadow}
        pointer-events: none; 
    `}
`

function ChangePercent({data}){
    return (
        <JustifyRight>
        <ChangePct red={data.CHANGEPCT24HOUR < 0}>
            {numberFormat(data.CHANGEPCT24HOUR)}%
        </ChangePct>
        </JustifyRight>
    );
}

function PriceTile({sym, data}){
    return (
        <PriceTileStyled >
        <CoinHeaderGridStyled>
            <> {sym} </>
            <ChangePercent data={data}/>
        </CoinHeaderGridStyled>
        <TickerPrice>
            ${numberFormat(data.PRICE)}
        </TickerPrice>
        </PriceTileStyled>
    );
}

function PriceTileCompact({sym, data}){
  return (
    <PriceTileStyled >
      <JustifyLeft> {sym} </JustifyLeft>
      <ChangePercent data={data}/>
      <>
        ${numberFormat(data.PRICE)}
      </>
    </PriceTileStyled>
  );
}

export default function({price, index}){
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];
    let TileClass = index < 5 
        ? PriceTile 
        : PriceTileCompact;
    return (
            <TileClass sym={sym} data={data}>
            </TileClass>
    )
}