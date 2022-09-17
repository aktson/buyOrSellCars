import { useState, useEffect } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton, Avatar } from "@material-tailwind/react";
import img1 from "../../images/20220808_213916.jpg"
import NavList from "./NavList";
import { MdMenuOpen, MdOutlineClose } from "react-icons/md";

export default function Nav() {
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    return (

        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 md:my-2">
            <div className="container  mx-auto flex items-center justify-between ">
                <Typography
                    as="a"
                    href="#"
                    variant="large"
                    className="mr-4 cursor-pointer py-1.5  text-secondary-dark"
                >
                    <span>Buy/sell</span>
                </Typography>
                <div className="hidden lg:block"><NavList /></div>
                <Avatar src={img1} alt="avatar" variant="circular" className="hidden lg:block" />

                <MdMenuOpen variant="text" onClick={() => setOpenNav(!openNav)} className="ml-auto h-6 w-6 text-dark  focus:bg-transparent active:bg-transparent lg:hidden " >
                    {openNav ? (
                        < MdMenuOpen />
                    ) : (
                        < MdOutlineClose />
                    )}
                </MdMenuOpen>

            </div>
            <MobileNav open={openNav}>
                <NavList />
                <Avatar src={img1} alt="avatar" variant="circular" />

            </MobileNav>
        </Navbar>

    );
}