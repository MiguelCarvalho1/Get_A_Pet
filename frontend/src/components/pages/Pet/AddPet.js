import styles from "./AddPet.module.css";
import api from "../../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";

import PetForm from "../../form/PetForm";

function AddPet() {
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Register Pet:</h1>
        <p>Then he will be available for adoption</p>
      </div>
      <PetForm btnText = "Register Pet" />
    </section>
  );
}
export default AddPet;
