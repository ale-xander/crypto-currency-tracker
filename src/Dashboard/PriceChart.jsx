import highchartsConfig from './HighchartsConfig'
import React from 'react'
import { Tile } from '../Shared/Tile'
import { AppContext } from '../App/AppProvider'
import ReactHighcharts from 'react-highcharts'
import HighchartsTheme from './HighchartsTheme'
import ChartSelector from './ChartSelector'
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function () {
    return (
        <AppContext.Consumer>
            {
            ({historical, toggleChart}) => {return(
                <Tile>
                    <ChartSelector
                    defaultValue="months"
                    onChange={e => toggleChart(e.target.value)}
                    >
                        <option value='days'>Days</option>
                        <option value='weeks'>Weeks</option>
                        <option value='months'>Months</option>
                    </ChartSelector>
                    {/* <ReactHighcharts config={highchartsConfig(historical)} /> */}
                    {historical //if no historical data, show loading indicator while fetching
                        ? <ReactHighcharts config={highchartsConfig(historical)}/>
                        : <div> Loading Historical Data </div>
                    }
                </Tile>
                )}
            }
        </AppContext.Consumer>
    )
}
