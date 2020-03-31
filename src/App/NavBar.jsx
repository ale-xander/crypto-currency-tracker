import React from 'react';
import styled, {css} from 'styled-components';

const NavBar = styled.div`
    display:grid;
    grid-template-columns: 100px auto 100px 100px;
    margin-bottom: 40px;
`;

function toProperCase(lower){
    return lower.charAt(0).toUpperCase() + lower.substr(1)
};

const Logo = styled.div`
    font-size: 2em;
`;

const ControlButtonElement = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        text-shadow: 0px 0px 100px #55ffbb; 
    `}
`;
// a functional component that's a wrapper for the buttons
function ControlButton({name, active}) {
    return(
        <ControlButtonElement active={active}>
            {toProperCase(name)}
        </ControlButtonElement>
    )
};

export default function () {
    return (<
        NavBar>
            <Logo>Logo_here</Logo>
            <div/>
            <ControlButton active name="dashboard"/>
            <ControlButton active name="Settings"/>
        
        </NavBar>
    )
}