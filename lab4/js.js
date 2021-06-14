Btn.onclick = async () => {
  let usersRow = document.getElementById("users-row");
  usersRow.innerHTML = '<div id="preloader" class="visible"></div>';
  let preloader = document.getElementById("preloader");

  let url =
    "https://randomuser.me/api/1.3/?results=10&inc=gender,name,location,email,dob,phone,picture";
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();

    parseJson(json);
    preloader.classList.toggle("visible");
    preloader.classList.toggle("not-visible");
  } else {
    alert("Error " + response.status);
  }
};

function parseJson(json) {
  let usersRow = document.getElementById("users-row");

  for (let i = 0; i < 10; i++) {
    let title = json.results[i].name.title;
    let firstName = json.results[i].name.first;
    let lastName = json.results[i].name.last;
    let gender = json.results[i].gender;
    let address =
      json.results[i].location.country +
      " " +
      json.results[i].location.city +
      " " +
      json.results[i].location.street.name +
      " " +
      json.results[i].location.street.number;
    let email = json.results[i].email;
    let dateOfBirth = json.results[i].dob.date;
    let age = json.results[i].age;
    let phone = json.results[i].phone;
    let picture = json.results[i].picture.large;

    usersRow.appendChild(
      createCard(
        title,
        firstName,
        lastName,
        gender,
        address,
        email,
        dateOfBirth,
        age,
        phone,
        picture
      )
    );
  }
}

function createCard(
  title,
  firstName,
  lastName,
  gender,
  address,
  email,
  dateOfBirth,
  age,
  phone,
  picture
) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("style", "width: auto;");

  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.setAttribute("src", picture);
  img.setAttribute("alt", "Аватар");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let cardName = document.createElement("h5");
  cardName.classList.add("card-title");
  cardName.textContent = title + " " + firstName + " " + lastName;

  let cardGender = document.createElement("p");
  cardGender.classList.add("card-text");
  cardGender.textContent = gender;

  let cardAddress = document.createElement("p");
  cardAddress.classList.add("card-text");
  cardAddress.textContent = address;

  let cardEmail = document.createElement("p");
  cardEmail.classList.add("card-text");
  cardEmail.textContent = email;

  let cardDateOfBirth = document.createElement("p");
  cardDateOfBirth.classList.add("card-text");
  cardDateOfBirth.textContent = dateOfBirth;

  let cardAge = document.createElement("p");
  cardAge.classList.add("card-text");
  cardAge.textContent = age;

  let cardPhone = document.createElement("p");
  cardPhone.classList.add("card-text");
  cardPhone.textContent = phone;

  cardBody.appendChild(cardName);
  cardBody.appendChild(cardGender);
  cardBody.appendChild(cardAddress);
  cardBody.appendChild(cardEmail);
  cardBody.appendChild(cardDateOfBirth);
  cardBody.appendChild(cardAge);
  cardBody.appendChild(cardPhone);
  card.appendChild(img);
  card.appendChild(cardBody);

  return card;
}
