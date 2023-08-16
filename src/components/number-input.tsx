import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as NumberInputBox,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"

interface NumberInputProps {
  defaultValue?: number
  onChange: (value: number) => void
}

export function NumberInput({ onChange, defaultValue = 1 }: NumberInputProps) {
  return (
    <NumberInputBox
      defaultValue={defaultValue}
      min={1}
      max={999}
      maxWidth="5.5rem"
      onChange={(e) => {
        onChange(Number(e))
      }}
    >
      <NumberInputField fontWeight="bold" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInputBox>
  )
}
