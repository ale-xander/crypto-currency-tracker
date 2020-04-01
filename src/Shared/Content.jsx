import React from 'react';
import {AppContext} from "../App/AppProvider";

//if coinlist is undefined, show loader, otherwise the normal children. Settings won't render until we have coins
export default function(props){
  return <AppContext.Consumer>
    {({coinList, prices, firstVisit}) => {
      if(!coinList){
        return <div> Loading Coins </div>
      }
      if(!firstVisit && !prices){
        return <div> Loading Prices </div>
      }
      return <div> {props.children} </div>
    }}
  </AppContext.Consumer>
}
