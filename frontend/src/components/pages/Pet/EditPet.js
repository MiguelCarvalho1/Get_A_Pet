import styles from "./AddPet.module.css";
import api from "../../../utils/api";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessage";

import PetForm from "../../form/PetForm";





function EditPet(){
    return(
        <section>
            <h1>Edit Pet</h1>
        </section>
    )

}
export default EditPet