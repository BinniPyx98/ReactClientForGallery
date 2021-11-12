import React from 'react';
import {Box, Button, Card, CardMedia, Container, Grid} from "@material-ui/core";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MainCss from './MainArea.module.css'
import IconButton from '@mui/material/IconButton';

type PropsType = {
    image: Array<string>,
    getGallery: () => void
}

const MainArea = (props: PropsType) => {

    const likesPhotos: Array<string> = [];

    function setPage(num: string): void {
        localStorage.setItem('page', num);
    }

    function updateURL(page: number): void {
        window.history.pushState(window.location.href, '', `gallery?page=${page}`);
    }

    function getTotal(): string | number {
        // @ts-ignore

        return localStorage.getItem('total') ? localStorage.getItem('total') : 1;
    }

    function getPage(): string | number {
        // @ts-ignore

        return localStorage.getItem('page') ? localStorage.getItem('page') : 1;
    }

    /*
   Catch click button "Next"
    */
    function onClickNext() {

        let total = Number(getTotal())
        let page: number = Number(getPage());

        console.log("total" + total)
        console.log("page" + page)

        if (page < total) {
            updateURL(page + 1);
            props.getGallery();
            setPage(String(page + 1));

            //         // console.log(page)
            //         // setPage(String(total));
            //         // updateURL(page);
        } else if (page == total) {
            //         // console.log(page)
            //         // updateURL(page + 1);
            //         // setPage(String(page + 1));
            alert("It's last page");

            props.getGallery();
            //
        }

    }


    /*
    Catch click button "Back"
     */
    function onClickBack() {

        let page: number = Number(getPage());

        if (page === 1) {
            updateURL(page);
            setPage(String(1));
            alert("It's first page");
        } else {
            updateURL(page - 1);
            setPage(String(page - 1));
            props.getGallery()
        }

    }

    function mouseLeaveHandler () {
        console.log('leave');
    }
    function mouseEnterHandler () {
        console.log('mouse enter');
    }


    let images = props.image.map(item => {

        return (
            <Grid item xs={12} sm={6} md={4}>
                <Card className={MainCss.position}>
                    <CardMedia
                        onMouseLeave={mouseLeaveHandler}
                        onMouseEnter={mouseEnterHandler}
                        image={`${item}`}
                        style={{paddingTop: "56.25%"}} />
                        <div className={MainCss.favoriteLike}> <IconButton size="large" aria-label="search" color="inherit"><FavoriteBorderIcon/></IconButton></div>
                </Card>
            </Grid>
        )
    })

    return (
        <main>

            <Container maxWidth={"md"} style={{marginTop: "90px"}}>
                <Grid container spacing={4}>

                    {images}

                </Grid>
                <Box style={{marginTop: "15px"}}>

                    <Button variant={'outlined'} color={"inherit"} onClick={onClickBack}>Back</Button>
                    <Button variant={'outlined'} color={"inherit"} style={{marginRight: "10px"}}
                            onClick={onClickNext}>Next</Button>
                </Box>
            </Container>
        </main>
    );
};

export default MainArea;