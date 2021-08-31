import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Text } from '@chakra-ui/layout';
import Nav from './Nav';

const HeaderStyles = styled.header`
    .bar{
        border-bottom: 10px solid black;        
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch
    }
`;
const Logo = styled.h1`
    height: 10vh;
    font-size: 4rem;
    color: white;
    margin-left: 2rem;
    z-index: 2;
    background: var(--grass, #009A17);
    transform: skew(-14deg);
    margin: 10px 2rem;
    a {
        color: white
        text-transform: uppercase;
        white-space: nowrap;
        text-decoration: none;
        padding: 0.25rem 0.25rem;
    }
`;

export default function Header() {
    return (
        <HeaderStyles>
            <div className="bar">
                <Logo>
                    <Link href="/">Home UI</Link>
                </Logo>
                <Nav />
            </div>
        </HeaderStyles>
    );
}