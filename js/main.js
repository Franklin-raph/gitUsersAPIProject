// const text = document.querySelector("#getText");
// const json = document.querySelector("#getJson");
// const apiData = document.querySelector("#getApiData");
// const outPutText = document.querySelector("#text")

// text.addEventListener("click", showText)
// json.addEventListener("click", showJson)
// apiData.addEventListener("click", showApiData)

// function showText(e) {
//     fetch("genesys.txt")
//     .then(function (res) {
//        return res.text();
//     }).then(function(data) {
//         let output =`${data}`
//             outPutText.innerHTML = output
//     }).catch(function(err){
//         console.log(err)
//     })
//     e.preventDefault();
// }

// function showJson(e) {
//     fetch("customers.json")
//     .then(function (res) {
//        return res.json();
//     })
//     .then(function(data) {
//         console.log(data)
//         let output ="";
//         data.forEach(function(obj){
//             output += `<li>${obj.name}</li>`
//         })
//             outPutText.innerHTML = output
//     }).catch(function(err){
//         console.log(err)
//     })
//     e.preventDefault();
// }

// function showApiData(e) {
//     fetch("https://api.github.com/users")
//     .then((res)=>{
//        return res.json();
//     })
//     .then((data)=>{
//         console.log(data)
//         let output ="";
//         data.forEach((obj)=>{
//             output += `<li>${obj.login}</li>`
//         })
//             outPutText.innerHTML = output
//     }).catch((err)=>{
//         console.log(err)
//     })
//     e.preventDefault();
// }
// const { Octokit } = require("https://cdn.skypack.dev/@octokit/core");
// const octokit = new Octokit({
//     auth: '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'
//   })
// async function gitData (){
//     const resp = await octokit.request('GET /user', {})
//     console.log(resp)
// }
  

const userList = document.querySelector('#users')
const searchInput = document.querySelector('.search')
const singleUser = document.querySelector('.user_card')

const getLinkText = document.querySelector('.getLinkText')
const urlLink = document.querySelector('.urlLink')
const getBtn = document.querySelector('.getUserBtn')

const userArray = []


async function getUsers(){
    try {
        const response = await fetch("https://api.github.com/users");
        const data = await response.json();
        userArray.push(data)

        if(data.length > 0){
            userList.innerHTML = ""
            data.forEach(user => {
                let divElement = document.createElement('div');
                userArray.push(divElement)
                divElement.innerHTML += 
                `
                    <div>
                        <div class="user_card">
                            <img src="${user.avatar_url}" alt="" class="card_img">
                            <div>
                                <h4>${user.login}</h4>
                                <a href="${user.html_url}" class="link"><i class="ri-links-line"></i>Link</a>
                            </div>
                        </div>
                    </div>
                `
                divElement.classList.add('col-lg-4')
                divElement.classList.add('col-md-6')
                divElement.classList.add('col-10')
                divElement.classList.add('my-3')
                userList.appendChild(divElement)

            })
        }
    } catch (error) {
        console.log(error.message)
    }
}


getUsers()

searchInput.addEventListener('keyup', () => {
    userArray.forEach(user => {
        if(user.innerText === undefined) return
        if(user.innerText.toLowerCase().includes(searchInput.value.toLowerCase().trim())){
            user.classList.remove('hider')
        }else{
            user.classList.add('hider')
        }
    })
})

getBtn.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(getLinkText)
    const userName = getLinkText.value.trim()
    const githubLink = `
        <a href="https://www.github.com/${userName}" target="_blank" class="myGithubLink">
            https://www.github.com/${userName}
        </a>
    `
    console.log(githubLink)
    urlLink.innerHTML = githubLink
    getLinkText.value = ""
})

