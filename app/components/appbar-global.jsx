"use client"; // Indicates that this component is a client component (for frameworks like Next.js)
import { AppBar, Box, Button, Toolbar } from "@mui/material"; // Import necessary components from Material-UI
import Link from "next/link"; // Import Link for navigation
import Image from "next/image";
import Grid from "@mui/material/Grid2";

export default function AppbarGlobal() {
  const leftNavItems = [
    { label: "Reservations", href: "/reservations" },
    { label: "Menu", href: "/menu" },
    { label: "Payments", href: "/payments" },
  ];

  const rightNavItems = [

    { label: "Orders", href: "/orders" },
    { label: "Inventory", href: "/inventory" },
    { label: "Employees", href: "/employee" },
  ];

  return (
    <AppBar position="sticky" sx={{ mb: 4, backgroundColor: '#3e1b1f' }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Grid container>
          <Grid
            size={{ xs: 12, md: 4 }}
          >
            {/* Left side for buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", flexGrow: 1 }}>
              <Box sx={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}>
                {leftNavItems.map((item) => (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    color="inherit"
                    sx={{ marginRight: 1, textTransform: 'none', }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            </Box>

          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {/* Center icon and title with redirection */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Link href="/"> {/* Wrap the Image component in Link for navigation */}
                <Image
                  src="/maikalogo.png"
                  alt="Our Story Image"
                  height={50}
                  width={50}
                  priority
                />
              </Link>
            </Box>

          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
          >
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

          </Grid>


        </Grid>
      </Toolbar>
    </AppBar>
  );
}