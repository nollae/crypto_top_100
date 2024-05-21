import styled from 'styled-components'
import React, { useState } from 'react';

interface ContainerProps {
    bgColor:string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor}; 
    border-radius: 100px;
    border: 2px solid ${(props) => props.borderColor};
`;

interface CircleProps {
    bgColor:string;
    borderColor?:string;
    text?:string;
}

function Circle({bgColor, borderColor, text = "default text"}:CircleProps){ 
    const [counter, setCounter] = useState(0);
    // setCounter("heelo")
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
            {text}
        </Container>
    )
}

export default Circle; 