
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import { db } from "../_lib/prisma";
import { Key } from "react";
import Image from "next/image";

import { Button } from "../_components/ui/button";

import Header from "../_components/header";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/optionsSearch";
import Link from "next/link";





export default async function Home() {

  //Chamaar banco para pegar dados 
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })


  return (
    <div>
      <Header />

      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá César!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>

      </div>

      <div className="px-5 mt-6">
        <Search />
      </div>

      <div className="px-5 mt-6"><img src="/banner.png" alt="Banner" /></div>

      <div className="flex gap-3 px-5 pt-5 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => {
          return (
            <Button className="gap-2" variant="secondary" key={option.title} asChild>
              <Link href={`/barbershopsearch?service=${option.title}`}>
                <Image src={option.imageUrl} width={16} height={16} alt={option.title} />
                {option.title}
              </Link>
            </Button>
          );
        })}

      </div>


      <h2 className="text-xs uppercase text-gray-400 px-5 pt-3 mt-4 font-bold">Sobrancelha</h2>
      <div className="px-5 mt-4">
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className="text-xs uppercase text-gray-400 px-5 pt-3 mt-4 font-bold mb-3">Recomendados</h2>
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden  px-5">
          {barbershops.map((barbershop: { id: Key | null | undefined; }) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-xs uppercase text-gray-400 px-5 pt-3 mt-4 font-bold mb-3">Populares</h2>
        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden  px-5">
          {popularBarbershops.map((barbershop: { id: Key | null | undefined; }) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>



    </div>
  );
};