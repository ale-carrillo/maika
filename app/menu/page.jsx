"use client";
import * as React from 'react';
import { Container, Typography, Box, useTheme, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Image from "next/image";

//Here, we define the names of the buttons that we will use to switch between the diferent meals
export default function Menu(){
    const theme = useTheme();
    const nombresBotones = [
      'STARTER',
      'SOUP',
      'SALADS',
      'SPECIALTY',
      'STEAKS',
      'DESSERTS',
      'DRINKS',
      'COCTAILS'
    ];
      
    return(
        <Container maxWidth="xl"
        sx={{ backgroundColor: (theme) => theme.palette.background.default }}
        >
          {/*In this grid we use a background image with rounded borders the make a better presentation*/}
              <Grid
                sx={{
                  backgroundImage: "url('/Imageback.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // Here we cover al the grid with the image
                  borderRadius: "5px",
                  width: "100%",
                  height: "450px", // Here we adjust the heigt 
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center", 
                }}
              >
                {/*Here we have the title of the page.*/}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  <Typography variant="h3" color="white" sx={{ fontWeight: "bold" }}>
                    MAIKA RESTAURANT
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="h4" color="white" sx={{ fontWeight: "bold" }}>
                    MENU
                  </Typography>
                </Box>
              </Grid>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt:8,mb:4 }}>
              <RestaurantIcon sx={{ display: { xs: 'flex' }, mr: 1, fontSize: '6rem', color: theme.palette.secondary.main }} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mb:6 }}>
                  <Typography variant="h5" color="black" sx={{ fontWeight: "bold" }}>
                  MAIKA Menú 2024
                  </Typography>
              </Box>
              
              <Grid xs={6} sx={{ border: "solid white 5px",display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              </Grid>
            {/*Here we create our buttons to switch between different menus using map and the first dictionary that we can see in the code.*/}
              <Grid container spacing={2} justifyContent="center" sx={{ p: 2}}>
                {nombresBotones.map((nombre, index) => (
                  <Grid xs={3} key={index}>
                    <Button variant="contained" fullWidth>
                      {nombre}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              
              <Grid xs={6} sx={{ border: "solid white 5px",display: 'flex', justifyContent: 'center', alignItems: 'center', mb:3 }}>
              </Grid>
              
            {/*Here we have the container with the menu items, where we have divided it into columns to provide a better view.*/}
            <Grid container spacing={10} sx={{ justifyContent: 'center'}}>
              {/*Here we have the first container, where we have some hardcoded food.*/}
              <Grid size={{ xs: 5}} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Grid xs={6} sx={{justifyContent: 'center', alignItems: 'center' }}>


                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Spaghetti - $10
                                  </Typography>
                                  <Image 
                                    src="/spagetti.jpg" //here we use our food image 
                                    alt="Spaghetti"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                  Pasta served with a choice of rich sauces, such as marinara or Alfredo. 
                                  </Typography>
                                </Box>


                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Lasagna - $10
                                  </Typography>
                                  <Image 
                                    src="/lasagna.png" //here we use our image 
                                    alt="Lasagna"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                  Layers of pasta, rich meat sauce, béchamel, and melted cheese baked to perfection, offering a hearty and comforting dish.
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Risotto - $10
                                  </Typography>
                                  <Image 
                                    src="/risotto.jpg" //here we use our image 
                                    alt="Risotto"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                    Creamy Arborio rice cooked slowly with broth, finished with Parmesan cheese and seasonal vegetables or seafood for a luxurious texture.
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Fettuccine Alfredo - $10
                                  </Typography>
                                  <Image 
                                    src="/fetuccini.jpg" //here we use our image 
                                    alt="Fettuccine Alfredo"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                    Flat pasta tossed in a velvety sauce made from butter, cream, and Parmesan cheese, creating a rich and indulgent experience.
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Penne Arrabbiata - $10
                                  </Typography>
                                  <Image 
                                    src="/Penne.jpg" //here we use our image 
                                    alt="Penne Arrabbiata"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                    Penne pasta served in a spicy tomato sauce with garlic and red chili flakes, garnished with fresh parsley for a bold flavor.
                                  </Typography>
                                </Box>




                    </Grid>
              </Grid>

              <Grid xs={1} sx={{border: "solid white 5px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              </Grid>
              {/*Here we have the second container, where we have some hardcoded food.*/}
              <Grid size={{ xs: 5}} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid xs={6} sx={{justifyContent: 'center', alignItems: 'center' }}>


                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Caprese Salad - $10
                                  </Typography>
                                  <Image 
                                    src="/caprese.jpg" //here we use our image 
                                    alt="Caprese Salad"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                  Fresh mozzarella, ripe tomatoes, and basil drizzled with balsamic glaze and olive oil, highlighting the simplicity of Italian flavors.
                                  </Typography>
                                </Box>


                              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Osso Buco - $10
                                  </Typography>
                                  <Image 
                                    src="/osso.jpg" //here we use our image 
                                    alt="Osso Buco"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '45%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                    Tender braised veal shanks served with gremolata and a side of risotto or polenta, providing a rich, flavorful main course.
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Tiramisu - $10
                                  </Typography>
                                  <Image 
                                    src="/tiramisu.jpg" //here we use our image 
                                    alt="Tiramisu"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                    Layers of coffee-soaked ladyfingers and mascarpone cheese dusted with cocoa powder, creating a decadent and creamy dessert.
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Bruschetta - $10
                                  </Typography>
                                  <Image 
                                    src="/bruschetta.jpg" //here we use our image 
                                    alt="Bruschetta"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                    Toasted bread topped with a mixture of diced tomatoes, garlic, basil, and olive oil, offering a refreshing starter with vibrant flavors.
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                  <Typography
                                  variant="h5"
                                  color="black"
                                  sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                                  Arancini - $10
                                  </Typography>
                                  <Image 
                                    src="/arancini.jpg" //here we use our image 
                                    alt="Arancini"
                                    width={300} height={300}
                                    style={{ marginTop: '16px', maxWidth: '50%', height: 'auto', borderRadius: "15px" }} 
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mt:3, mb:5 }}>
                                  <Typography
                                      variant="h6"
                                      color="black"
                                  >
                                    Crispy rice balls filled with cheese and meat or vegetables, served with marinara sauce for dipping, perfect as a savory appetizer.
                                  </Typography>
                                </Box>



                          </Grid>
              </Grid>
            </Grid>
            
        </Container>
    );
};