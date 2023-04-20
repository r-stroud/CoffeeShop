// export const test = () => {
//     const submit = document.getElementById("submit");
//     submit.addEventListener("click", (event) => {
//         event.preventDefault()

//         let Name = document.getElementById("formName").value
//         let Region = document.getElementById("formRegion").value
//         let Notes = document.getElementById("formNotes").value

//         if (Name === "" || Region === "") {
//             document.getElementById("formResults").style.display = "block"
//             document.getElementById("formResults").innerHTML = "Invalid Entry"
//             setTimeout(() => {
//                 document.getElementById("formResults").style.display = "none"
//                 document.getElementById("formResults").innerHTML = ""
//             }, 2000)
//         } else {
//             let beanToAdd = {
//                 Name,
//                 Region,
//                 Notes,
//             }
//             addBean(beanToAdd).then(
//                 document.getElementById("formResults").innerHTML = `Added ${Name} - ${Region} -${Notes}`)

//             document.getElementById("formResults").style.display = "block"
//             document.getElementById("formResults").innerHTML = `
//         <div class="results-header">Successfully Added</div>
//         <div><span>Bean: </span>${Name}</div>
//         <div><span>Region: </span>${Region}</div>
//         <div><span>Notes: </span>${Notes}</div>`

//             setTimeout(() => {
//                 document.getElementById("formResults").style.display = "none"
//                 document.getElementById("formResults").innerHTML = ""
//             }, 3000)
//             document.getElementById("formName").value = "";
//             document.getElementById("formRegion").value = "";
//             document.getElementById("formNotes").value = "";
//         }

//     })

//     function addBean(bean) {
//         return fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(bean),
//         }).then(resp => resp.json())
//     }
// }