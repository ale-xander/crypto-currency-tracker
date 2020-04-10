// state manager for the app
import React from 'react';
import _ from 'lodash';
export const AppContext = React.createContext();

global.fetch = require('node-fetch')
const cc = require('cryptocompare')
cc.setApiKey('d455128ae090441e96c16dbd4db1660d3fd94ce1c5f47557d4f5b288e9b97b72')
const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            setPage: this.setPage,
            ...this.savedSettings(),
            confirmFavorites: this.confirmFavorites,
            favorites: ['BTC', 'DGC'],
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            setFilteredCoins: this.setFilteredCoins,
        }
    }
    // ------------------ Fetch the coins, prices and historical ------------------
    componentDidMount = () => {
        console.log('component did mount')
        this.fetchCoins();
        this.fetchPrices();
        // this.fetchHistorical();
    }
    
    fetchCoins = async () => {
        console.log('fetching coins')
        let coinList = (await cc.coinList()).Data;
            // console.log(coinList)
        this.setState({coinList});
    }
    
    //key = the coin we're adding
    addCoin = key => {
        //make a copy of the favorites array
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES){
            favorites.push(key);
            this.setState({favorites});
        }
        console.log(`adding ${key} coin`)
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        console.log(`removing ${key} coin`)
        //pull value from array, return new array. new array of this value removed
        this.setState({favorites: _.pull(favorites, key)})
    }
    
    //check if coin is already in favorites. takes an array and and checks if key is in array
    isInFavorites = key => {
        _.includes(this.state.favorites, key)
    }

    setPage = page => this.setState({page})
    
    confirmFavorites = ()=> {
        console.log('confirm fav');
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        },
        () => {
            this.fetchPrices()
        }
        );

        localStorage.setItem(
            'cryptoData',
            JSON.stringify({
                // test: '<-- button works -->',
                favorites: this.state.favorites
                //favorites: ['BTC']
            }),
        )
    }

    //save settings to local storage for repeat visitors
    savedSettings(){
        let cryptoCompareData = JSON.parse(localStorage.getItem('cryptoData'));
        //if we don't have data, return first visit default data
        if(!cryptoCompareData){
            return {page: 'settings', firstVisit: true}
            //firstVisit: boolean to keep track if user has been here before
        }
        //let favorites = ['BTC']
        let {favorites} = cryptoCompareData;
        //if we do have data:
        return {favorites};
    }
    
    //set the coins that match the search criteria to state
    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    //get coin prices
    fetchPrices = async () => {
        //don't fetch prices before you have favorites
        if(this.state.firstVisit) return;
        
        //return a promise array; wait for prices() to resolve
        let prices = await this.prices();
        console.log('prices')
        console.log(prices)
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({prices});
    }
    
    //get price from CryptoCompare
    prices = async () => {
        let returnData = [];
        for(let i = 0; i < this.state.favorites.length; i++){
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } 
            catch (e){
                console.warn('Fetch price error: ', e);
            }
        }
        return returnData;
    }

    //give the children access to provider
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}

//export default AppProvider;