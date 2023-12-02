import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import useDarkMode from "../hooks/useDarkMode";

export const TopNavigation = ({ isLoading }) => {
  return (
    <div className="top-navigation">
      <Title />
      {isLoading && <TopSpinner />}
      <Search />
    </div>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="text-secondary my-auto" />
  </div>
);


const Title = () => <h5 className="title-text">Passwords</h5>;
const TopSpinner = () => <Spinner animation="border" className="top-spinner" />;
