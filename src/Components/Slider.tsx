import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { makeImagePath } from '../utils';
import { IoIosPlay, IoMdAdd } from 'react-icons/io';
import { FaAngleDown, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import IconButton from './IconButton';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { modalState } from '../atoms';
import {
  IGetMoviesResult,
  IMediaResult,
  IMovieOverview,
  ITvSeriesOverview,
} from '../api';

interface ISliderProps {
  title: string;
  data: IGetMoviesResult | IMediaResult;
  type: 'movies' | 'tv';
}

const Wrapper = styled.div`
  width: 100vw;
  height: auto;
  margin-bottom: 180px;
`;

const SliderTitle = styled.h2`
  font-weight: 600;
  font-size: 23px;
  margin-bottom: 15px;
  z-index: 0;
  left: 5px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  gap: 5px;
  padding-right: 40px;
`;

const PagingButtons = styled(motion.div)`
  position: absolute;
  top: 40%;
  width: 100%;
  margin-left: -15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

const Button = styled(motion.button)`
  all: unset;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px;
  color: ${(props) => props.theme.white.light};
  background-color: ${(props) => props.theme.black.darker};
  z-index: 10;
  cursor: pointer;
  svg {
    height: 25px;
    width: 25px;
  }

  &:hover {
    color: ${(props) => props.theme.black.light};
    background-color: ${(props) => props.theme.white.light};
    transform: scale(1.1);
    transition: 0.2s ease-in;
  }
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
    x: window.innerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth,
  },
};

const boxVariants = {
  initial: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    opacity: 1,
    scale: 1.1,
    zIndex: 100,
    y: -100,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
};

export default function Slider({ data, title, type }: ISliderProps) {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
    console.log(`${title}: ${leaving}`);
  };

  const offset = 6; // slider limit
  const totalResults = data?.results.length || 0;
  const maxIndex = Math.floor(totalResults / offset) - 1;

  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving(); // leaving === true
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const decreaseIndex = () => {
    if (leaving) return;
    toggleLeaving(); // leaving === true
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  const handleExitComplete = () => setLeaving(false);

  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const onBoxClicked = (type: string, id: number) => {
    navigate(`/${type}/${id}`);
    setIsModalOpen(true);
  };

  return (
    <Wrapper>
      <SliderTitle>{title}</SliderTitle>
      <AnimatePresence onExitComplete={handleExitComplete} initial={false}>
        <Row
          key={index}
          variants={rowVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ type: 'tween', duration: 0.8 }}
        >
          <PagingButtons>
            <Button>
              <GrFormPrevious onClick={decreaseIndex} />
            </Button>
            <Button onClick={increaseIndex}>
              <GrFormNext />
            </Button>
          </PagingButtons>
          {data?.results
            .slice(1)
            .slice(offset * index, offset * (index + 1))
            .map((media) => (
              <Box
                layoutId={media.id + ''}
                key={media.id}
                variants={boxVariants}
                initial='initial'
                whileHover='hover'
                exit='exit'
                onClick={() => onBoxClicked(type, media.id)}
              >
                <BoxImg
                  bgphoto={makeImagePath(
                    media.backdrop_path || media.poster_path,
                    'w500'
                  )}
                />
                <Info variants={infoVariants}>
                  {type === 'movies' ? (
                    <h4>{(media as IMovieOverview).title}</h4>
                  ) : (
                    <h4>{(media as ITvSeriesOverview).name}</h4>
                  )}
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
    </Wrapper>
  );
}
