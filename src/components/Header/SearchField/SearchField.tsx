import React, {ChangeEvent, useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

type PropsType = {
    setImage: (value: Array<string>) => void,
}

const SearchField = (props: PropsType) => {
    const [searchValue,setSearchValue]=useState('');

    const changeHandler = (e:ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }
    const clickHandler = () => {
         getPixelImage();
       // const PathArray:Array<string> = ['https://images.pexels.com/photos/624015/pexels-photo-624015.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940','https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'];
    }
    // @ts-ignore
    async function getPixelImage() {
        let token = (localStorage.getItem('tokenData'));
        let data;
        const options = {
            params: {
               searchQuery: searchValue,
            },
            headers: {
                'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik5ld3Rlc3RAZmxvLnRlYW0iLCJpYXQiOjE2MzU4NDk1MzJ9.-BbAPcBFANqoYOG_lreNZwhUYU21xx8e7GW8xORpg4w`
            },
        };
        try {
            data = await axios.get('http://localhost:3000/local/getImageFromPixel', options);
            const parseData = JSON.parse(data.data.body)
            const pathArray: any = [];
            for(const img of parseData){
                pathArray.push(img.url);
            }
            console.log(pathArray);
            props.setImage(pathArray);
        } catch (e) {
            console.log(e);
        }


     }

    return (

            <Search>
                <IconButton size="large" aria-label="search" color="inherit" onClick={clickHandler}>
                   <SearchIcon />
                </IconButton>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(newValue)=>{changeHandler(newValue)}}
                />
            </Search>

    );
};

export default SearchField;