import * as React from 'react';
import './App.css';

import MyHeader from "./components/Header/MyHeader";
import MainArea from "./components/MainArea/MainArea";


function App() {

    function setTotal(num: string): void {
        localStorage.setItem('total', num);
    }

    async function getGallery(): Promise<void> {
        console.log('get')
        let token = (localStorage.getItem('tokenData'));
        // @ts-ignore
        let resolve = await fetch(getUrl(), {
            method: "GET",
            // @ts-ignore
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        let galleryObject = null;
        let data = await resolve.json();

        if (data) {
            galleryObject = data;
        }
        console.log('galleryObject= ' + JSON.stringify(galleryObject));
        setTotal(galleryObject.input.total);
        if(!galleryObject.input?.objects){
            setImage(['']);
        }else{
            setImage(galleryObject.input.objects);
        }
    
    }



    let [image, setImage] = React.useState<Array<string>>(['']);
    let [filter,serFilter]=React.useState("All")








    function getPage(): string | number {
        // @ts-ignore

        return localStorage.getItem('page') ? localStorage.getItem('page') : 1;
    }

    function getUrl(): string {
        return `https://xo2w7jv6a5.execute-api.us-east-1.amazonaws.com/prod/gallery?page=${getPage()}&limit=5&filter=${filter}`;
    }







    return (
        <div className="App">

            <MyHeader setImage={setImage} getGallery={getGallery} filter={filter} setFilter={serFilter}/>
            <MainArea image={image} getGallery={getGallery}/>

        </div>
    );
}


export default App;


