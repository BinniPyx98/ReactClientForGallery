import React, {useRef} from 'react';
import {
    AppBar,
    Box,
    Button,
    Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
    Toolbar
} from "@material-ui/core";

import DialogSingIn from "./DialogSingIn/DialogSingIn";
import SingUp from "./SingUp/SingUp";
import SearchField from "./SearchField/SearchField";


type PropsType = {
    setImage: (value: Array<string>) => void,
    getGallery: () => void,
    filter: string,
    setFilter:(value:string)=>void
}

const MyHeader = (props: PropsType) => {
    let input = useRef(null)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [show_SingIn_Dialog, setShow_SingIn_Dialog] = React.useState(false)
    const [show_upload_Dialog, setShow_upload_Dialog] = React.useState(false)
    const [show_SingUp_Dialog, setShow_SingUp_Dialog] = React.useState(false)

    function handlerUploadClose() {
        setShow_upload_Dialog(false);
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
        setShow_upload_Dialog(true)
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
console.log(JSON.stringify(file.files[0].name));
const metadata= {
    filename: file.files[0].name,
    contentType: file.files[0].type,
    size: file.files[0].size
}
        if (!file) {
            console.log('not file');
        } else {
            let s3UrlForPutImage = await fetch(`https://xo2w7jv6a5.execute-api.us-east-1.amazonaws.com/prod/getS3Url`, {
            method: 'POST',
            // @ts-ignore
            headers: {
                'Content-Type': 'text/html',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(metadata),
        })
        let JsonS3UrlForPutImage =  await s3UrlForPutImage.json();
        console.log(JsonS3UrlForPutImage);

        let bodyResolve = JsonS3UrlForPutImage.split('?')[0];
console.log(bodyResolve);   

            let resolve = await fetch(`${bodyResolve}`, {
                method: 'PUT',
                // @ts-ignore
                headers: {
                  //  'Content-Type' : `${file.files[0].type}`
                    // 'Access-Control-Allow-Methods': 'POST',
                    // 'Authorization': `Bearer ${token}`
                },
                body: file.files[0]
            })
            if (resolve.status === 200) {
                //window.location.reload()

            }
         }
    }

    function updateURL(page: number): void {
        window.history.pushState(window.location.href, "", `gallery?page=${page}`);
    }
    function handlerOpenSinUpDialog() {
        setShow_SingUp_Dialog(true);
    }
    const handlerSingIn = () => {
        setShow_SingIn_Dialog(true);
    }


    return (
        <AppBar position={"fixed"}>
            <Container fixed>
                <Toolbar>
                    <Box mr={3}>
                        <Button variant={'outlined'} color={"inherit"} onClick={handlerSingIn}>Sing In</Button>

                        { show_SingIn_Dialog && <DialogSingIn open={show_SingIn_Dialog} setOpen={setShow_SingIn_Dialog} setEmail={setEmail} setPassword={setPassword}
                                      email={email} password={password} setImage={props.setImage}
                                      getGallery={props.getGallery}/>}

                    </Box>
                    <Button variant={'contained'} color={"secondary"} onClick={handlerOpenSinUpDialog}>Sing Up</Button>

                    { show_SingUp_Dialog && <SingUp openDialogSingUp={show_SingUp_Dialog} setOpenDialogSingUp={setShow_SingUp_Dialog}/>}
                    <Button variant={'contained'} color={"secondary"} onClick={handlerClickFilterAll}>Filter
                        All</Button>
                    <Button variant={'contained'} color={"secondary"} onClick={handlerClickFilterMy}>Filter
                        My</Button>

                    <Box mr={3}>
                        <Button variant={'contained'} color={"secondary"}
                                onClick={handlerOpenDialogUpload}>Upload</Button>

                        <Dialog open={show_upload_Dialog} onClose={handlerUploadClose} aria-labelledby={'Sing In'}>
                            <DialogTitle id={"Sing In"}>Upload</DialogTitle>
                            <DialogContent>
                                Upload: <input type="file" id="uploadFile" name="uploadFile" ref={input}/>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handlerUploadClose} color={"primary"}>Cancel</Button>
                                <Button onClick={clickOnButtonUpload} color={"primary"}>Upload</Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                <SearchField setImage={props.setImage}/>
                </Toolbar>

            </Container>
        </AppBar>

    );
};

export default MyHeader;