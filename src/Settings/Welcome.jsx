import React from 'react'
import { AppContext } from '../App/AppProvider'

export default function () {
  return (
    <>
      <AppContext.Consumer>
        {({ firstVisit }) =>
          firstVisit 
          ? ( <>
                <div>
                    Here are some popular crypto currencies. 
                    You can add more to your Favorites by searching below and clicking on the ones you want.{' '}
                </div>
                <div className='spacer'> </div>
                
              </>
            ) 
          : null
        }
      </AppContext.Consumer>
    </>
  )
}
