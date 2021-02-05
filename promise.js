// Qu'est ce qu'une promesse : c'est un forme de monade. Elle contient le .then.
// const p = new Promise();
// p.then()

// const timeout = (msg,time) =>
//   new Promise((resolve) =>
//     setTimeout(() => {
//       console.log(msg);
//       resolve();
//     }, time));
// timeout("coucou",2000)
//   .then(() => timeout("ça va?",1000))
//   .then(() =>timeout("oui et toi?",3000))
//   .then(() =>timeout("très bien merci!",4000));

// const getGithubUser = (user) =>{
// return fetch(`https://api.github.com/users/${user}`)
//         .then(response => response.json())
//         .then(data =>console.log(data))
// }
const getRandombUser = () => {
  return fetch(`https://randomuser.me/api/`).then((response) =>
    response.json()
  );
};
const options = {
  headers: { "X-API-KEY": "c235777ec3fa1a5937ee023f4c529ab0" },
};

//getGithubUser("emontaigne").then(()=>getGithubUser("mhansart"));
const getOriginUser = (firstname, lastname) => {
  return fetch(
    `https://v2.namsor.com/NamSorAPIv2/api2/json/origin/${firstname}/${lastname}`,
    options
  ).then((response) => response.json());
};
const getGenderUser = (firstname, lastname) => {
  return fetch(
    `https://v2.namsor.com/NamSorAPIv2/api2/json/gender/${firstname}/${lastname}`,
    options
  ).then((response) => response.json());
};
const btn = document.getElementById("btn");
const nom = document.getElementById("name");
const img = document.getElementById("picture-user");
const origin = document.getElementById("origin");
const genre = document.getElementById("genre");
btn.addEventListener("click", () => {
  getRandombUser().then((data) => {
    const firstname = data.results[0].name.first;
    const lastname = data.results[0].name.last;
    const picture = data.results[0].picture.large;

    getOriginUser(firstname, lastname).then((data) => {
      const origine = data.regionOrigin;
      getGenderUser(firstname, lastname).then((data) => {
        const gender = data.likelyGender;
        genre.innerHTML = gender;
        origin.innerHTML = origine;
        nom.innerHTML = firstname + " " + lastname;
        img.setAttribute("src", picture);
      });
    });
  });
});
