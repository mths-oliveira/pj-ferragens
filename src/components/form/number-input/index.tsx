import { ChangeEvent, useEffect, useState } from 'react';
import { Flex, Input, InputProps } from '@chakra-ui/react';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Icon } from '../../icon';
import { Button } from './button';

interface InputNumberProps extends InputProps {
  max?: number;
  min?: number;
  initialValue?: number;
  focusInputWhenOpening?: boolean;
  inputRef?: (input: HTMLInputElement) => void;
  onChangeValue?: (value: number) => void;
}

export function NumberInput({
  max = 999,
  min = 1,
  inputRef,
  initialValue,
  focusInputWhenOpening,
  onChangeValue,
  ...rest
}: InputNumberProps) {
  const [value, setValue] = useState(initialValue);
  const [input, setInput] = useState<HTMLInputElement>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value.match(/\D/)) return;
    const value = Number(event.currentTarget.value);
    setValue(value);
  }

  useEffect(() => {
    onChangeValue(value);
  }, [value]);

  useEffect(() => {
    if (focusInputWhenOpening) {
      input?.focus();
    }
  }, [input]);

  return (
    <Flex
      boxShadow="md"
      borderRadius="sm"
      _focusWithin={{
        boxShadow: 'outline',
      }}
    >
      <Button
        onClick={() => {
          setValue(value - 1);
        }}
      >
        <Icon as={MdRemove} fontSize="sm" />
      </Button>
      <Input
        value={String(value).padStart(2, '0')}
        ref={(input) => {
          if (!input) return;
          setInput(input);
          if (!inputRef) return;
          inputRef(input);
        }}
        max={max}
        min={min}
        size="lg"
        fontSize="sm"
        fontWeight="700"
        textAlign="center"
        padding="0"
        border="none"
        _focus={{}}
        onFocus={(event) => {
          const input = event.currentTarget;
          input.value = '';
        }}
        onBlur={(event) => {
          const input = event.currentTarget;
          input.value = String(value).padStart(2, '0');
        }}
        onChange={handleChange}
        {...rest}
      />
      <Button
        onClick={() => {
          setValue(value + 1);
        }}
      >
        <Icon as={MdAdd} fontSize="sm" />
      </Button>
    </Flex>
  );
}
