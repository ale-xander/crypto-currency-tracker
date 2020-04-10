import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from "../Shared/Styles";


const SearchGrid = styled.div`
    display: grid; 
    grid-template-columns: 200px 1fr; 
`
const SearchInput = styled.input`
    
    ${fontSize2}
    border: 1px solid; 
    height: 25px; 
    color: black;
    place-self: center left; 
`

export default function () {
    return (
        <SearchGrid> 
            saerch all coins 
            <SearchInput />
        </SearchGrid>
    )
}