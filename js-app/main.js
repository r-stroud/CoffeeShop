const url = "https://localhost:7025/api/beanvariety/";

let clickable = true;
let timer;

function test() {
    document.getElementById("run-button").style.color = "blue"
}

function test2() {

    document.getElementById("display").innerHTML = `<div class ="bean-bttns">
                <div>Edit</div>
                <div>Delete</div>
                </div>`
}


const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    let beans = getAllBeanVarieties()
    if (clickable) {
        clickable = false;
        document.getElementById("newBeanForm").style.display = "none";
        document.getElementById("display").innerHTML = ""
        beans = beans
            .then(beanVarieties => {
                beanVarieties.forEach((element, i) => {
                    let id = element.id
                    let name = element.name
                    let region = element.region
                    let notes = element.notes
                    notes ? null : notes = "None";

                    console.log(id)
                    timer = setTimeout(() => {

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
                <div>Delete</div>
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

                setTimeout(() => { clickable = true; }, beanVarieties.length * 600)

            })
    }
    // else {
    //     console.log(timer)
    //     beans.then(beanVarieties => {
    //         beanVarieties.forEach(clearTimeout(timer))
    //     }
    //     );
    //     document.getElementById("display").innerHTML = ""
    // }
});

const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", () => {
    if (clickable) {

        document.getElementById("display").innerHTML = ``;
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
        document.getElementById("formResults").innerHTML = `Added ${Name} - ${Region} -${Notes}`

        setTimeout(() => {
            document.getElementById("formResults").style.display = "none"
            document.getElementById("formResults").innerHTML = ""
        }, 2000)
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
    return fetch(`${url}/${id}`, {
        method: "DELETE"
    }).then(resp => resp.json())
}

// const deleteBean = async (id) => {
//     const fetchData = await fetch(`${url}/${id}`, {
//         method: "DELETE"
//     })
// }
