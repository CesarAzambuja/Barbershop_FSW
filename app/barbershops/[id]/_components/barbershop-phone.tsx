"use client"

import { Button } from "@/app/_components/ui/button";
import { SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";


interface BarberShopPhoneProps {
    phone: string
}



const BarberShopPhone = ({ phone }: BarberShopPhoneProps) => {

    const handleCopyPhoneClick = (phone: string) => {
        navigator.clipboard.writeText(phone)
        toast.success("Telefone copiado com sucesso!")
    }
    return (

        < div className="flex justify-between p-2" key={phone} >
            <div className=" flex items-center gap-2">
                <SmartphoneIcon />
                <p className="text-sm">{phone}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleCopyPhoneClick(phone)}>Copiar</Button>
        </div >

    )
}

export default BarberShopPhone;