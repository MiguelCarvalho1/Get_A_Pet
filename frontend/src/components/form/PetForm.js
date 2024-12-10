import styles from './Form.module.css'
import Input from './Input'
import { useState } from 'react'



function onFileChange (e){

}

function handleChange(e){

}


function PetForm({handleSubmit,petData, btnText}){
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState([]);
    const colors = ["Black", "Grey", "Caramel", "White"  ];

    return(
            <form className= {styles.form_container}>
                   <Input
                   text="Image of Pet"
                   type='file'
                   name='images'
                   handleOnChange={onFileChange}
                   multiple={true}
                   />
                   <Input
                   text="Name"
                   type='text'
                   name='name'
                   placeholder='Write the name'
                   handleOnChange={handleChange}
                   value={pet.name || ''}
                   />
                   <Input
                   text="Age"
                   type='number'
                   name='age'
                   placeholder='Write the Age'
                   handleOnChange={handleChange}
                   value={pet.age || ''}
                   />
                    <Input
                   text="Weight"
                   type='number'
                   name='weight'
                   placeholder='Write the Weight'
                   handleOnChange={handleChange}
                   value={pet.weight || ''}
                   />
                   <Input type='submit' value={btnText}/>
            </form>
    )
}
export default PetForm