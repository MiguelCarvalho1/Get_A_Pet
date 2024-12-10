import api from '../../../utils/api'

import Input from '../../form/Input'

import { useState, useEffect } from 'react'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layout/RoundedImage'

function Profile() {
  const [user, setUser] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()

  useEffect(() => {
    api
      .get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data)
      })
  }, [token])

  function handleUserChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function onFileChange(e) {
    setPreview(e.target.files[0])
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let msgType = 'success'

    const formData = new FormData()

    const userFormData = await Object.keys(user).forEach((key) =>
      formData.append(key, user[key]),
    )

    formData.append('user', userFormData)

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
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
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Profile</h1>
        {(user.image || preview) && (
          <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}/images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        <Input
          text="Image"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Enter your e-mail address"
          handleOnChange={handleUserChange}
          value={user.email || ''}
        />
        <Input
          text="Name"
          type="text"
          name="name"
          placeholder="Enter the name"
          handleOnChange={handleUserChange}
          value={user.name || ''}
        />
        <Input
          text="Phone"
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          handleOnChange={handleUserChange}
          value={user.phone || ''}
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          handleOnChange={handleUserChange}
        />
        <Input
          text="Password confirmation"
          type="password"
          name="confirmpassword"
          placeholder="Confirm your password"
          handleOnChange={handleUserChange}
        />
        <input type="submit" value="Edit" />
      </form>
    </section>
  )
}

export default Profile
