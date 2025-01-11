import { FieldValues } from "react-hook-form";
import { ZodType } from "zod";

export interface FormProperties<T extends FieldValues> {
    schema: ZodType<T>
    defaultValues: T
    onSubmit: (data: T) => Promise<void>
}