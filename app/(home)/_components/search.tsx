"use client"

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({

    title: z.string().trim().min(1, { message: "campo obrigatório para busca!", }),
})


const Search = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const router = useRouter();

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershopsearch?title=${data.title}`)
    }

    return (

        <Form {...form} className>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-center gap-2 w-full">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full">

                            <FormControl  >
                                <Input placeholder="Busque por uma de nossas unidades!" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="default" size="icon" onClick={handleSubmit} type="submit">
                    <SearchIcon size={18} />
                </Button>
            </form>
        </Form>



    );
}

export default Search;