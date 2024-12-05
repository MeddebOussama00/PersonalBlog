import React, { useEffect } from 'react'
import { useDispatch ,useSelector} from "react-redux";
import { Button } from '../components/ui/button'
import Loyout from '../components/Layout'
import Posts from '../components/Posts'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../Store';

const Home = () => {
  const dispatch = useDispatch();
  const  navigate=useNavigate();
  const { user, token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } 
  }, [dispatch, token, navigate]);


  return ( 
    <div>
      <Posts />
    </div>
  )
}

export default Home
