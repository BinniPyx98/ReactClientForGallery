import React from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container,
    Toolbar,
    Box,
    Paper,
    Grid,
    Card,
    CardMedia,
    Dialog,
    DialogTitle, DialogContent, TextField, DialogActions
} from "@material-ui/core";
import {getGallery} from "./serverGallery/get_gallery";





function App() {


    const cards = [1, 2, 3, 4, 5]

    const handlerLogIn = () => {
        LogIn()
    }


    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handlerSingIn = () => {
        setOpen(true)
    }

    const handlerClose = () => {
        setOpen(false)
    }

   const handlerEmailChange=(e)=>{
        s
   }



    /*
Main function for authorization.Run after click
 */
    async function LogIn(): Promise<void> {
        let result: boolean = await control_validation_authorization();
        if (result) {
            handlerClose()
            await getGallery();
            setTimeout(reset_gallery, 60000);
        }
    }

    async function control_validation_authorization(): Promise<boolean> {
        let validationResult: boolean = false;
        let authorizationResult: boolean = false;
        let regexp: RegExp = /^.+@.+\..+$/igm;
        let regexpPass: RegExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
        let userPassword: string | void = getElement('pass');
        let userEmail: string | void = getElement('email');

        if (userPassword && userEmail) {
            if (regexp.test(userEmail) && regexpPass.test(userPassword)) {
                validationResult = true;
                authorizationResult = await authorization(userEmail, userPassword);
            } else {
                alert('некорректные данные')
            }
        }
        return validationResult && authorizationResult
    }



    function reset_gallery() {
        removeToken();
        remove_gallery();

    }




    function remove_gallery() {
        // let divGallery = document.getElementById('gallery');
        // while (divGallery.firstChild) {
        //     divGallery.removeChild(divGallery.firstChild);
        // }
    }

    function removeToken() {
        localStorage.removeItem('tokenData');
    }










    return (
        <div className="App">
            <AppBar position={"fixed"}>
                <Container fixed>
                    <Toolbar>
                        <Box mr={3}>
                            <Button variant={'outlined'} color={"inherit"} onClick={handlerSingIn}>Sing In</Button>

                            <Dialog open={open} onClose={handlerClose} aria-labelledby={'Sing In'}>
                                <DialogTitle id={"Sing In"}>Sin In</DialogTitle>
                                <DialogContent>
                                    <TextField autoFocus margin="dense" id="email" label="email" type="email"
                                               fullWidth onChange={handlerEmailChange}/>
                                    <TextField autoFocus margin="dense" id="password" label="password" type="password"
                                               fullWidth onChange={handlerPasswordChange}/>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handlerClose} color={"primary"}>Cancel</Button>
                                    <Button onClick={handlerLogIn} color={"primary"}>Log In</Button>
                                </DialogActions>
                            </Dialog>

                        </Box>
                        <Button variant={'contained'} color={"secondary"}>Sing Up</Button>
                    </Toolbar>
                </Container>
            </AppBar>


            <main>

                <Container maxWidth={"md"} style={{marginTop: "90px"}}>
                    <Grid container spacing={4}>

                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardMedia
                                        image={'https://www.meme-arsenal.com/memes/50569ac974c29121ff9075e45a334942.jpg'}
                                        style={{paddingTop: "56.25%"}}/>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                    <Box style={{marginTop: "15px"}}>
                        <Button variant={'outlined'} color={"inherit"} style={{marginRight: "10px"}}>Next</Button>
                        <Button variant={'outlined'} color={"inherit"}>Back</Button>

                    </Box>
                </Container>
            </main>

        </div>
    );
}



export default App;


