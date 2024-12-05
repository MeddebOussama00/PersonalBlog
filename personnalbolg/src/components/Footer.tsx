import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { RootState } from '../Store';
import { useSelector } from "react-redux";

const Footer: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToCategory = (category: string) => {
    navigate(`/post/category?category=${category}`);
  };

  const { token } = useSelector((state: RootState) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if(!token){
    return null;
  }

  return (
    <footer className='bg-background p-2'>
      <div className='border-t border-b border-gray-200 py-4'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-center'>
            <Link to={"/home"} className="mb-4 sm:mb-0">
              <div className="text-3xl font-bold text-blue-900">
                Personal<span className="text-sm text-purple-600">.Blog</span>
              </div>
            </Link>
            <div className="hidden sm:flex space-x-4">
              <button onClick={() => goToCategory('css')} className="bg-transparent text-gray-600 hover:text-blue-900 transition duration-300">CSS</button>
              <button onClick={() => goToCategory('javascript')} className="bg-transparent text-gray-600 hover:text-blue-900 transition duration-300">JavaScript</button>
              <button onClick={() => goToCategory('react')} className="bg-transparent text-gray-600 hover:text-blue-900 transition duration-300">React js</button>
            </div>
            <div className="sm:hidden">
              <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-900 transition duration-300">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="mt-4 sm:hidden">
              <div className="flex flex-col space-y-2">
                <button className="bg-transparent text-gray-600 hover:text-blue-900 transition duration-300" onClick={() => goToCategory('css')}>CSS</button>
                <button className="bg-transparent text-gray-600 hover:text-blue-900 transition duration-300" onClick={() => goToCategory('javascript')}>JavaScript</button>
                <button className="bg-transparent text-gray-600 hover:text-blue-900 transition duration-300" onClick={() => goToCategory('react')}>React js</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer

