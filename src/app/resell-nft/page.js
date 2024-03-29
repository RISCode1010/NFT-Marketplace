"use client"
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from "next/legacy/image";

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Context } from '../../context/Context'
import Loading from '../../components/Loading';

const ResellNFT = (req) => {
  const { createNFT,loading, setLoading } = useContext(Context);
  const [resellPrice, setResellPrice] = useState('');
  const [nftImage, setNftImage] = useState('');
  const [nftName, setNftName] = useState('');
  const router = useRouter();
  const { id, tokenURI } = req.searchParams;

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setNftImage(data.image);
    setResellPrice(data.price);
    setNftName(data.name);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center px-24 py-16 md:p-8">
      <div className="flex flex-row items-center w-full sm:flex-col">
        <h1 className="text-4xl font-semibold md:text-3xl font-poppins">
          {nftName}
        </h1>
      </div>

      <div className="relative w-full mt-10 h-700 md:h-80">
        <Image
          alt=""
          src={nftImage}
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
        />
      </div>
      <Input
        inputType="number"
        title="Price"
        placeholder="NFT Price"
        handleClick={(e) => setResellPrice(e.target.value)}
      />
      {loading?<Loading/>:<div className="flex justify-end mt-10">
        <Button
          btnName="Sell NFT"
          classStyles="rounded-lg text-lg active:scale-110 duration-100"
          handleClick={async() => {
            setLoading(true);
            await createNFT(tokenURI, resellPrice, id, true);
            setLoading(false);
            router.push('/listed');
          }}
        />
      </div>}
    </div>
  );
};

export default ResellNFT;
