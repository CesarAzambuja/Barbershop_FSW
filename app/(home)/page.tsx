
import Header from "../_components/header";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { Key } from "react";
import { Button } from "../_components/ui/button";
import Image from "next/image";



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

      <div className="px-5 pt-5">
        <Search />
      </div>

      <div className="flex gap-3 px-5 pt-5">
        <Button className="gap-2" variant="secondary">
          <Image
            src="/cabelo.svg" width={16} height={16} alt="Cabelo" />
          Cabelo
        </Button>
        <Button className="gap-2" variant="secondary">
          <Image
            src="/barba.svg" width={16} height={16} alt="Barba" />
          Barba
        </Button>
        <Button className="gap-2" variant="secondary">
          <Image
            src="/acabamento.svg" width={16} height={16} alt="Acabamento" />
          Acabamento
        </Button>
      </div>

      <h2 className="text-xs uppercase text-gray-400 px-5 pt-3 mt-4 font-bold">Agendamentos</h2>
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