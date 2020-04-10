import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from "../Shared/Styles";
import {AppContext} from "../App/AppProvider";
import _ from 'lodash';
import fuzzy from 'fuzzy';

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
        //console.log(`input from search ${inputValue}`)
    
        //if you clear the search it should go back to all the results
    if(!inputValue){
        setFilteredCoins(null);
        return;
    }
    handleFilter(inputValue, coinList, setFilteredCoins);
}

//prevent user from firing off too many events (too many fitering operations in a row)
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
    //console.log(`input value in debounce func ${inputValue}`)
    // Get all the coin symbols
    let coinSymbols = Object.keys(coinList);
    // Get all the coin names, map symbol to name
    let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
    let allStringsToSearch = coinSymbols.concat(coinNames);
    //console.log(allStringsToSearch)

    let fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map(result => result.string);
    //console.log(fuzzyResults)

    //separate coin names from coin symbols. pick names of coins from coinlist and set back to app as filtered coins
    let filteredCoins = _.pickBy(coinList, (result, symKey) => {
        let coinName = result.CoinName;
        return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
    });
    // console.log(`filtered coins`)
    // console.log(filteredCoins)
    setFilterCoins(filteredCoins)

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