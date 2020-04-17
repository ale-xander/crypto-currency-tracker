// state manager for the app
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
export const AppContext = React.createContext();

global.fetch = require('node-fetch')
const cc = require('cryptocompare')
cc.setApiKey('d455128ae090441e96c16dbd4db1660d3fd94ce1c5f47557d4f5b288e9b97b72')
const MAX_FAVORITES = 15;
const TIME_UNITS = 12; //days, weeks, months

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'my coins',
            setPage: this.setPage,
            ...this.savedSettings(),
            confirmFavorites: this.confirmFavorites,
            favorites: ['BTC', 'ETH', 'BCH','LINK','EOS', 'OKB','LTC','ETC', 'XLM', 'XMR'],
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite,
            toggleChart: this.toggleChart,
            timeInterval: 'months'
        }
    }
    // ------------------ Fetch the coins, prices and historical ------------------
    componentDidMount = () => {
        console.log('component did mount')
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
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
    isInFavorites = key => _.includes(this.state.favorites, key)
    

    setPage = page => this.setState({page})
    
    confirmFavorites = ()=> {
        console.log('confirm fav');
        
        let currentFavorite = this.state.favorites[0];

        this.setState({
            firstVisit: false,
            page: 'my coins',
            currentFavorite,
            prices: null,
            historical: null
        },
        () => {
            this.fetchPrices();
            this.fetchHistorical();
        }
        );

        localStorage.setItem(
            'cryptoData',
            JSON.stringify({
                // test: '<-- button works -->',
                favorites: this.state.favorites,
                //favorites: ['BTC']
                currentFavorite
            }),
        )
    }

    //save settings to local storage for repeat visitors
    savedSettings(){
        let cryptoCompareData = JSON.parse(localStorage.getItem('cryptoData'));
        //if we don't have data, return first visit default data
        if(!cryptoCompareData){
            return {page: 'coin selector', firstVisit: true}
            //firstVisit: boolean to keep track if user has been here before
        }
        //let favorites = ['BTC']
        let {favorites, currentFavorite} = cryptoCompareData;
        //if we do have data:
        return {favorites, currentFavorite};
    }
    
    //set the coins that match the search criteria to state
    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins})

    //get coin prices
    fetchPrices = async () => {
        //don't fetch prices before you have favorites
        if(this.state.firstVisit) return null;
        
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

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            //to avoid re-rendring with old data, clear old data
            historical: null
        }, this.fetchHistorical);
    
        localStorage.setItem('cryptoData', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoData')),
            currentFavorite: sym
        }))
    }

    //get historical data, push to Promises (10), resolve when all 10 promises have resolved.
    historical = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--){
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],
                    moment()     //new moment = today
                    .subtract({[this.state.timeInterval]: units})
                    .toDate()   //to put it in JS data
                )
            )
        }
        console.log('monent', moment())
        return Promise.all(promises);
    }

    fetchHistorical = async () => {
        if (this.state.firstVisit) return null;
        let results = await this.historical();
        console.log(`10 units of historical data: `, results);
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(), ticker.USD
                ])
            }
        ]
        this.setState({historical});
    }

    //change the time unit from here. value = new time unit
    toggleChart = (value) => {
        //console.log(value);
        this.setState({timeInterval: value, historical: null}, this.fetchHistorical);
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

