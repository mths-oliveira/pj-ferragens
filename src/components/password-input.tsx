import {
  Button,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react"
import { useState } from "react"
import { MdVisibility, MdVisibilityOff } from "react-icons/md"

export function PasswordInput(props: InputProps) {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input type={show ? "text" : "password"} {...props} />
      <InputRightElement marginX="0.5rem">
        <Button
          onClick={handleClick}
          fontSize="1.5rem"
          variant="unstyled"
          display="flex"
          justifyContent="center"
          _focus={{
            boxShadow: "none",
          }}
        >
          {show ? <MdVisibilityOff /> : <MdVisibility />}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
