import { Fragment, useState } from 'react'
import Banner from '../home/Banner'
import SearchBar from './SearchBar';
import { MdAccountCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import Logo from './Logo';

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
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Navigation from './Navigation'
import UserCart from './UserCart';

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ userName, cartItemCount }) {
  const [open, setOpen] = useState(false)


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
                                {section.name}
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

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                        Sign in
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                        Create account
                      </a>
                    </div>
                  </div>
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
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="ml-4  hidden xl:flex lg:flex md:flex ">
                  Каталог
                </div>

                {/* Logo */}
                <div className="ml-4 flex  xl:hidden md:hidden lg:hidden">
                  <a href="/">
                    <Logo/>
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
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured.map((item) => (
                                          <div key={item.name} className="group relative text-base sm:text-sm">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                              <img
                                                src={item.imageSrc}
                                                alt={item.imageAlt}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                              <span className="absolute inset-0 z-10" aria-hidden="true" />
                                              {item.name}
                                            </a>
                                            <p aria-hidden="true" className="mt-1">Shop now</p>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                        {category.sections.map((section) => (
                                          <div key={section.name}>
                                            <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                              {section.name}
                                            </p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${section.name}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {section.items.map((item) => (
                                                <li key={item.name} className="flex">
                                                  <a href={item.href} className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </li>
                                              ))}
                                            </ul>
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
                    <a href='/best-sellers' className='flex sm:inline-flex justify-center items-center bg-orange-500 hover:bg-green-600 active:bg-green-700 focus-visible:ring ring-green-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2'>Бестселлеры</a>
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
