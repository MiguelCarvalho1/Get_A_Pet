import styles from "./AddPet.module.css";
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import useFlashMessage from "../../../hooks/useFlashMessage";
import { useParams, useNavigate } from 'react-router-dom'

import PetForm from "../../form/PetForm";

function EditPet() {
  const [pet, setPet] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate(); 

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet)
      })
  }, [token, id]);

  async function updatePet(pet) {
    let msgType = 'success';
    const formData = new FormData();

    Object.keys(pet).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i]);
        }
      } else {
        formData.append(key, pet[key]);
      }
    });

    try {
      const data = await api.patch(`pets/${pet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setFlashMessage(data.message, msgType);
      navigate('/pet/mypets');
    } catch (err) {
      console.error(err);
      msgType = 'error';
      setFlashMessage(err.response.data.message || "Failed to update pet", msgType);
    }
  }

  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Edit Pet: {pet.name}</h1>
      </div>
      {pet.name && (
        <PetForm handleSubmit={updatePet} petData={pet} btnText="Edit" />
      )}
    </section>
  );
}

export default EditPet;
