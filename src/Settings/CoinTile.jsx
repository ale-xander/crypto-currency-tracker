import React from 'react';
import {AppContext} from "../App/AppProvider";
import {SelectableTile} from "../Shared/Tile";


export default function({coinKey}){
    return <AppContext.Consumer>
      {({coinList}) => {
        //this is the coin object that has coin name, image url, properties, etc
        let coin = coinList[coinKey];
  
        let TileClass = SelectableTile;
        return <TileClass> {coinKey} </TileClass>
      }}
    </AppContext.Consumer>
  }
  