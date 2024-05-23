import React, { useState, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

import { VotingContext } from "../context/Voter";
import Style from '../styles/allowedVoter.module.css';
import images from '../assets';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';

const AllowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { uploadToIPFS, createVoter, voterArray, getAllVoterData } = useContext(VotingContext);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setLoading(true);
    try {
      const url = await uploadToIPFS(file);
      setFileUrl(url);
    } catch (error) {
      setError('Error uploading file to IPFS');
    } finally {
      setLoading(false);
    }
  }, [uploadToIPFS]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5000000,
  });

  useEffect(() =>{
    getAllVoterData();
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      await createVoter(formInput, fileUrl, router);
    } catch (error) {
      setError('Error creating voter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
          <div className={Style.voterInfo}>
            <img src={fileUrl} alt="Voter" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name: <span>{formInput.name}</span>
              </p>
              <p>
                Address: <span>{formInput.address.slice(0, 20)}</span>
              </p>
              <p>
                Position: <span>{formInput.position}</span>
              </p>
            </div>
          </div>
        )}

        {!fileUrl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create candidate for voting</h4>
              <p>Blockchain voting system</p>
              <p className={Style.sideInfo_para}>Contract candidate</p>
            </div>
          </div>
        )}
      </div>

      <div className={Style.card}>
        {voterArray.map((el, i)=>(
          <div key={i + 1} className={Style.card_box}>
            <div className={Style.image}>
              <img src={el[4]} alt="profile photo"/>
            </div>
            <div className={Style.card_info}>
              <p>{el[1]}</p>
              <p>address: {el[3]}.slice(0, 10)</p>
            </div>
          </div>
        ))}
      </div>

      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Voter</h1>
          <div className={Style.voter_container_box}>
            <div className={Style.voter_container_box_div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.voter_container_box_div_info}>
                  <p>Upload File: JPG, PNG, GIF, max 10MB</p>
                  <div className={Style.voter_container_box_div_image}>
                    <Image src={images.upload} width={150} height={150} objectFit="contain" alt="File Upload" />
                  </div>
                  <p>Drag & Drop File</p>
                  <p>or Browse Media on your Device</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={Style.input_container}>
          <Input
            inputType="text"
            title="Name"
            name="name"
            placeholder="Voter Name"
            handleClick={handleInputChange}
          />
          <Input
            inputType="text"
            title="Address"
            name="address"
            placeholder="Voter Address"
            handleClick={handleInputChange}
          />
          <Input
            inputType="text"
            title="Position"
            name="position"
            placeholder="Voter Position"
            handleClick={handleInputChange}
          />
          <div className={Style.Button}>
            <Button btnName="Authorize Voter" handleClick={handleSubmit} disabled={loading} />
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className={Style.error}>{error}</p>}
        </div>
      </div>

      <div className={Style.createdVoter}>
        <div className={Style.createdVoter_info}>
          <Image src={images.creator} alt="user Profile" />
          <p>Notice for User</p>
          <p>Organizer <span></span></p>
          <p>Only Organizer of the Voting can create voting</p>
        </div>
      </div>
    </div>
  );
};

export default AllowedVoters;
