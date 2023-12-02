const axios = require('axios')
const FormData = require('form-data')
// const fs = require('fs')
const key = "bc90db028413dd79b1b5";
const secret = "bc13fd785e52129fe766af18d45520560bda1e7973b451dd7b21528a4abb5570";
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNWU1ZDQ4Zi1kYWUxLTQ2YzYtOTdmMC1jYjNiNDk3YjhlODciLCJlbWFpbCI6InJpc2NvZGUxMDEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlZmI2Mzg3MTY4NGEyNzYwODJhOCIsInNjb3BlZEtleVNlY3JldCI6ImUwMmQ4MWVjMTVlOTgzZWE4YjE5YTc3MWE3MzQ0OTM3ZmEwNjZjMDczYzk5ZTQwNTFlNDk3YTEyZjJlOWRkMTQiLCJpYXQiOjE2OTkzNDYzNTl9.6dVjbHOKK144Og_r6T7PVNMlwWnLO_uStaKR8EBrH9k'

export const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return await axios
      .post(url, JSONBody, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${JWT}`,
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(function (response) {
        return {
          success: true,
          pinataURL:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

export const uploadFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️
    // console.log(axios);
  
    let data = new FormData();
    console.log(data);
    data.append("file", file);
  
    const metadata = JSON.stringify({
      name: "testname",
      keyvalues: {
        exampleKey: "exampleValue",
      },
    });
    data.append("pinataMetadata", metadata);
  
    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
        regions: [
          {
            id: "FRA1",
            desiredReplicationCount: 1,
          },
          {
            id: "NYC1",
            desiredReplicationCount: 2,
          },
        ],
      },
    });
    data.append("pinataOptions", pinataOptions);
  
    return await axios
      .post(url, data, {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          Authorization: `Bearer ${JWT}`,
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(function (response) {
        console.log("image uploaded", response.data.IpfsHash);
        return {
          success: true,
          pinataURL:
            "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };