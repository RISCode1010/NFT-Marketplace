"use client"
import { useCallback, useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../utils/pinata";
import { useRouter } from 'next/navigation';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { Context } from '../../context/Context';
import Loading from '../../components/Loading';



const CreateNFT = () => {
  const { connectWallet, createNFT, loading, setLoading, logIn, } =
    useContext(Context);
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: '',
    description: '',
    price: '',
  });


  useEffect(() => {
    if (!logIn) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [logIn]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const createMarketItem = async () => {
    const { name, description, price } = formInput;

    if (!fileUrl || !name || !description || !price || price > 3) return;

    const data = JSON.stringify({ name, description, image: fileUrl });
    // console.log(data);
    try {
      const response = await uploadJSONToIPFS(data);
      if(response.success !== true){
        return;
      }
      setLoading(true);
      await createNFT(response.pinataURL, price);
      setLoading(false);
      router.push('/');
    } catch (error) {
      console.log('Error creating NFT:', error);
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    // await uploadToInfura(acceptedFile[0]);
   const data = await uploadFileToIPFS(acceptedFile[0])
    setFileUrl(data.pinataURL);
  // console.log(data.pinataURL);
  // console.log(acceptedFile[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxSize: 3000000,
    maxFiles: 1,
  });

  

  return (
    <div className="p-16 md:p-8">
      <div className="flex flex-row items-center sm:flex-col">
        <h1 className="ml-4 text-3xl font-semibold font-poppins">
          Create your
        </h1>
        <div className="ml-2 text-4xl font-extrabold font-poppins sm:mt-2 font-gradient">
          NFT
        </div>
      </div>

      <div className="mt-10">
        <p className="text-xl font-semibold font-poppins">Upload file</p>
        <div className="mt-4">
          <div
            {...getRootProps()}
            className="flex flex-col items-center p-5 border-4 border-dashed dark:bg-prim-black-1 dark:border-white border-prim-gray-2 rounded-xl"
          >
            <input {...getInputProps()} />
            <div className={fileUrl && 'hidden'}>
              <div className="flex flex-col items-center">
                <p className="my-2 text-lg font-semibold font-poppins">
                  Drag and drop your file here
                </p>
                <p className="my-2 text-lg font-semibold font-poppins">or</p>
                <p className="my-2 text-lg font-semibold font-poppins">
                  Click here to import file from your device
                </p>
              </div>
            </div>

            {fileUrl && (
              <div>
                <img src={fileUrl} alt="nft_file" />
              </div>
            )}
          </div>
        </div>
      </div>

      <Input
        inputType="input"
        title="Name"
        placeholder="NFT Name"
        handleClick={(e) =>
          setFormInput({ ...formInput, name: e.target.value })
        }
      />
      <Input
        inputType="textarea"
        title="Description"
        placeholder="Describe your NFT"
        handleClick={(e) =>
          setFormInput({ ...formInput, description: e.target.value })
        }
      />
      <Input
        inputType="number"
        title="Price"
        placeholder="NFT Price (Max: 3.0 ETH)"
        nftPrice={formInput.price}
        handleClick={(e) =>
          setFormInput({ ...formInput, price: e.target.value })
        }
      />
      <div className="flex justify-end mt-10">
        <Button
          btnName="Create NFT"
          classStyles="rounded-lg text-lg active:scale-110 duration-100"
          handleClick={createMarketItem}
        />
      </div>
      {!logIn && (
        <Modal
          closeBtn={false}
          header={
            <p className="my-2 font-bold">Need Metamask Wallet connected 🦊</p>
          }
          body={
            <div className="text-center">
              <p className="text-lg font-poppins">
                Please connect your Metamask Wallet to be able to mint your NFT
              </p>
            </div>
          }
          footer={
            <div className="flex justify-center ">
              <Button
                btnName="Connect now"
                classStyles={`mx-2 rounded-xl active:scale-110 duration-100 `}
                handleClick={() => {
                  connectWallet();
                }}
              />
            </div>
          }
        />
      )}
      {loading ? (
        <Modal
          header={
            <p className="my-2 font-bold">Please wait for MetaMask Window 🔓</p>
          }
          body={
            <>
              <Loading />
              <div className="text-center">
                <p className="text-lg font-poppins">
                  The transaction might be a little bit slow. We&#39;ll redirect
                  you after the transaction succeeded.
                </p>
              </div>
            </>
          }
          handleClose={() => {}}
        />
      ) : null}
    </div>
  );
};

export default CreateNFT;
