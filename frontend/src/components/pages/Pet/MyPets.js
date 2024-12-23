import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Link } from "react-router-dom";
import RoundedImage from '../../layout/RoundedImage';
import useFlashMessage from "../../../hooks/useFlashMessage";
import styles from './Dashboard.module.css';

function MyPets() {
  const [pets, setPets] = useState([]);
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    setLoading(true);
    setError(null); 
    api
      .get('/pets/mypets', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching pets:', err);
        setError('Failed to load your pets. Please try again later.');
        setLoading(false);
      });
  }, [token]);

  async function removePet(id) {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      let msgType = 'success';

      const data = await api
        .delete(`/pets/${id}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          const updatedPets = pets.filter((pet) => pet._id !== id);
          setPets(updatedPets);
          return response.data;
        })
        .catch((err) => {
          console.error(err);
          msgType = 'error';
          return err.response.data;
        });

      setFlashMessage(data.message, msgType);
    }
  }

  async function concludeAdoption(id) {
    let msgType = 'success';

    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
        msgType = 'error';
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  if (loading) {
    return <p>Loading your pets...</p>;
  }

  return (
    <section>
      <h1>My Pets</h1>
      <Link to="/pet/add" className={styles.modern_button}>Register Pet</Link>

      <div className={styles.petslist_container}>
        {error && <p className={styles.error_message}>{error}</p>}

        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className={`${styles.petlist_row} ${!pet.available ? styles.adopted : ''}`}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>

              {/* Display adopted status */}
              {!pet.available && (
                <span className={styles.adopted_label}>Adopted</span>
              )}

              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(pet._id);
                        }}
                      >
                        Conclude adoption
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Edit</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id);
                      }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <p>Pet already adopted</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No pets registered yet!</p>
        )}
      </div>
    </section>
  );
}

export default MyPets;
