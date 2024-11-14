import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const currentPage = useLocation().pathname;

  return (
    <ul className='nav nav-tabs'>
      <li className='nav-item'>
        <Link
          to='/'
          className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
      </li>
      <li className='nav-item'>
        <Link
          to='/SavedCandidates'
          className={
            currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'
          }
        >
          Potential Candidates
        </Link>
      </li>
    </ul>
  );
};

export default Nav;
