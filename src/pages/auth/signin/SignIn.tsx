import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "@/redux/authSlice";
import { signIn } from "@/services/auth";
import axios from "axios";


export const formSchema = z.object({
    email: z.string().min(2, {
        message: "El email es demasiado corto"
    }),
    password: z.string().min(5, {
        message: "La contraseña es demasiado corta"
    })
})

export const SignIn = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await signIn(values.email, values.password);
            dispatch(loginSuccess({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                email: response.email,
                permissions: response.permissions
            }))
            navigate("/", { replace: true });
        } catch (e) {
            const errorMessage = axios.isAxiosError(e) ? e.response?.data?.message || "Error desconocido" : "Algo salió mal";
            dispatch(loginFailure(errorMessage));
        }
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Iniciar sesion</CardTitle>
                    <CardDescription>Introduce tus credenciales para iniciar sesion</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} type="email" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="my-2">
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contraseña" {...field} type="password" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full my-2">Iniciar sesion</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
