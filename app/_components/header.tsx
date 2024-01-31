import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <Card>
            <CardContent className="px-5 py-8 justify-between items-center flex flex-row">
                <Image src="/logo.png" alt = "FSW Barber" height={22} width={120}/>
                <Button variant = "outline" size="icon"> 
                    <MenuIcon size={18}/>
                </Button>
            </CardContent>
        </Card>
     );
    };
 
export default Header;