import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonProps {
  icon: ReactNode;
  height?: number;
  width?: number;
}

const BoxButton = styled(motion.button)<{ height: number; width: number }>`
  all: unset;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};
  border: 1px solid ${(props) => props.theme.white.dark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => `${Math.ceil(props.height / 4)}px`};
  color: ${(props) => props.theme.white.light};
  background-color: inherit;
  cursor: pointer;

  svg {
    height: ${(props) => `${Math.ceil(props.height * 0.6)}px`};
    width: ${(props) => `${Math.ceil(props.width * 0.6)}px`};
  }

  &:hover {
    color: ${(props) => props.theme.black.light};
    background-color: ${(props) => props.theme.white.light};
    transform: scale(1.1);
    transition: 0.2s ease-in;
  }
`;

export default function IconButton({ icon, height = 20, width = 20 }: IButtonProps) {
  return (
    <BoxButton height={height} width={width}>
      {icon}
    </BoxButton>
  );
}
