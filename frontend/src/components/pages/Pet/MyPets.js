import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function MyPets() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        
        const fetchPets = async () => {
            const fetchedPets = []; 
            setPets(fetchedPets);
        };
        fetchPets();
    }, []);

    return (
        <section>
            <h1>My Pets</h1>
            <Link to="/pet/add">Add Pets</Link>
            <div>
                {pets.length > 0 ? (
                    <div>
                        <p>List of my pets:</p>
                        <ul>
                            {pets.map((pet, index) => (
                                <li key={index}>{pet.name}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No pets found</p>
                )}
            </div>
        </section>
    );
}

export default MyPets;
