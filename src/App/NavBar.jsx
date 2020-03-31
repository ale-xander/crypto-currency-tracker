import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
    display:grid;
    grid-template-columns: 100px auto 100px 100px;
`

export default function () {
    return <NavBar>
        <div>Logo_here</div>
        <div/>
        <div>Dashboard</div>
        <div>Settigns</div>
      
        
        </NavBar>
}