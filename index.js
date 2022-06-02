const URL_AUTHORS = 'https://maqe.github.io/json/authors.json'
const URL_POSTS = 'https://maqe.github.io/json/posts.json'

async function getData() {
    try {
        const authors = await axios.get(URL_AUTHORS);
        const posts = await axios.get(URL_POSTS);
        let allData = []

        posts.data.forEach((post, i) => {
            allData.push(post)

            authors.data.forEach((author) => {
                if (author.id === post.author_id) {
                    allData[i].name = author.name
                    allData[i].avatar_url = author.avatar_url
                }
            })
        })

        console.log(allData)

        createHTML(allData)
    } catch (error) {
        console.log(error);
    }
  }

getData();

Handlebars.registerHelper("convertTime", (created_at) => {
    let date = new Date(created_at);
    let d = moment(created_at).format("dddd, MMMM D, YYYY, HH:mm")
    return d
})

function createHTML(allData) {
    const template = Handlebars.compile(document.querySelector("#template").innerHTML)
    const fillTemplate = template(allData);
    document.querySelector("#output").innerHTML = fillTemplate
}

const tzid = Intl.DateTimeFormat().resolvedOptions().timeZone;
document.querySelector(".timezone").innerHTML = tzid