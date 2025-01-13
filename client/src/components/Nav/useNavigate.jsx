
import { useHistory } from 'react-router-dom';

const useNavigate = () => {
  const history = useHistory();

  const changePage = (page) => {
    console.log(`Changing page to: ${page}`);
    history.push(`/${page}`);
  };

  return { changePage };
};

export default useNavigate;