import styles from "./Form.module.css";
import Input from "./Input";
import { useState } from "react";
import Select from "./Select";

function PetForm({ handleSubmit, petData, btnText }) {

  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);

  const colors = ["Black", "Grey", "Caramel", "White"];

 
  function onFileChange(e) {
    const files = Array.from(e.target.files);
    setPreview(files); 
    setPet({ ...pet, images: files }); 
  }

  
  function handlePetChange(e) {
    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  
  function handleColor(e) {
    setPet({
      ...pet,
      color: e.target.options[e.target.selectedIndex].text,
    });
  }


  function submit(e) {
    e.preventDefault();
    console.log(pet);
     handleSubmit(pet);
  }

  return (
    <form onSubmit={submit} className={styles.form_container}>
     <div className= {styles.preview_pet_images}>
  {preview.length > 0
    ? preview.map((image, index) => (
        <img
          src={URL.createObjectURL(image)} 
          alt={`Pet ${pet.name} ${index}`}
          key={`${pet.name}-${index}`} 
        />
      ))
    : pet.images &&
      pet.images.map((image, index) => (
        <img
          src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
          alt={`Pet ${pet.name} ${index}`}
          key={`${pet.name}-${index}`} 
        />
      ))}
</div>
      <Input
        text="Image of Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      <Input
        text="Name"
        type="text"
        name="name"
        placeholder="Write the name"
        handleOnChange={handlePetChange}
        value={pet.name || ""}
      />
      <Input
        text="Age"
        type="number"
        name="age"
        placeholder="Write the Age"
        handleOnChange={handlePetChange}
        value={pet.age || ""}
      />
      <Input
        text="Weight"
        type="number"
        name="weight"
        placeholder="Write the Weight"
        handleOnChange={handlePetChange}
        value={pet.weight || ""}
      />
      <Select
        name="color"
        text="Select color"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <Input type="submit" value={btnText} />
    </form>
  );
}

export default PetForm;
