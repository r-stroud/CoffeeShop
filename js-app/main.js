const url = "https://localhost:7025/api/beanvariety/";

let clickable = true;

function setBackground(id) {
    document.getElementById(id).style.border = "1px solid white"
    document.getElementById(id).style.backgroundColor = "rgba(241, 183, 111, 0.784)"
    document.getElementById(id).style.boxShadow = "2px 2px 8px 2px rgb(215, 215, 215)"
}

function removeBackground(id) {
    document.getElementById(id).style.border = "none"
    document.getElementById(id).style.background = "none"
    document.getElementById(id).style.boxShadow = "none"
}

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    showBeans()
});

const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", () => {
    if (clickable) {

        document.getElementById("display").innerHTML = ``;
        removeBackground("beans")
        document.getElementById("newBeanForm").style.display = "block";
    }
})


const submit = document.getElementById("submit");
submit.addEventListener("click", (event) => {
    event.preventDefault()

    let Name = document.getElementById("formName").value
    console.log(Name.value)
    let Region = document.getElementById("formRegion").value
    let Notes = document.getElementById("formNotes").value

    if (Name === "" || Region === "") {
        document.getElementById("formResults").style.display = "block"
        document.getElementById("formResults").innerHTML = "Invalid Entry"
        setTimeout(() => {
            document.getElementById("formResults").style.display = "none"
            document.getElementById("formResults").innerHTML = ""
        }, 2000)
    } else {
        let beanToAdd = {
            Name,
            Region,
            Notes,
        }
        addBean(beanToAdd).then(
            document.getElementById("formResults").innerHTML = `Added ${Name} - ${Region} -${Notes}`)

        document.getElementById("formResults").style.display = "block"
        document.getElementById("formResults").innerHTML = `
        <div class="results-header">Successfully Added</div>
        <div><span>Bean: </span>${Name}</div> 
        <div><span>Region: </span>${Region}</div>
        <div><span>Notes: </span>${Notes}</div>`

        setTimeout(() => {
            document.getElementById("formResults").style.display = "none"
            document.getElementById("formResults").innerHTML = ""
        }, 3000)
        document.getElementById("formName").value = "";
        document.getElementById("formRegion").value = "";
        document.getElementById("formNotes").value = "";
    }

})

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}


function addBean(bean) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bean),
    }).then(resp => resp.json())
}

function deleteBean(id) {

    return fetch(`${url}${id}`, {
        method: "DELETE"
    })

        .then(document.getElementById("preview").innerHTML = `
    <p>Item successfully deleted.</p>`)
        .then(document.getElementById("preview").style.left = "38%")
        .then(
            setTimeout(() => {
                document.getElementById("preview").style.display = "none"
                document.getElementById("preview").style.left = "32%"
                showBeans()
            }, 1000))

}

function deleteForm(id) {
    document.getElementById("preview").style.display = "block";
    document.getElementById("preview").innerHTML = `
    <p>Are you sure you would like to <span>delete</span> this item?</p>
    <div class="confirmation-bttns">
    <div onclick="closeForm()">Back</div>
    <div onclick="deleteBean(${id})" id="deleteBttn">Delete</div>
    </div>`
}

function closeForm() {
    document.getElementById("preview").style.display = "none"
}

function showBeans() {
    let beans = getAllBeanVarieties()
    if (clickable) {
        clickable = false;
        document.getElementById("newBeanForm").style.display = "none";
        document.getElementById("display").innerHTML = `<h2 id="displayHeader">Our Selection of Beans</h2>`
        beans = beans
            .then(beanVarieties => {
                beanVarieties.forEach((element, i) => {
                    let id = element.id
                    let name = element.name
                    let region = element.region
                    let notes = element.notes
                    notes ? null : notes = "None";

                    setBackground("beans")
                    setTimeout(() => {
                        document.getElementById("display").innerHTML += `
                <div class="container">

                <img id="backgrndImg${i}" class="backgrndImg" src="images/coffebean-removebg-preview.png" alt=""/>

                <img id="beanImg${i}" class="beanImg" src="images/coffebean-removebg-preview-2.png" alt=""/>

                <div id="beanvar${i}" class="beanvar">

                <div class="bean-header">
                <section class="id">
                <span>ID:</span> ${id} 
                </section>

                <section class="name">
                <span>${name.toUpperCase()} </span>
                </section>
                </div>  

                <section class="region">
                <span>REGION:</span> ${region} 
                </section>

                <section class="notes">
                <span>NOTES:</span> ${notes}
                </section>
                
                <div class ="bean-bttns">
                <div>Edit</div>
                <div onclick="deleteForm(${id})">Delete</div>
                </div>
                
                </div>

                </div>`
                        document.getElementById(`beanvar${i}`).style.top = "350px"
                        document.getElementById(`beanImg${i}`).style.top = "28px"

                        setTimeout(() => { }, 100)

                        setTimeout(() => {
                            document.getElementById(`beanvar${i}`).style.top = "0px"
                            document.getElementById(`beanImg${i}`).style.top = "280px"
                        }, 200)

                    }, i * 600)

                });

                setTimeout(() => {
                    clickable = true
                }, beanVarieties.length * 600)
            })
    }
}
