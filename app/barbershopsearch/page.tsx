
import BarbershopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";
import Header from "../_components/header";
import { db } from "../_lib/prisma";

interface BarbershopSearchProps {
    searchParams: {
        search?: string
    }
};

const BarbershopSearchPage = async ({ searchParams }: BarbershopSearchProps) => {

    const barberShopSearch = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams?.search,
                mode: "insensitive",
            }
        }
    })


    return (

        <div>
            <Header />
            <div className="mt-6 px-5">
                <Search />
            </div>
            <h2 className="mb-3 mt-6 text-xs font bold uppercase text-gray-400 px-5">Resultados para &quot; {searchParams.search}&quot;</h2>

            <div className="grid grid-cols-2 gap-4 px-5">
                {barberShopSearch.map((barbershop) => (
                    <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
            </div>

        </div>
    );

};

export default BarbershopSearchPage;