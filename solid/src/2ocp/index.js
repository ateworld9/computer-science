import {
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Flex,
  InputLeftElement,
  Box,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const PasswordInput = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input type={show ? 'text' : 'password'} placeholder="Enter password" />
      <InputRightElement>
        <Button onClick={handleClick} m={'0 4px'}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const EmailInput = () => {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input type="email" />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
};

const OCPPage = () => {
  return (
    <ChakraProvider>
      <Flex
        gap={4}
        direction="column"
        align="center"
        justify="center"
        maxWidth={600}
        margin="0 auto"
      >
        <Input variant="outline" placeholder="Outline" size="md" />
        <Input variant="filled" placeholder="Filled" size="lg" />
        <Input variant="flushed" placeholder="Flushed" />
        <Box minH={'32px'} />
        <InputGroup>
          <InputLeftAddon children="+7" />
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="https://" />
          <Input placeholder="ateworld" />
          <InputRightAddon children=".site" />
        </InputGroup>
        <Box minH={'32px'} />
        <InputGroup>
          <InputLeftElement
            pointerEvents={'none'}
            children={<PhoneIcon color="gray.300" />}
          />
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
        <Box minH={'32px'} />
        <PasswordInput />
        <Box minH={'32px'} />
        <EmailInput />
      </Flex>
    </ChakraProvider>
  );
};

export default OCPPage;
