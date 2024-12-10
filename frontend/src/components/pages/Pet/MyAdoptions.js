import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import styles from './Dashboard.module.css'
import RoundedImage from '../../layout/RoundedImage'

function MyAdoptions() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [token] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    setLoading(true)
    setError(null)
    api
      .get('/pets/myadoptions', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching pets:', err)
        setError('Failed to load your adoptions. Please try again later.')
        setLoading(false)
      })
  }, [token])

  if (loading) {
    return <p>Loading your adoptions...</p>
  }

  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Minhas adoções</h1>
      </div>
      <div className={styles.petslist_container}>
        {error && <p className={styles.error_message}>{error}</p>}

        {pets.length > 0 ? (
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Call:</span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Talk:</span> {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoption in process</p>
                ) : (
                  <p>Congratulations on finalizing the adoption</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.no_adoptions}>No pets adopted yet!</p>
        )}
      </div>
    </section>
  )
}

export default MyAdoptions
