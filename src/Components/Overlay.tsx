import { motion } from 'framer-motion';
import styled from 'styled-components';

interface IOverlayProps {
  onClick?: () => void;
  variants?: {};
  initial?: string;
  animate?: string;
  exit?: string;
}

const Wrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default function Overlay({
  onClick,
  variants,
  initial,
  animate,
  exit,
}: IOverlayProps) {
  return (
    <Wrapper
      onClick={onClick}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
    />
  );
}
