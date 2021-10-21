import type { NextPage } from 'next';
import { Flex, Heading, Button, Input } from '@chakra-ui/react';

const handleLogin = async (e: Event) => {
    fetch('/api/login')
        .then(response => response.json())
        .then(data => console.log(data.server));
}

const Login: NextPage = () => {
    return (
        <Flex height="80vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background='gray.100' p={12} rounded={6}>
                <Heading mb={6}>Log In</Heading>
                <Input placeholder="your email" variant="filed" mb={3} type="email"></Input>
                <Input placeholder="****" variant='filed' mb={6} type="password"></Input>
                <Button colorScheme="teal" onClick={handleLogin}>Log In</Button>
            </Flex>
        </Flex>
    )
}

export default Login