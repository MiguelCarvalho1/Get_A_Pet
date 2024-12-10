import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styles from './PetDetails.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails() {
  const [pet, setPet] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const [token] = useState(localStorage.getItem('token') || '')
  const [isRequesting, setIsRequesting] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`/pets/${id}`)
      .then((response) => {
        setPet(response.data.pet)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching pet details:', error)
        setLoading(false)
        setFlashMessage('Error fetching pet details. Please try again later.', 'error')
      })
  }, [id])

  async function schedule() {
    setIsRequesting(true)
    let msgType = 'success'

    const data = await api
      .patch(`pets/schedule/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)
    setIsRequesting(false)
  }

  if (loading) {
    return <p>Loading pet details...</p>
  }

  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Getting to know the Pet: {pet.name}</h1>
            <p>If you're interested, make an appointment to see it!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
                loading="lazy"
              />
            ))}
          </div>
          <p>
            <span className="bold">Weight:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Age:</span> {pet.age} anos
          </p>
          {token ? (
            <button onClick={schedule} disabled={isRequesting}>
              {isRequesting ? 'Requesting...' : 'Request a visit'}
            </button>
          ) : (
            <p>
              You need <Link to="/register">create an account</Link> to request a visit.
            </p>
          )}
        </section>
      )}
    </>
  )
}

export default PetDetails
