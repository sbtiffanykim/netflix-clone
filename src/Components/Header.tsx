import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { IoSearch } from 'react-icons/io5';
import { Link, useMatch } from 'react-router-dom';
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
  padding: 20px 60px;
  color: white;
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

const SearchBar = styled(motion.div)`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchIcon = styled(motion.svg).attrs(() => ({ as: IoSearch }))`
  font-size: 20px;
  position: absolute;
  left: 10px;
`;

const Input = styled(motion.input)`
  position: absolute;
  border: 1px solid white;
  color: white;
  padding-left: 35px;
  background-color: rgba(151, 148, 148, 0.5);
  height: 30px;
  width: 250px;
  transform-origin: right center;
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

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = () => setSearchOpen((prev) => !prev);
  const homeMatch = useMatch('/');
  const tvMatch = useMatch('tv');
  const movieMatch = useMatch('movies');

  return (
    <Nav
      onClick={() => {
        if (searchOpen) {
          setSearchOpen(false);
        }
      }}
    >
      <Col>
        <Logo
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
        <SearchBar
          animate={{ x: searchOpen ? -210 : 0 }}
          transition={{ type: 'linear', duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SearchIcon onClick={toggleSearch} />
          <Input
            type='text'
            placeholder='Titles, people, genres'
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: 'linear', duration: 0.3 }}
          />
        </SearchBar>
        {/* <FaBell /> */}
      </Col>
    </Nav>
  );
}
