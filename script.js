"use strict";

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const greeting = document.querySelector(".greeting");
const addButton = document.querySelector(".add-button");

const cityName = function () {
  const coordinates = navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);
    },
    function () {
      alert("Couldn't get your position");
    }
  );

  // const apiKey =
  // fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}`)
};

const greetingMessage = function () {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monthOfYear = now.getMonth();
  const dayOfMonth = now.getDate();
  const year = now.getFullYear();
  let dayPart;

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (now.getHours() < 5) {
    dayPart = "night";
  } else if (now.getHours() < 12) {
    dayPart = "morning";
  } else if (now.getHours() < 18) {
    dayPart = "afternoon";
  } else if (now.getHours() >= 18) {
    dayPart = "evening";
  } else {
    dayPart = "day";
  }

  greeting.innerHTML = `Good ${dayPart}! Today is ${weekdays[dayOfWeek]}, ${months[monthOfYear]} ${dayOfMonth}, ${year}.`;
};

const addTask = function () {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
};

inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

const saveData = function () {
  localStorage.setItem("data", listContainer.innerHTML);
};

const showTask = function () {
  listContainer.innerHTML = localStorage.getItem("data");
};

greetingMessage();
showTask();

console.log(cityName);
