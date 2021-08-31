import { useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { ReactChild } from 'react';

const MenuItem = ({ children, isLast, to = '/' }: { children: ReactChild, isLast?: boolean, to: string }) => {
    return (
        <Text
            mb={{ base: isLast ? 0 : 8, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            _hover={{ backgroundColor: 'teal', rounded: '6px' }}
            display="block"
            padding="15px"
        >
            <Link href={to}>{children}</Link>
        </Text>
    );
};

const Header = (props: any) => {
    const [show, setShow] = useState(false);
    const toggleMenu = () => setShow(!show);
    return (
        <Flex
            mb={8}
            p={8}
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            borderBottom="3px solid black"
            textTransform="uppercase"
        >
            <Box w="200px">
                <Text fontSize="2rem" transform="skew(-14deg)" fontWeight="bold">
                    <Link href='/'>Home UI</Link>
                </Text>
            </Box>

            <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
                {show ? <CloseIcon /> : <HamburgerIcon />}
            </Box>

            <Box
                display={{ base: show ? 'block' : 'none', md: 'block' }}
                flexBasis={{ base: '100%', md: 'auto' }}
            >
                <Flex
                    align="center"
                    justify={['center', 'space-between', 'flex-end', 'flex-end']}
                    direction={['column', 'row', 'row', 'row']}
                    pt={[4, 4, 0, 0]}
                    onClick={toggleMenu}
                >
                    <MenuItem to="/" >Dashboard</MenuItem>
                    <MenuItem to="/lawn" >Lawn</MenuItem>
                    <MenuItem to="/heating" >Heating</MenuItem>
                    <MenuItem to="/login" isLast>
                        Login
                    </MenuItem>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Header;