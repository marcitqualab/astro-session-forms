
import React, { useEffect } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";


type FormValues = {
    csrfToken: string,
    username: string
}

function getFormData(d: FormValues) {
    console.log(d);
    const formData = new FormData();
    formData.append('csrfToken', d.csrfToken);
    formData.append('username', d.username);
    return formData;
}

export default function CtaForm({ csrfToken }: { csrfToken: string }) {
    const [formCsrfToken, setFormCsrfToken] = React.useState(csrfToken)    

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            csrfToken: formCsrfToken,
            username: 'nameTest'
        }
    })

    const submitToAstroPage: SubmitHandler<FormValues> = async (data) => {
        console.log(data);
        const formData = getFormData(data);
        console.log(formData);
        const response = await fetch('/cta', {
            method: 'POST',
            body: formData
        });
        console.log(response);
    }

    useEffect(() => {
        setFormCsrfToken(csrfToken)
    }, [])

    return (
        <div>
            <h2>React form To Astro Page</h2>
            <form onSubmit={handleSubmit(submitToAstroPage)} >
                <input type="text" {...register("csrfToken")}  />
                <label>
                    Username:
                    <input type="text" {...register('username')} required />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}