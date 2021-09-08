// Get Element By Id
const searchField = document.getElementById('search-field');
const errorMessage = document.getElementById('error-message');
const inputEmpty = document.getElementById('input-empty');
const bookCard = document.getElementById('book-card');

// search 
const searchResult = async () =>{
    const searchText = searchField.value;
    errorMessage.style.display = "none";
    if (searchText === "") {
        inputEmpty.style.display = "inline-block";
        bookCard.textContent = "";
        document.getElementById('main-area').style.display = "none";
    } else {
        // Display Spinner
        toggleSpinner('block');
        inputEmpty.style.display = "none";
        const bookApi = `https://openlibrary.org/search.json?q=${searchText}`;
        try {
            const Response = await fetch(bookApi);
            const datas = await Response.json();
            displayData(datas);
            
        } catch (error) {
            console.log(error)
        }
    }
    searchField.value = "";
}
// toggle Spinner
const toggleSpinner = (spinnerStyle) =>{
    document.getElementById('spinner-loader').style.display = spinnerStyle;
    if (spinnerStyle === "block") {
        document.getElementById('main-area').style.display = "none";
    } else {
        document.getElementById('main-area').style.display = "block";
    }
    
}
   
const displayData = datas =>{
    bookCard.textContent = "";
    if (datas.docs.length === 0) {
        errorMessage.style.display = "inline-block";
        inputEmpty.style.display = "none";
    } 
    const displayTotalNumber = document.getElementById('display-total');
    displayTotalNumber.innerText = `Show Totals: ${datas.docs.length}`;

    const foundTotalNumber = document.getElementById('found-total');
    foundTotalNumber.innerText = `Found total: ${datas.numFound}`;

    datas.docs?.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
            <div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
                <div class="col-md-4">
                ${data.cover_i ? 
                `<img
                    src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg"
                    class="img-fluid rounded-start"
                    alt="..."
                />` : 
                `<img
                    src="/imges/no_img.png"
                    class="img-fluid rounded-start"
                    alt="..."
                />`
                }
                
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${data.title ? data.title : 'Not Found'}</h5>
                    <p>Author: ${data.author_name ? data.author_name : 'Not Found'}</p>
                    <p class="card-text">
                    </p>
                    <p class="card-text">
                    Publisher: ${data.publisher ? data.publisher : 'Not Found'}
                    <br>
                    <small class="text-muted">First publish year: ${data.first_publish_year ? data.first_publish_year : 'Not Found'}</small>
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;
        bookCard.appendChild(div);
    });
    // Hidden Spinner
    toggleSpinner('none');
}