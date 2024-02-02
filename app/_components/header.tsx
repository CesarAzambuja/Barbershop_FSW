"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import SideMenu from "./side-menu";

const Header = () => {
    const { data, status } = useSession();

    const handleLogoutClick = () => signOut();
    const handleLoginClick = () => signIn("google");
    
    return ( 
        <Card>
            <CardContent className="px-5 py-8 justify-between items-center flex flex-row">
                <Image src="/logo.png" alt = "FSW Barber" height={22} width={120}/>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant = "outline" size="icon"> 
                            <MenuIcon size={18}/>
                        </Button> 
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu/>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
     );
    };
 
export default Header;