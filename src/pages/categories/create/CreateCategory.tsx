import { useNavigate } from "react-router-dom"
import { FormComponent } from "@/components/form/form";
import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "La categoria es demasiado corta"
    })
})

export const CreateCategory = () => {

    const navigate = useNavigate()

    const defaultValues = {
        name: ""
    }

    return (
        <div>
            <h2>Crear Categoria</h2>
            <FormComponent
                schema={formSchema}
                defaultValues={defaultValues}
                onSubmit={(values) => { console.log(values); return }}
            />
        </div>
    )

}