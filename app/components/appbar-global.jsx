"use client"; // Indicates that this component is a client component (for frameworks like Next.js)
import { AppBar, Box, Button, Toolbar } from "@mui/material"; // Import necessary components from Material-UI
import Link from "next/link"; // Import Link for navigation
import Image from "next/image";

export default function AppbarGlobal() {
  const leftNavItems = [
    { label: "Reservations", href: "/about" },
    { label: "Menu", href: "/contact" },
  ];

  const rightNavItems = [

    { label: "Orders", href: "/about" },
    { label: "Stock", href: "/contact" },
  ];

  return (
    <AppBar position="static" sx={{ mb: 4, backgroundColor: '#3e1b1f' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        
        {/* Left side for buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}>
          <Box sx={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}>
            {leftNavItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{ marginRight: 2, textTransform: 'none', }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Center icon and title with redirection */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/"> {/* Wrap the Image component in Link for navigation */}
            <Image
              src="/maikalogo.png"
              alt="Our Story Image"
              height={50}
              width={100}
              priority
            />
          </Link>
        </Box>

        {/* Right side for buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}>
          <Box sx={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}>
            {rightNavItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                color="inherit"
                sx={{ marginLeft: 2, textTransform: 'none', }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}