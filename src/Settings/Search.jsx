import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from "../Shared/Styles";
import {AppContext} from "../App/AppProvider";
import _ from 'lodash';

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
function filterCoins(e, setFilteredCoins, coinList){
    //get value of event
    let inputValue = e.target.value;
        console.log(`input from search ${inputValue}`)
    if(!inputValue){
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
}

//prevent user from firing off too many events (too many fitering operations in a row)
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
    console.log(`input value in debounce func ${inputValue}`)
}, 500);

export default function () {
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) =>
                <SearchGrid onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}> 
                    saerch all coins 
                    <SearchInput />
                </SearchGrid>
            }
        </AppContext.Consumer>
    )
}