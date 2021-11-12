import React, {ChangeEvent} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

type PropsType = {
    open: boolean,
    setOpen: (value: boolean) => void,
    setEmail: (value: string) => void,
    setPassword: (value: string) => void,
    email: string,
    password: string
    setImage: (value: Array<string>) => void
    getGallery: () => void
}

const DialogSingIn = (props: PropsType) => {



    /*
Main function for authorization.Run after click
*/
    async function LogIn(): Promise<void> {
        let result: boolean = await control_validation_authorization();
        if (result) {
            DialogSingInClose();
            await props.getGallery();
            setTimeout(reset_gallery, 60000000);
        }
    }

    function removeToken() {
        localStorage.removeItem('tokenData');
    }

    function reset_gallery() {
        removeToken();
        props.setImage([''])
    }

    async function control_validation_authorization(): Promise<boolean> {

        let validationResult: boolean = false;
        let authorizationResult: boolean = false;
        let regexp: RegExp = /^.+@.+\..+$/igm;
        let regexpPass: RegExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
        let userPassword: string | void = props.password;
        let userEmail: string | void = props.email;

        if (userPassword && userEmail) {

            let emailValidation = regexp.test(userEmail);
            let passwordValidation = regexpPass.test(userPassword);

            if (emailValidation && passwordValidation) {

                validationResult = true;
                authorizationResult = await authorization(userEmail, userPassword);
            } else {
                alert('некорректные данные')
            }
        }
        return validationResult && authorizationResult
    }


    async function authorization(userEmail: string, userPassword: string): Promise<boolean> {
        console.log("token")

        let resolve = await sendAuthData(userEmail, userPassword);
        let token = await resolve.json();
        console.log(token)
        if (resolve.status === 200) {

            //let result: string = token;
            save_token(token);

            return true
        } else {
            let result: string = token;
            console.log(("error " + result));

            return false
        }
    }

    async function sendAuthData(userEmail: string, userPassword: string) {
        let userJsonDate: any = JSON.stringify({
            email: userEmail,
            password: userPassword
        })

        let resolve = await fetch('https://xo2w7jv6a5.execute-api.us-east-1.amazonaws.com/prod/auth', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: userJsonDate
        })
//         let test =await resolve.json();
//         let JSONTest = test;
// console.log('token in sendAuthData = ' + JSONTest.token);
        return resolve
    }

    function save_token(token: any): void {
        localStorage.setItem('tokenData', token.token);
        console.log(token.token);

    }


    const handlerLogIn = () => {
        LogIn()
    }

    const DialogSingInClose = () => {
        props.setOpen(false)
    }

    const handlerEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setEmail(e.currentTarget.value)
    }
    const handlerPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.setPassword(e.currentTarget.value)
    }


    return (
        <Dialog open={props.open} onClose={DialogSingInClose} aria-labelledby={'Sing In'}>
            <DialogTitle id={"Sing In"}>Sin In</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="email" label="email" type="email"
                           fullWidth onChange={handlerEmailChange}/>
                <TextField autoFocus margin="dense" id="password" label="password" type="password"
                           fullWidth onChange={handlerPasswordChange}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={DialogSingInClose} color={"primary"}>Cancel</Button>
                <Button onClick={handlerLogIn} color={"primary"}>Log In</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogSingIn;