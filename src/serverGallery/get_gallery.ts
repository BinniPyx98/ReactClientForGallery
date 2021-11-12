/*
Загрузка изображения. Ловим клик по кнопке Upload и запускаем функцию Upload
 */


let inputFile = <HTMLInputElement>document.getElementById('uploadFile');
let filter = "All";
//let clickOnButtonUpload: HTMLElement = document.getElementById('uploadButton');
//let clickFilterAll:HTMLElement=document.getElementById('filterAll')
//let clickFilterMy:HTMLElement=document.getElementById('filterMy')

export function handlerClickFilterAll() {
    filter = 'All';
    getGallery();
}

export function handlerClickFilterMy() {
    filter = "My";
    setPage("1");
    updateURL(1);
    getGallery();
}

export function clickOnButtonUpload() {
    Upload(inputFile);
}


async function Upload(file: any) {

   


    let formData = new FormData();
    formData.append('img', file.files[0]);
    let token = (localStorage.getItem('tokenData'));

    if (!file) {
        console.log('not file');
    } else {
        let s3UrlForPutImage = await fetch(`testLhttp://localhost:3000/local/getS3Url`, {
            method: 'GET',
            // @ts-ignore
            headers: {
                'Authorization': token
            },
        })
console.log(s3UrlForPutImage);
        // let resolve = await fetch(`http://localhost:3000/local/upload`, {
        //     method: 'POST',
        //     // @ts-ignore
        //     headers: {
        //         'Authorization': token
        //     },
        //     body: formData
        // })
        // if (resolve.status == 200) {
        //     //window.location.reload()

        // }
    }
}


/*
 Create Gallery
 */
export async function getGallery(): Promise<void> {
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
    setTotal(galleryObject.total);
    createGallery(galleryObject);
}






function createGallery(galleryObject: any): void {
    console.log('create Gallery')
  //  clearGallery();
  //  createImg(galleryObject);
}

// function createImg(galleryObject: any): void {
//     let divGallery: HTMLElement = document.getElementById('gallery');
//
//     for (let url of galleryObject.objects) {
//         let img: HTMLImageElement = document.createElement('img');
//         img.src = url;
//         divGallery.appendChild(img);
//     }
// }


/*
Delete gallery
 */
// function clearGallery(): void {
//     let divGallery: HTMLElement = document.getElementById('gallery');
//
//     while (divGallery.firstChild) {
//         divGallery.removeChild(divGallery.firstChild);
//     }
// }

/*
Get function
 */
function getPage(): string | number {
    // @ts-ignore

    return localStorage.getItem('page') ? localStorage.getItem('page') : 1;
}

function getTotal(): string | number {
    // @ts-ignore

    return localStorage.getItem('total') ? localStorage.getItem('total') : 1;
}

function getUrl(): string {
    return `http://localhost:3000/local/gallery?page=${getPage()}&limit=5&filter=${filter}`;
}


/*
Update function
 */
function updateURL(page: number): void {
    window.history.pushState(window.location.href, '', `gallery?page=${page}`);
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
        let total = Number(getTotal())
        let page: number = Number(getPage());
        //
        console.log("total" + total)
        console.log("page" + page)
        //
        if (page < total) {
            updateURL(page + 1);
            (() => getGallery())();
            setPage(String(page + 1));

            //         // console.log(page)
            //         // setPage(String(total));
            //         // updateURL(page);
            //         // alert("It's last page");
        } else if (page == total) {
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




