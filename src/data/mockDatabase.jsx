import React, { useEffect, useState } from "react";
import { getTutorEx } from "../services/api";


function Database() {
    const [tutor, setTutor] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getTutorEx();
            setTutor(response.data);
            setLoading(false);
        })();
    }, [])

    return (
        <div>

            <ul>
                [
                {
                    tutor.map((tutors) => (
                        <li key={tutors.id}>
                            {tutors.id} - {tutors.nome}
                        </li>
                    ))
                }
                ]

            </ul>
        </div>
    );
}

export default Database;

