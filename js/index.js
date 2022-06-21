const elNum=document.querySelector(".header--sum");
const elCardDiv=document.querySelector(".header__second");
const elCardList=document.querySelector(".header--listcards");
const elBooked=document.querySelector(".header--listbooked");

//LOCALSTORAGE
const localBookmark=JSON.parse(window.localStorage.getItem("bookmarks"));

const bookmarks=localBookmark || [];

elNum.textContent=films.length;

elBooked.addEventListener("click", function(event){
    if(event.target.matches(".deleteBtnBookmark")){
        const deleteBtnBookmark=event.target.dataset.deleteBookmarkId;
        
        const foundBookmarkDeleteIndex=bookmarks.findIndex(
            ((bookmark)=>bookmark.id===deleteBtnBookmark)
            )
            bookmarks.splice(foundBookmarkDeleteIndex, 1);
            elBooked.innerHTML=null;

            //localStorage
            window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            if(bookmarks.length===0){
                window.localStorage.removeItem("bookmarks");
            }
            renderBookmark(bookmarks, elBooked);
    }
})



const renderBookmark=function(arr, htmlElement){
    arr.forEach(bookmark=>{
        const newBookedLi=document.createElement("li");
        const newDeleteBtn=document.createElement("button");

        newDeleteBtn.setAttribute("class", "delete_btn btn btn-danger")
        newBookedLi.classList.add("bookList");

        newBookedLi.textContent=bookmark.title;
        newDeleteBtn.textContent="Delete";

        newDeleteBtn.classList.add("deleteBtnBookmark");
        newDeleteBtn.dataset.deleteBookmarkId=bookmark.id;

        htmlElement.appendChild(newBookedLi);
        newBookedLi.appendChild(newDeleteBtn);

        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    })
}
//LOCAL STORAGE
renderBookmark(localBookmark, elBooked);


elCardList.addEventListener("click", function(event){
    if(event.target.matches(".bookmark_btn")){
        const bookmarkId=event.target.dataset.bookmarkBtnId;
        const foundBookmark=films.find((film)=>film.id===bookmarkId);
        bookmarks.push(foundBookmark);
        
        if(!bookmarks.includes(foundBookmark)){
            bookmarks.push(foundBookmark);
        }
        
        elBooked.innerHTML=null;
        window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        renderBookmark(bookmarks, elBooked);
    }
})



const renderMovies=function(filmsArr, htmlElement){
    filmsArr.forEach((movie)=>{
        //CREATE ELEMENT
        const newLi=document.createElement("li");
        const newImg=document.createElement("img");
        const newDiv=document.createElement("div");
        const newTitle=document.createElement("h5");
        const newButton=document.createElement("a");

        //SET ATTRIBUTE
        newLi.setAttribute("class", "card m-1");
        newLi.style.width="200px";
        newImg.classList.add("card-img-top");
        newImg.setAttribute("src", movie.poster);
        newDiv.classList.add("card-body");
        newTitle.classList.add("card-title");
        newButton.setAttribute("class", "bookmark_btn btn btn-primary mt-2");

        //TEXT CONTENTS
        newTitle.textContent=movie.title;
        newButton.textContent="Bookmark";

        //DATASET
        newButton.dataset.bookmarkBtnId=movie.id;

        //Append
        htmlElement.appendChild(newLi);
        newLi.appendChild(newImg);
        newLi.appendChild(newDiv);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newButton);
    });
};

renderMovies(films, elCardList);


elCardDiv.addEventListener("submit", function(event){
    event.preventDefault();

})