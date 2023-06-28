import logo from '../images/logo.svg';
import Menu from './Menu';

const Header = ({onLogOut, userEmail}) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место Россия"/>
      <Menu onLogOut={onLogOut} userEmail={userEmail}/>
    </header>
  );
};

export default Header;