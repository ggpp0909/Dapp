import React, {FC} from "react";
import { Stack, Flex, Box, Text, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom";

const Layout:FC = ({ children }) => {
  return(
    <Stack h="100vh">
      <Flex bg="grey" p={4} justifyContent="center" alignItems="center">
        <Box>
          <Text fontWeight="bold">Animals</Text>
        </Box>
        <Link to="/">
         <Button size="sm" colorScheme="teal" >Main</Button>
        </Link>
        <Link to="my-animal">
         <Button size="sm" colorScheme="blue" >My animals</Button>
        </Link>
      </Flex>
      <Flex direction="column" h="full" justifyContent="center" alignContent="center">
        {children}
      </Flex>
    </Stack>
  )
}

export default Layout;