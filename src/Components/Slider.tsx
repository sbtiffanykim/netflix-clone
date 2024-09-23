import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { IoIosPlay, IoMdAdd } from 'react-icons/io';
import { FaAngleDown, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import IconButton from './IconButton';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { modalState } from '../atoms';
import { IGetMoviesResult } from '../api';

interface ISliderProps {
  title: string;
  data: IGetMoviesResult;
}

const Title = styled.h1`
  font-weight: 600;
  margin-left: 15px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  gap: 5px;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:hover {
    cursor: pointer;
  }
`;

const BoxImg = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.light};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: -10;
  h4 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 2px;
    margin-bottom: 15px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth - 25,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 25,
  },
};

const boxVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -100,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
};

export default function Slider({ data, title }: ISliderProps) {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const offset = 6; // slider limit
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    const totalResults = data?.results.length || 0;
    const maxIndex = Math.floor(totalResults / offset) - 1;
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setIsModalOpen(true);
  };

  return (
    <>
      <Title>{title}</Title>
      <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
        <Row
          key={index}
          variants={rowVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ type: 'tween', duration: 0.8 }}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * (index + 1))
            .map((movie) => (
              <Box
                layoutId={movie.id + ''}
                key={movie.id}
                variants={boxVariants}
                initial='initial'
                whileHover='hover'
                onClick={() => onBoxClicked(movie.id)}
              >
                <BoxImg
                  bgphoto={makeImagePath(
                    movie.backdrop_path || movie.poster_path,
                    'w500'
                  )}
                />
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                  <ButtonRow>
                    <ButtonContainer>
                      <IconButton icon={<IoIosPlay />} />
                      <IconButton icon={<IoMdAdd />} />
                      <IconButton icon={<FaRegThumbsUp />} />
                      <IconButton icon={<FaRegThumbsDown />} />
                    </ButtonContainer>
                    <ButtonContainer>
                      <IconButton icon={<FaAngleDown />} />
                    </ButtonContainer>
                  </ButtonRow>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </>
  );
}
