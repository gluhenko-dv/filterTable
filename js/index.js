"strict";

const carList = () => {
  const root = document.getElementById("root");

  const addForm = document.querySelector(".add-form"),
    addName = document.querySelector(".add-name"),
    addModel = document.querySelector(".add-model"),
    addYear = document.querySelector(".add-year"),
    addOdometr = document.querySelector(".add-odometr"),
    filterForm = document.querySelector(".filter-form"),
    carTable = document.querySelector(".car-table");

  let carData = localStorage.carData ? JSON.parse(localStorage.carData) : [];
  //сохранение в локал
  const saveLocalStorage = (carData) => {
    const json = JSON.stringify(carData);
    localStorage.carData = json;
  };

  const filterCartable = () => {
    const filterInputs = filterForm.querySelectorAll("input");

    const filterData = {
      name: "",
      model: "",
      year: "",
      odometr: "",
    };

    filterInputs.forEach((input) => {
      input.addEventListener("input", () => {
        let newData = carData;

        if (input.name === "filter-name") filterData.name = input.value;
        if (input.name === "filter-model") filterData.model = input.value;
        if (input.name === "filter-year") filterData.year = input.value;
        if (input.name === "filter-odometr") filterData.odometr = input.value;

        for (let key in filterData) {
          const search = new RegExp(filterData[key].toLocaleLowerCase());
          newData = newData.filter((item) =>
            search.test(item[key].toLocaleLowerCase())
          );
        }
        renderCarTable(newData);
      });
    });
  };

  const sortCarTable = () => {
    const thead = document.querySelectorAll("th");
    thead.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log(item.classList.value);

        const newData = carData.sort((car, car2) => {
          console.log(car[item.classList.value], car2[item.classList.value]);
          if (car[item.classList.value] > car2[item.classList.value]) {
            return 1;
          } else {
            return -1;
          }
        });

        renderCarTable(newData);
      });
    });
  };

  const renderCarTable = (
    carData = localStorage.carData ? JSON.parse(localStorage.carData) : []
  ) => {
    carTable.textContent = "";
    let number = 1;
    carData.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${number}</td>
      <td>${item.name}</td>
      <td>${item.model}</td>
      <td>${item.year}</td>
      <td>${item.odometr}</td>
      `;
      number++;

      carTable.append(tr);
    });
  };

  //добавление машины
  const addCar = () => {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (
        !addName.value ||
        !addModel.value ||
        !addYear.value ||
        !addOdometr.value
      ) {
        alert("Заполни все поля!!!");
        return;
      }

      const newCar = {
        name: addName.value,
        model: addModel.value,
        year: addYear.value,
        odometr: addOdometr.value,
      };
      carData.push(newCar);
      saveLocalStorage(carData);
      addForm.reset();
      renderCarTable(carData);
    });
  };

  addCar();
  renderCarTable();
  filterCartable();
  sortCarTable();
};

carList();
