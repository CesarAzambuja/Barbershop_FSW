"use client"

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import Image from "next/image";
const SideMenu = () => {
    const { data } = useSession();

    const handleLogoutClick = () => signOut();
    const handleLoginWithiGoogleClick = () => signIn("google");
    return (

        <>
            <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            {data?.user ? (
                <div className="flex justify-between px-5 py-6 items-center">
                    <div className="flex items-center gap-3 ">
                        <Avatar>
                            <AvatarImage src={data.user?.image ?? ""} />
                        </Avatar>

                        <div>
                            <p className="font-bold text-sm">{data.user.name}</p>
                            <p className="font-bold text-xs">{data.user.email}</p>
                        </div>

                    </div>

                </div>
            ) : (
                <div className="flex flex-col px-5 py-6 gap-3">
                    <div className="flex items-center gap-2 ">
                        <UserIcon size={32} />
                        <h2 className="font-bold">Olá, faça seu login!</h2>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <Button className="w-full" >
                                <LogInIcon className="mr-2" size={18} />
                                Fazer Login</Button>
                        </DialogTrigger>
                        <DialogContent className="w-[90%]">
                            <DialogHeader>
                                <DialogTitle>Faça seu login</DialogTitle>
                                <DialogDescription>
                                    Conecte-se usando sua conta Google
                                </DialogDescription>
                            </DialogHeader>
                            <Button variant="outline" className="gap-2 font-bold" onClick={handleLoginWithiGoogleClick}>
                                <Image alt="Login com Google" src="/google.svg" width={18} height={18} />
                                Google
                            </Button>
                        </DialogContent>
                    </Dialog>
                </div>
            )}

            <div className="flex flex-col gap-3 px-5">

                {data?.user && (
                    <><Button className="justify-start" asChild>
                        <Link href="/">
                            <HomeIcon size={18} className="mr-2" />
                            Início
                        </Link>
                    </Button>
                        <Button variant="outline" className="justify-start" asChild>
                            <Link href="/bookings">
                                <CalendarIcon size={18} className="mr-2" />
                                Meus Agendamentos
                            </Link>
                        </Button>
                        <Button variant="outline" className="justify-start" onClick={handleLogoutClick}>
                            <LogOutIcon />
                            Sair da conta
                        </Button></>
                )}
            </div>

        </>
    );
}

export default SideMenu;