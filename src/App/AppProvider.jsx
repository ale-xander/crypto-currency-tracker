// state manager for the app
import React from 'react';
export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            setPage: this.setPage
        }
    }
    setPage = page => this.setState({page})
    
    
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