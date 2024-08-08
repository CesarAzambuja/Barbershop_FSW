

import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-inf";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SmartphoneIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import BarberShopPhone from "./_components/barbershop-phone";




interface BarbershopDetailsPageProps {
    params: {
        id?: string;
    };


};

const BarbershopDetailsPage = async ({ params, }: BarbershopDetailsPageProps) => {

    const session = await getServerSession(authOptions)

    if (!params.id) {
        // TODO: Redirecionar para a homepage   
        return null;
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },

        include: {
            services: true,
        }
    })


    if (!barbershop) {
        // TODO: Redirecionar para a homepage   
        return null
    }


    return (
        <div>
            <BarbershopInfo barbershop={barbershop} />

            <div className="px-5 flex flex-col gap-4 py-6 border-b border-solid p-5">
                {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticated={session?.user} />
                ))}
            </div>

        </div>
    );


};

export default BarbershopDetailsPage;