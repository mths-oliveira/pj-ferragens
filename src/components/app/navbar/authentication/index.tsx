import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { MdPerson } from "react-icons/md"
import { User } from "../../../../backend/entities/user"
import { api } from "../../../../config/api"
import { SignIn } from "./sign-in"
import { SignOut } from "./sign-out"
import { SignUp } from "./sign-up"

export type Screen = "sign-in" | "sign-up" | "sign-out"

export interface Props {
  onSubmit: (data: any) => void
  setSreen: (screen: Screen) => void
}

export function Authentication() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [screen, setScreen] = useState<Screen>("sign-in")
  const toast = useToast()
  const [user, setUser] = useState({} as any)
  useEffect(() => {
    if (!user.name) return
    setScreen("sign-out")
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])
  useEffect(() => {
    const data = localStorage.getItem("user")
    if (!data) return
    const user = JSON.parse(data)
    setUser(user)
  }, [])
  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={MdPerson} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent bg="transparent" borderRadius="5px" overflow="hidden">
          <ModalBody bg="#fff" borderRadius="5px" padding="2.25rem">
            {screen === "sign-in" && (
              <SignIn
                setSreen={setScreen}
                onSubmit={async (data) => {
                  const response = await api.post<User>("/sign-in", data)
                  if (response.status === 404) {
                    toast({
                      title: "Usuário ou senha inválidos",
                      status: "error",
                      position: "top-right",
                    })
                  } else {
                    toast({
                      title: `Olá, ${response.data.name}`,
                      status: "success",
                      position: "top-right",
                    })
                  }
                  setUser(response.data)
                }}
              />
            )}
            {screen === "sign-up" && (
              <SignUp
                setSreen={setScreen}
                onSubmit={async (data) => {
                  const response = await api.post<User>("/sign-up", data)
                  if (response.status === 200) {
                    toast({
                      title: `Bem vindo, ${response.data.name}`,
                      status: "success",
                      position: "top-right",
                    })
                  } else {
                    toast({
                      title: response.data as any,
                      status: "error",
                      position: "top-right",
                    })
                  }
                  setUser(response.data)
                }}
              />
            )}
            {screen === "sign-out" && (
              <SignOut
                onSubmit={() => {
                  setUser({})
                  setScreen("sign-in")
                  localStorage.removeItem("user")
                }}
                user={user}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
