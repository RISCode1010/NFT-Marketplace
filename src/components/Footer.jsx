"use client"
import Image from 'next/legacy/image';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import images from '../assets';
import Button from './Button';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="flex flex-col py-8 bg-white border-t md:px-4 border-prim-gray-1 dark:bg-prim-dark dark:border-prim-black-1">
      {/* ===================Footer UpperSecTion=================== */}
      <div className="flex flex-row justify-between md:flex-col">
        {/* ===================Left Column=================== */}
        <div className="ml-32 md:ml-0">
          {/* ===================Brand=================== */}
          <div className="flex items-center justify-start md:ml-2">
            <Image
              src={images.logo}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />

            <p className="ml-2 text-lg font-bold text-black dark:text-prim-gray-1">
              TokenTrend
            </p>
          </div>

          {/* ===================Get Email=================== */}
          <div className="flex flex-col mt-10 md:px-5 md:items-center md:w-full">
            <p className="flex mb-5 text-lg font-semibold text-black font-poppins dark:text-prim-gray-1 md:ml-2">
              Get the latest updates
            </p>

            <div className="md:w-full sm:w-full w-80">
              <a
                href="#"
                className="w-full"
              >
                <Button
                  btnName="Subscribe now"
                  classStyles="rounded-md w-full h-10 text-white"
                />
              </a>
            </div>
          </div>
        </div>

        {/* ===================Right Column=================== */}
        <div className="flex justify-between md:flex-row md:mt-8">
          <div className="text-sm dark:text-prim-gray-1 mr-36 laptop:mr-60 md:mr-auto md:ml-auto sm:ml-5">
            <div className="text-black sm:mx-4 dark:text-prim-gray-1">
              <h3 className="mb-6 text-lg font-semibold font-poppins ">
                TokenTrend
              </h3>
              <Link href="/">
                <p className="footer-link">Explore</p>
              </Link>
              {/* <a href="/instruction">
                <p className="footer-link">Get started</p>
              </a> */}
              <a href="/about-us">
                <p className="footer-link">About us</p>
              </a>
              <a href="#">
                <p className="footer-link">Contact Us</p>
              </a>
            </div>
          </div>
          <div className="text-sm mr-52 dark:text-prim-gray-1 md:mr-auto sm:mr-5">
            <div className="text-black sm:mx-4 dark:text-prim-gray-1">
              <h3 className="mb-6 text-lg font-semibold font-poppins ">
                My Info
              </h3>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <p className="footer-link">Facebook</p>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <p className="footer-link">Github</p>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <p className="footer-link">LinkedIn</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===================Footer LowerSecTion=================== */}
      <div className="flex flex-row justify-between mt-3 border-t-2 tablet:mx-32 sm:flex-col dark:bg-prim-dark pt-7 dark:border-prim-black-3">
        <p className="flex font-semibold text-black sm:justify-center font-poppins text-md sm:text-xs dark:text-prim-gray-1 sm:ml-0">
          TokenTrend, Inc. All Rights Reserved
        </p>

        <div className="flex flex-row mr-10 sm:justify-center sm:mr-0 sm:mt-4">
          <a
            href="#"
            className="mx-3 md:mx-2 hover:cursor-pointer"
          >
            <Image
              src={images.instagram}
              width={25}
              height={25}
              alt="TokenTrend NFT Marketplace Instagram"
              className={`${theme === 'light' && 'filter invert'}`}
            />
          </a>
          <a
            href="#"
            className="mx-3 md:mx-2 hover:cursor-pointer"
          >
            <Image
              src={images.twitter}
              width={25}
              height={25}
              alt="TokenTrend NFT Marketplace Twitter"
              className={`${theme === 'light' && 'filter invert'}`}
            />
          </a>
          <a
            href="#"
            className="mx-3 md:mx-2 hover:cursor-pointer"
          >
            <Image
              src={images.telegram}
              width={25}
              height={25}
              alt="TokenTrend NFT Marketplace Twitter"
              className={`${theme === 'light' && 'filter invert'}`}
            />
          </a>
          <a
            href="#"
            className="mx-3 md:mx-2 hover:cursor-pointer"
          >
            <Image
              src={images.discord}
              width={25}
              height={25}
              alt="TokenTrend NFT Discord"
              className={`${theme === 'light' && 'filter invert'}`}
            />
          </a>
          <a
            href="#"
            className="mx-3 md:mx-2 hover:cursor-pointer"
          >
            <Image
              src={images.facebook}
              width={25}
              height={25}
              alt="TokenTrend NFT Marketplace Facebook"
              className={`${theme === 'light' && 'filter invert'}`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
