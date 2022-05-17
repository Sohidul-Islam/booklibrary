//search box defined
const searchBox = document.getElementById("searchBox");
//search Button defined
const searchBtn = document.getElementById("searchBtn");

// const bookResult = document.getElementById("book-results")
//default searching
searchBook("Javascript");

//add a event as click on search button to find the books
searchBtn.addEventListener("click", () => {
    const spinnerAdding = document.getElementById("book-archive")
    spinnerAdding.innerHTML = `<div class="d-flex justify-content-center align-items-center ">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
     
    </div>
    
  </div>
  <p class="text-center">Loading...</p>`
    const bookResult = document.getElementById("book-results")
    bookResult.innerHTML = ""
    searchBook(searchBox.value);

})


//define a arrow function to fetch the books through the url
const searchBook = async (book) => {
    const url = `https://openlibrary.org/search.json?q=${book}`
    const res = await fetch(url)
    const data = await res.json()
    displayBook(data)
}

//define a arrow function to display the searching result on UI
const displayBook = (data) => {
    const bookArchive = document.getElementById("book-archive")
    if (data.numFound !== 0) {
        bookArchive.innerHTML = ` <div class="alert alert-success" id="search-result--msg" role="alert">
   <strong>"${searchBox.value}" </strong> ${data.numFound} Results Found and show ${data.docs.length} items
</div>`}
    else {
        bookArchive.innerHTML = ` <div class="alert alert-danger" id="search-result--msg" role="alert">
    ${data.numFound} Results Found please enter valid book name
 </div>`
    }
    const bookResult = document.getElementById("book-results")
    bookResult.innerHTML = ""

    data.docs.forEach(book => {

        let author;
        let isbn;
        let title;
        let cover;

        if (book.cover_i !== undefined)
            cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        else {
            cover = "book-covers-big-2019101610.jpg"
        }

        if (book.author_name !== undefined) {
            if (isGreatherone(book.author_name)) {
                author = multipleDataHandler(book.author_name);
            } else {
                author = book.author_name[0];
            }
        }
        else {
            author = null;
        }

        if (book.isbn !== undefined) {
            if (isGreatherone(book.isbn)) {
                isbn = multipleDataHandler(book.isbn);
            } else {
                isbn = book.isbn[0];
            }
        } else {
            isbn = null;
        }

        if (book.title.length < 30) {
            title = book.title
        } else {
            title = book.title.slice(0, 30) + "..."
        }
        const div = document.createElement('div')
        div.className = "col-lg-3 col-sm-6 col-md-4 col-12 swing-in-top-fwd";
        div.innerHTML += `
                    <div class="card">
                        <img src="${cover}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text"><span class="badge bg-primary me-1 text-light">Author</span>${author}</p>
                            <p class="card-text"><span class="badge bg-primary me-1 text-light">Published</span>${book.first_publish_year}</p>
                            <p class="card-text"><span class="badge bg-primary me-1 text-light">ISBN</span>${isbn}</p>
                        </div>
                    </div>
           `
        bookResult.appendChild(div)

    })

}

//define a arrow funciton to check whether the data is greater than one or not
const isGreatherone = (data) => {
    if (data !== undefined) {
        if (data.length > 1) return true;
        else return false;
    }
    else {
        return false;
    }

}
//define a arrow funciton to hanling muliple data to print on UI
const multipleDataHandler = (data) => {
    let str = ""
    for (const name of data) { str += name + ", " }
    str = str.slice(0, 20)
    str += "..."
    return str;
}
