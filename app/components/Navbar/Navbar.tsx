"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { IoMdSearch, IoIosHeart, IoLogoWhatsapp } from 'react-icons/io';
import { FaCaretDown } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Darkmode from './Darkmode';
import { useLocalStorage } from '../LocalStorage/LocalStorage';

const MenuLinks = [
  {
    id: 1,
    name: "Inicio",
    link: "/"
  },
  {
    id: 2,
    name: "En tendencia",
    link: "/trend"
  }
]

const DropdownLinks = [
  {
    id: 1,
    name: "contrentrega",
    link: "/#"
  },
  {
    id: 2,
    name: "con descuento",
    link: "/"
  }
]

const Navbar = () => {
  const [favIcon, setFavIcon] = useLocalStorage('fav', [])
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className='py-4'>
        <div className="container flex justify-between items-center">
          <div className='flex items-center gap-4'>
            <div className='dark:text-white stext-black font-semibold tracking-widest text 2xl uppercase sm:text-3xl'>
              INDUCOR
            </div>
            <div className='hidden lg:block'>
              <ul className='flex items-center gap-4'>
                {
                  MenuLinks.map((data, index) => (
                    <li key={index}>
                      <a href={data.link} className='inline-block px-4 font-semibold text-gray-500 hover:text-violet-400 dark:hover:text-white duration-200'
                      >
                        {data.name}
                      </a>
                    </li>
                  ))
                }
                <li className='relative cursor-pointer group flex items-center gap-2'>
                  <a href="$" className='flex items-center gap-[px] font-semibold text-gray-500 hover:text-violet-400 py-2'>
                    Servicios
                  </a>
                  <div className='absolute top-[40px] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2 dark:text-white '>
                    <ul className='space-y-2'>
                      {
                        DropdownLinks.map((data, index) => (
                          <li key={index}>
                            <a href={data.link} className='text-gray-500 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rpunded-md font-semibold'>
                              {data.name}
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <span>
                    <FaCaretDown className='group-hover:rotate-180 duration-300' />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex justify-between items-center gap-4'>
            <div className='relative group sm:block'>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder='buscar'
                  className='search-bar'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IoMdSearch className='text-xl text-gray-600 group-hover:text-pretty dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-1 duration-200' />
              </form>
            </div>
            <a href='/favorites'>
              <button className='relative p-3'>
                <IoIosHeart className='text-xl text-gray-600 dark:text-gray-400' />
                <div className='w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs'>{favIcon.length}</div>
              </button>
            </a>
            <div>
              <Darkmode />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navbar;