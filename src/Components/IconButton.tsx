import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface IButtonProps {
  icon: ReactNode;
}

const BoxButton = styled(motion.button)`
  all: unset;
  height: 17px;
  width: 17px;
  border: 1px solid ${(props) => props.theme.white.dark};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  color: ${(props) => props.theme.white.light};
  background-color: inherit;
  svg {
    height: 12px;
    width: 12px;
  }
  &:hover {
    color: ${(props) => props.theme.black.light};
    background-color: ${(props) => props.theme.white.light};
    transform: scale(1.1);
  }
`;

export default function IconButton({ icon }: IButtonProps) {
  return <BoxButton>{icon}</BoxButton>;
}
