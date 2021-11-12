import React, {ChangeEvent} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

type PropsType = {
    openDialogSingUp: boolean,
    setOpenDialogSingUp: (value: boolean) => void
}


const SingUp = (props: PropsType) => {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    function handlerSingUp() {
        console.log('registr')
        let validationResult: boolean = false;
        let regexp: RegExp = /^.+@.+\..+$/igm;
        let regexpPass: RegExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
        let userPassword: string | void = password;
        let userEmail: string | void = email;


        if (userPassword && userEmail) {
            if (regexp.test(userEmail) && regexpPass.test(userPassword)) {
                validationResult = true;
                sendNewUser(userEmail, userPassword)
                handlerClose();
            } else {
                alert('некорректные данные')
            }
        }
        if (validationResult) {

        }
    }


    async function sendNewUser(userEmail: string, userPassword: string) {

        let userJsonDate: any = JSON.stringify({
            email: userEmail,
            password: userPassword
        })  

        fetch('https://xo2w7jv6a5.execute-api.us-east-1.amazonaws.com/prod/registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: userJsonDate
        })

    }


    function handlerOpenSinUpDialog() {
        props.setOpenDialogSingUp(true);
    }


    function handlerClose() {
        props.setOpenDialogSingUp(false);
    }


    const handlerEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const handlerPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)

    }


    return (
        <div>

            <Dialog open={props.openDialogSingUp} onClose={handlerClose} aria-labelledby={'Sing In'}>
                <DialogTitle id={"Sing Up"}>Sin Up</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="email" label="email" type="email"
                               fullWidth onChange={handlerEmailChange}/>
                    <TextField autoFocus margin="dense" id="password" label="password" type="password"
                               fullWidth onChange={handlerPasswordChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlerClose} color={"primary"}>Cancel</Button>
                    <Button onClick={handlerSingUp} color={"primary"}>Sing Up</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SingUp;