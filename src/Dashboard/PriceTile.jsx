import React from 'react';
import styled, {css} from 'styled-components';
import {SelectableTile} from "../Shared/Tile";
import {fontSize3, fontSizeBig, greenBoxShadow} from "../Shared/Styles";
import {CoinHeaderGridStyled} from '../Settings/CoinHeaderGrid'

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
function PriceTile({sym, data}){
    return (
        <PriceTileStyled>
            <CoinHeaderGridStyled>
                <div> {sym} </div>
                <div>{numberFormat(data.CHANGEPCT24HOUR)}</div>
            </CoinHeaderGridStyled>
        </PriceTileStyled>
    );
}

export default function ({price, index}) {
    
    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];

    return(
        <PriceTile sym={sym} data={data} >
            {sym}
            {data.PRICE}
        </PriceTile>
    )
}