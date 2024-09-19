import { motion } from 'framer-motion';
import styled from 'styled-components';

interface IModalProps {
  layoutId?: string;
}

const Modal = styled(motion.div)`
  position: fixed;
  background-color: red;
  width: 40vw;
  height: 80vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export default function MovieModal({ layoutId }: IModalProps) {
  return <Modal layoutId={layoutId}></Modal>;
}
