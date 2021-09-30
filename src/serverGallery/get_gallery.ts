/*
Загрузка изображения. Ловим клик по кнопке Upload и запускаем функцию Upload
 */
let inputFile = <HTMLInputElement>document.getElementById('uploadFile');
let clickOnButtonUpload: HTMLElement = document.getElementById('uploadButton');
let clickFilterAll:HTMLElement=document.getElementById('filterAll')
let clickFilterMy:HTMLElement=document.getElementById('filterMy')

if (clickFilterAll) {
    clickFilterAll.addEventListener('click', ev => {
        //  ev.preventDefault();
        filter='All'
        getGallery()
    })
}


if (clickFilterMy) {
    clickFilterMy.addEventListener('click', ev => {
        //  ev.preventDefault();
        console.log('click')

        filter="My"
        setPage("1");
        updateURL(1);
        getGallery()
    })
}

let filter="All";

if (clickOnButtonUpload) {
    clickOnButtonUpload.addEventListener('click', ev => {
        ev.preventDefault();
        (async () => {
            await Upload(inputFile);
        })()
    })
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
            headers: {
                'Access-Control-Allow-Methods': 'POST',
                'Authorization': token
            },
            body: formData
        })
        if (resolve.status == 200) {
            //window.location.reload()

        }
    }
}


/*
 Create Gallery
 */
export async function getGallery(): Promise<void> {
    let token = (localStorage.getItem('tokenData'));
    let resolve = await fetch(getUrl(), {
        method: "GET",
        headers: {
            'Authorization': token
        }
    })

    let galleryObject = null;
    let data = await resolve.json();

    if (data) {
        galleryObject = data;
    }
    setTotal(galleryObject.total);
    createGallery(galleryObject);
}


function createGallery(galleryObject: any): void {
    clearGallery();
    createImg(galleryObject);
}

function createImg(galleryObject: any): void {
    let divGallery: HTMLElement = document.getElementById('gallery');

    for (let url of galleryObject.objects) {
        let img: HTMLImageElement = document.createElement('img');
        img.src = url;
        divGallery.appendChild(img);
    }
}


/*
Delete gallery
 */
function clearGallery(): void {
    let divGallery: HTMLElement = document.getElementById('gallery');

    while (divGallery.firstChild) {
        divGallery.removeChild(divGallery.firstChild);
    }
}

/*
Get function
 */
function getPage(): string | number {
    return localStorage.getItem('page') ? localStorage.getItem('page') : 1;
}

function getTotal(): string | number {
    return localStorage.getItem('total') ? localStorage.getItem('total') : 1;
}

function getUrl(): string {
    return `http://localhost:5400/gallery?page=${getPage()}&limit=5&filter=${filter}`;
}


/*
Update function
 */
function updateURL(page: number): void {
    window.history.pushState(window.location.href, null, `gallery?page=${page}`);
}


/*
Set function
 */
function setPage(num: string): void {
    localStorage.setItem('page', num);
}
function setTotal(num: string): void {
    localStorage.setItem('total', num);
}


/*
Catch click button "Next"
 */
let clickButtonNext = document.getElementById('next');

if (clickButtonNext) {
    clickButtonNext.addEventListener('click', ev => {
        //     ev.preventDefault();
        let total=Number(getTotal())
        let page: number = Number(getPage());
        //
        console.log("total"+total)
        console.log("page"+page)
        //
        if (page < total) {
            updateURL(page + 1);
            (() => getGallery())();
            setPage(String(page + 1));

            //         // console.log(page)
            //         // setPage(String(total));
            //         // updateURL(page);
            //         // alert("It's last page");
        }
        else if(page==total) {
            //         // console.log(page)
            //         // updateURL(page + 1);
            //         // setPage(String(page + 1));
            (() => getGallery())();
            //
        }
    })

}

/*
Catch click button "Back"
 */
let clickButtonBack = document.getElementById('back');

if (clickButtonBack) {
    clickButtonBack.addEventListener('click', ev => {
        ev.preventDefault();
        let page: number = Number(getPage());

        if (page === 1) {
            updateURL(page);
            setPage(String(1));
            alert("It's first page");
        } else {
            updateURL(page - 1);
            setPage(String(page - 1));
            (() => getGallery())();
        }
    })
}




