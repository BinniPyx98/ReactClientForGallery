import React, {useRef} from 'react';
import {
    AppBar,
    Box,
    Button,
    Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    Toolbar
} from "@material-ui/core";
import DialogSingIn from "../DialogSingIn/DialogSingIn";
import SingUp from "./SingUp/SingUp";

type PropsType = {
    setImage: (value: Array<string>) => void,
    getGallery: () => void,
    filter: string,
    setFilter:(value:string)=>void
}

const MyHeader = (props: PropsType) => {
    let input = useRef(null)
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false)
    const [openDialogSingUp, setOpenDialogSingUp] = React.useState(false)

    function handlerUploadClose() {
        setUploadDialogOpen(false);
    }

    function setPage(num: string): void {
        localStorage.setItem('page', num);
    }

    function handlerClickFilterAll() {
        props.setFilter('All');
        props.getGallery();
    }

    function handlerClickFilterMy() {
       props.setFilter("My");
        setPage("1");
        updateURL(1);
        props.getGallery();
    }

    function handlerOpenDialogUpload() {
        setUploadDialogOpen(true)
    }

    function clickOnButtonUpload() {
        if(input.current) {
            // @ts-ignore
            Upload(input.current);
        }
    }

    async function Upload(file: any) {
        let formData = new FormData();
        formData.append('img', file.files[0]);
        let token = (localStorage.getItem('tokenData'));

        if (!file) {
            console.log('not file');
        } else {
            let resolve = await fetch(`http://localhost:5400/gallery`, {
                method: 'POST',
                // @ts-ignore
                headers: {
                    'Access-Control-Allow-Methods': 'POST',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
            if (resolve.status === 200) {
                //window.location.reload()

            }
        }
    }

    function updateURL(page: number): void {
        window.history.pushState(window.location.href, "", `gallery?page=${page}`);
    }

    const handlerSingIn = () => {
        setOpen(true)
    }


    return (
        <AppBar position={"fixed"}>
            <Container fixed>
                <Toolbar>
                    <Box mr={3}>
                        <Button variant={'outlined'} color={"inherit"} onClick={handlerSingIn}>Sing In</Button>

                        <DialogSingIn open={open} setOpen={setOpen} setEmail={setEmail} setPassword={setPassword}
                                      email={email} password={password} setImage={props.setImage}
                                      getGallery={props.getGallery}/>

                    </Box>
                    <SingUp openDialogSingUp={openDialogSingUp} setOpenDialogSingUp={setOpenDialogSingUp}/>
                    <Button variant={'contained'} color={"secondary"} onClick={handlerClickFilterAll}>Filter
                        All</Button>
                    <Button variant={'contained'} color={"secondary"} onClick={handlerClickFilterMy}>Filter
                        My</Button>

                    <Box mr={3}>
                        <Button variant={'contained'} color={"secondary"}
                                onClick={handlerOpenDialogUpload}>Upload</Button>

                        <Dialog open={uploadDialogOpen} onClose={handlerUploadClose} aria-labelledby={'Sing In'}>
                            <DialogTitle id={"Sing In"}>Sin In</DialogTitle>
                            <DialogContent>
                                Upload: <input type="file" id="uploadFile" name="uploadFile" ref={input}/>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handlerUploadClose} color={"primary"}>Cancel</Button>
                                <Button onClick={clickOnButtonUpload} color={"primary"}>Log In</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>

    );
};

export default MyHeader;