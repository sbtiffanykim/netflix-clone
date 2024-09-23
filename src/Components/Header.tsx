import styled from 'styled-components';
import { motion, useAnimation, useMotionValueEvent, useScroll } from 'framer-motion';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

interface IForm {
  keyword: string;
}

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 20px 60px;
  color: white;
  z-index: 1000;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 100px;
  height: 30px;
  fill: ${(props) => props.theme.red};
  stroke: ${(props) => props.theme.red};
  stroke-width: 10px;
  cursor: pointer;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.dark};
  transition: color 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.white.light};
  }
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.theme.red};
  border-radius: 5px;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const SearchBar = styled(motion.form)`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 18px;
    cursor: pointer;
  }
`;

const Input = styled(motion.input)`
  border: 1px solid white;
  background-color: rgba(151, 148, 148, 0.5);
  color: white;
  padding: 5px 10px;
  padding-left: 40px;
  height: 30px;
  width: 250px;
  font-size: 15px;
  transform-origin: right center;
  position: absolute;
  right: 0;
  z-index: -1;
`;

const logoVariants = {
  inactive: {
    fillOpacity: 1,
    pathLength: 0,
  },
  active: {
    fillOpacity: 0,
    pathLength: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const navVariants = {
  scrollDown: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  scrollUp: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
};

export default function Header() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('tv');
  const movieMatch = useMatch('movies');
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useMotionValueEvent(scrollY, 'change', () => {
    if (scrollY.get() > 80) {
      navAnimation.start('scrollDown');
    } else {
      navAnimation.start('scrollUp');
    }
  });
  const goHome = () => navigate('/');
  const { register, handleSubmit, reset } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`search?keyword=${data.keyword}`);
  };

  return (
    <Nav
      initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
      animate={navAnimation}
      variants={navVariants}
    >
      <Col>
        <Logo
          onClick={goHome}
          variants={logoVariants}
          initial='inactive'
          whileHover='active'
          xmlns='http://www.w3.org/2000/svg'
          width='1024'
          height='276.742'
          viewBox='0 0 1024 276.742'
        >
          <motion.path
            d='M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z'
            fill='#d81f26'
          />
        </Logo>
        <Items>
          <Item>
            <Link to='/'>Home {homeMatch && <Circle layoutId='circle' />}</Link>
          </Item>
          <Item>
            <Link to='/tv'>TV Shows {tvMatch && <Circle layoutId='circle' />}</Link>
          </Item>
          <Item>
            <Link to='/movies'>Movies {movieMatch && <Circle layoutId='circle' />}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <SearchBar onSubmit={handleSubmit(onValid)}>
          <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -220 : -5 }}
            transition={{ duration: 0.2 }}
          >
            <path
              fill='white'
              d='M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
            />
          </motion.svg>
          <Input
            placeholder='Titles, people, genres'
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            transition={{ duration: 0.2 }}
            {...register('keyword', { required: true, minLength: 2 })}
          />
        </SearchBar>
      </Col>
    </Nav>
  );
}
