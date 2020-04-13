import React from 'react'
import { AppContext } from '../App/AppProvider'

export default function () {
  return (
    <>
      <AppContext.Consumer>
        {({ firstVisit }) =>
          firstVisit 
          ? (
                <div>
                    Welcome Crypto App. Select your crypto currencies.{' '}
                </div>
            ) 
          : null
        }
      </AppContext.Consumer>
    </>
  )
}
