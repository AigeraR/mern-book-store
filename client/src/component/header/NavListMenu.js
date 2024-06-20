import { Fragment, useState, useEffect } from 'react'
import Logo from './Logo';
import axios from 'axios';

import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Navigation from './Navigation'
import UserCart from './UserCart';
import { Link } from 'react-router-dom';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function Example({ userName, cartItemCount }) {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/category/getAllCategories');
        setMenu(response.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const navigation = {
    categories: menu.length > 0 ? [
      {
        featured: [
          {
            name: 'Бестселлер',
            href: '/bestseller',
            imageSrc: 'https://ndc.book24.ru/resize/820x1180/iblock/a9f/a9f13a9db6c6591c197f59d1c50b483c/55fbd607f148d871c96e60d36cfd3f3f.jpg',
            imageAlt: 'бестселлер',
          },
          {
            name: 'Популярное',
            href: '#',
            imageSrc: 'https://litres.ru/pub/c/cover/123230.jpg',
            imageAlt: 'популярное',
          },
        ],
        sections: menu.map((category) => ({
          id: category._id,
          name: category.name,
          href: `/catalog/${category._id}`,
          items: category.subcategories.map((subcategory) => ({
            name: subcategory.name,
            href: `/catalog/${category._id}/${subcategory._id}`,
          })),
        })),
      },
    ] : [],
    pages: [
      { name: 'Company', href: '#' },
      { name: 'Stores', href: '#' },
    ],
  }

  return (
    <div className='relative m-0'>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition show={open}>
          <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div className="fixed inset-0 z-40 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 border-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <TabGroup className="mt-2">
                    <div className="border-b border-gray-200">
                      <TabList className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                              )
                            }
                          >
                            {/* {category.name} */}Mobi
                          </Tab>
                        ))}
                      </TabList>
                    </div>
                    <TabPanels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <TabPanel key={category.name} className=" px-4 pb-8 pt-10">
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                <a href={section.href}>{section.name}</a>
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </TabGroup>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>
        <header className="relative xl:z-50 md:z-0  xl:50 z-0   bg-white">
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 lg:hidden border-white"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Открыть меню</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="ml-4  hidden xl:flex lg:flex md:flex ">
                  <Link to="/catalog">
                    Каталог
                  </Link>
                </div>

                {/* Logo */}
                <div className="ml-4 flex  xl:hidden md:hidden lg:hidden">
                  <a href="/">
                    <Logo />
                  </a>
                </div>

                {/* Flyout menus */}
                <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch z-40">
                  <div className="flex h-full space-x-8">
                    {navigation.categories.map((category, categoryIdx) => (
                      <Popover key={category.name} className="flex">
                        {({ open }) => (
                          <>
                            <PopoverButton
                              className={classNames(
                                open ? 'border-indigo-600 text-indigo-600 z-40' : 'border-transparent text-gray-700 hover:text-gray-800 z-0',
                                'relative -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              <Bars3Icon className='h-7 w-7' />
                              <span className="h-14  left-9 absolute w-px bg-gray-200" aria-hidden="true" />
                            </PopoverButton>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Mega menu */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                <div className="relative bg-white z-40">
                                  <div className="mx-auto max-w-7xl px-8 py-12">
                                    <div className="grid grid-cols-12 gap-y-5 gap-x-8">
                                      {/* Левый столбец с категориями */}
                                      <div className="col-span-8 grid grid-cols-4 gap-y-5 gap-x-8">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p id={`${section.name}-heading`} className="font-semibold text-gray-900 mb-2">
                                              <a href={section.href}>{section.name}</a>
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="space-y-2"
                                            >
                                              {section.items.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-blue-600 ">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                      {/* Правый столбец с изображениями */}
                                      <div className="col-span-4 grid grid-cols-2 gap-6">
                                        {category.featured.slice(0, 2).map((item) => (
                                          <div key={item.name} className="group relative text-center">
                                            <div className="overflow-hidden rounded-lg group-hover:opacity-75  flex items-center justify-center">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center w-40 h-62"
                                              />
                                            </div>
                                            <a href={item.href} className="mt-4 block bg-orange-500 p-1 rounded-md shadow-md hover:bg-green-600 active:bg-green-700 focus-visible:ring ring-green-300 text-white font-medium text-gray-900">
                                              <span className="absolute inset-0 z-10" aria-hidden="true" />
                                              {item.name}
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </PopoverPanel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
                  </div>

                </PopoverGroup>
                <div className='items-center justify-center hidden xl:flex lg:flex md:flex'>
                  <div className='ml-32 md:ml-2 lg:ml-51 xl:ml-32 items-center justify-center '>
                    <Navigation />
                  </div>
                  <div className='ml-72 md:ml-0 lg:ml-52 text-sm'>
                    <a href='catalog/bestseller' className='flex sm:inline-flex justify-center items-center bg-orange-500 hover:bg-green-600 active:bg-green-700 focus-visible:ring ring-green-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2'>Бестселлеры</a>
                  </div>
                </div>
                <div className="ml-auto flex items-center ">
                  <div className="flex xl:hidden lg:hidden md:hidden justify-between items-center p-4">
                    <UserCart userName={userName} cartItemCount={cartItemCount} />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}