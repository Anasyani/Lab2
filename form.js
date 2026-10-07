document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault(); // страница не перезагружается

  const formData = new FormData(this);
  const labels = {
    username: "Имя",
    age: "Возраст",
    faculty: "Факультет",
    agree: "Согласен с правилами",
    study_form: "Форма обучения"
  };

  if (!formData.has("agree")) {
    formData.set("agree", "нет");
  }

  let output = "<h2>Вы ввели:</h2>";
  for (const [name, value] of formData.entries()) {
    output += `<p><b>${labels[name] || name}:</b> ${value}</p>`;
  }

  document.getElementById("result").innerHTML = output;
  alert("Привет, " + this.username.value + "! Данные получены.");
});
