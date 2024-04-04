

let aElement = document.querySelectorAll("ul a");
aElement.forEach(element => {
  element.addEventListener("click", function() {
    aElement.forEach(a => {
      a.classList.remove("active");
      this.classList.add("active");
    });
  })
})

if (window.matchMedia("(max-width: 767px)").matches) {
    const bars = document.getElementById("bars");
    
    bars.onclick = function() {
      bars.nextElementSibling.style.transform = "translateX(100%)"; 
    }
    
    const sidebarClose = document.getElementById("links-close");
    
    sidebarClose.onclick = function() {
      sidebarClose.parentElement.parentElement.style.transform = "translateX(-100%)";
    }
}


var allStudents = [];

for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if(key !== "allUniversities" && key !== "merkezlerInformation" && key !== "citiesInformation") {
      var value = JSON.parse(localStorage.getItem(key));
      if(value.length !== 0) {
          allStudents.push({ key: key, value: value });
      }
  }
}
console.log(allStudents);


const citiesInformation = JSON.parse(localStorage.getItem('citiesInformation'));
console.log(citiesInformation);

let merkezlerInformation = JSON.parse(window.localStorage.getItem("merkezlerInformation")) || [{key: "vakiflar", value: []}, {key: "temsilcilikler", value: []}, {key: "kulupler", value: []}];


(async function() {
    let vakiflar = document.getElementById("vakiflar");
    let info = vakiflar.querySelector(".info");

    citiesInformation.forEach(city => {
        if(merkezlerInformation[0].value.includes(city.cityId)) {
            let basildi = false;
            allStudents.forEach(cityyy => {
                if(cityyy.key === city.cityId) {
                    basildi = true;
                    let il = document.createElement("div");
                    il.classList = `il ${city.cityId}`;
                    il.innerHTML = `
                    <div class="head">
                        <h2>${city.cityName}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="showButton"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
                    </div>
                    <div class="tableDiv">
                        <table>
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Ad Soyad</td>
                                    <td>Üniversite</td>
                                    <td>Bölüm</td>
                                    <td>Tel. No</td>
                                    <td>Memleket</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    `;
                    info.appendChild(il);
                    tbody = il.querySelector("table tbody");
                    cityyy.value.forEach((student, index) => {
                        let row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${student.name}</td>
                            <td>${student.university}</td>
                            <td>${student.major}</td>
                            <td>${student.phone}</td>
                            <td>${student.homeland}</td>
                        `;
                        tbody.appendChild(row);
                    })

                    let head = il.querySelector(".head");

                    head.onclick = function() {
                        if(window.getComputedStyle(this.parentElement.lastElementChild).getPropertyValue('height') === "0px") {
                            this.parentElement.lastElementChild.style.height = "auto";
                            this.lastElementChild.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                        } else {
                            this.parentElement.lastElementChild.style.height = "0";
                            this.lastElementChild.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                        }
                    }
                }
            })
            if(!basildi) {
                let il = document.createElement("div");
                il.classList = `il ${city.cityId}`;
                il.innerHTML = `
                <div class="head">
                    <h2>${city.cityName}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="showButton"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
                </div>
                <div class="tableDiv">
                    <table>
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Ad Soyad</td>
                                <td>Üniversite</td>
                                <td>Bölüm</td>
                                <td>Tel. No</td>
                                <td>Memleket</td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                `;
                info.appendChild(il);

            
                let head = il.querySelector(".head");

                head.onclick = function() {
                    if(window.getComputedStyle(this.parentElement.lastElementChild).getPropertyValue('height') === "0px") {
                        this.parentElement.lastElementChild.style.height = "auto";
                        this.lastElementChild.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                    } else {
                        this.parentElement.lastElementChild.style.height = "0";
                        this.lastElementChild.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                    }
                }
            }
        }
    });

    let setBtn = vakiflar.querySelector(".setBtn");
    
    setBtn.addEventListener("click", function() {
        let promptBackground = document.createElement("div");
        promptBackground.classList.add("promptBackground");
        document.body.prepend(promptBackground);
      
        let myPromptMainDiv = document.createElement("div");
        myPromptMainDiv.classList.add("myPromptMainDiv");
      
        let promptSpan = document.createElement("span");
        promptSpan.classList.add("promptSpan");
        promptSpan.innerHTML = "Şubenin Bulunduğu Şehirleri Seçiniz";
        myPromptMainDiv.appendChild(promptSpan);
      
        let cityForm = document.createElement("form");
        cityForm.classList.add("cityForm");
        myPromptMainDiv.appendChild(cityForm);

        let rows = document.createElement("div");
        rows.className = "rows";

        let selectedCities = [];

        citiesInformation.forEach((city) => {
            let row = document.createElement("div");
            row.className = "row";
        
            let rowLabel = document.createElement("label");
            rowLabel.setAttribute("for", `${city.cityId}`);
            rowLabel.innerHTML = `${city.cityName}`;
        
            let rowInput = document.createElement("input");
            rowInput.id = `${city.cityId}`;
            rowInput.type = "checkbox";
        
            if (merkezlerInformation[0].value.includes(city.cityId)) {
                rowInput.checked = true; 
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                selectedCities.push(row); 
                console.log(row)
            } else {
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                rows.appendChild(row);
            }
        });
        
        
        // عرض المدن المختارة أولاً
        selectedCities.forEach((selectedCity) => {
            rows.prepend(selectedCity);
        });
        
        cityForm.appendChild(rows);


        let buttons = document.createElement("div");
        buttons.classList.add("buttons");


        let citySubmit = document.createElement("input");
        citySubmit.classList.add("studentSubmit");
        citySubmit.type = "submit";
        citySubmit.value = "Kaydet";
        
        citySubmit.addEventListener("mouseover" , () => {
          citySubmit.style.backgroundColor = "green";
        })
        citySubmit.addEventListener("mouseout", () => {
          citySubmit.style.backgroundColor = "#1ea500";
        })
      
        cityForm.onsubmit = function(event) {
            event.preventDefault(); 
        

            let finallySelectedCities = [];
            citiesInformation.forEach((city) => {
                let cityCheckbox = document.getElementById(city.cityId);
                if (cityCheckbox.checked) {
                    finallySelectedCities.push(city.cityId);
                }
            });
        
            // قم بمعالجة الاختيارات المحددة هنا، مثلاً إرسالها إلى الخادم أو عرضها للمستخدم
            console.log("المدن التي اختارها المستخدم:", finallySelectedCities);
        
            merkezlerInformation.forEach(merkez => {
                console.log(merkez)
                if(merkez.key === "vakiflar") {
                    merkez.value = finallySelectedCities;
                    console.log(merkezlerInformation);
                    window.localStorage.setItem("merkezlerInformation", JSON.stringify(merkezlerInformation))
                }
            });

            myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
            setTimeout(function() {
              promptBackground.remove();
              myPromptMainDiv.remove();
            }, 400)
            window.location.reload();
        };

        buttons.appendChild(citySubmit);
  
  

        let formCancle = document.createElement("span");
        formCancle.classList.add("formCancle");
        formCancle.innerHTML = "Vazgeç";
        formCancle.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        formCancle.addEventListener("mouseover" , () => {
          formCancle.style.backgroundColor = "#0b1d59";
        })
        formCancle.addEventListener("mouseout", () => {
          formCancle.style.backgroundColor = "#334da0";
        })
      
        buttons.appendChild(formCancle);
        cityForm.appendChild(buttons);
      


        let promptClose = document.createElement("span");
        promptClose.classList.add("promptClose");
        promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
        promptClose.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        promptClose.addEventListener("mouseover" , () => {
          promptClose.style.backgroundColor = "red";
        })
        promptClose.addEventListener("mouseout", () => {
          promptClose.style.backgroundColor = "#11053d";
        })
        myPromptMainDiv.appendChild(promptClose);



        document.body.prepend(myPromptMainDiv);
    });
})();

(async function() {
    let temsilcilikler = document.getElementById("temsilcilikler");
    let info = temsilcilikler.querySelector(".info");

    citiesInformation.forEach(city => {
        if(merkezlerInformation[1].value.includes(city.cityId)) {
            let basildi = false;
            allStudents.forEach(cityyy => {
                if(cityyy.key === city.cityId) {
                    basildi = true;
                    let il = document.createElement("div");
                    il.classList = `il ${city.cityId}`;
                    il.innerHTML = `
                    <div class="head">
                        <h2>${city.cityName}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="showButton"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
                    </div>
                    <div class="tableDiv">
                        <table>
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Ad Soyad</td>
                                    <td>Üniversite</td>
                                    <td>Bölüm</td>
                                    <td>Tel. No</td>
                                    <td>Memleket</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    `;
                    info.appendChild(il);
                    tbody = il.querySelector("table tbody");
                    cityyy.value.forEach((student, index) => {
                        let row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${student.name}</td>
                            <td>${student.university}</td>
                            <td>${student.major}</td>
                            <td>${student.phone}</td>
                            <td>${student.homeland}</td>
                        `;
                        tbody.appendChild(row);
                    })

                    let head = il.querySelector(".head");

                    head.onclick = function() {
                        if(window.getComputedStyle(this.parentElement.lastElementChild).getPropertyValue('height') === "0px") {
                            this.parentElement.lastElementChild.style.height = "auto";
                            this.lastElementChild.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                        } else {
                            this.parentElement.lastElementChild.style.height = "0";
                            this.lastElementChild.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                        }
                    }
                }
            })
            if(!basildi) {
                let il = document.createElement("div");
                il.classList = `il ${city.cityId}`;
                il.innerHTML = `
                <div class="head">
                    <h2>${city.cityName}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="showButton"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
                </div>
                <div class="tableDiv">
                    <table>
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Ad Soyad</td>
                                <td>Üniversite</td>
                                <td>Bölüm</td>
                                <td>Tel. No</td>
                                <td>Memleket</td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                `;
                info.appendChild(il);

            
                let head = il.querySelector(".head");

                head.onclick = function() {
                    if(window.getComputedStyle(this.parentElement.lastElementChild).getPropertyValue('height') === "0px") {
                        this.parentElement.lastElementChild.style.height = "auto";
                        this.lastElementChild.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                    } else {
                        this.parentElement.lastElementChild.style.height = "0";
                        this.lastElementChild.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                    }
                }
            }
        }
    });

    let setBtn = temsilcilikler.querySelector(".setBtn");
    
    setBtn.addEventListener("click", function() {
        let promptBackground = document.createElement("div");
        promptBackground.classList.add("promptBackground");
        document.body.prepend(promptBackground);
      
        let myPromptMainDiv = document.createElement("div");
        myPromptMainDiv.classList.add("myPromptMainDiv");
      
        let promptSpan = document.createElement("span");
        promptSpan.classList.add("promptSpan");
        promptSpan.innerHTML = "Şubenin Bulunduğu Şehirleri Seçiniz";
        myPromptMainDiv.appendChild(promptSpan);
      
        let cityForm = document.createElement("form");
        cityForm.classList.add("cityForm");
        myPromptMainDiv.appendChild(cityForm);

        let rows = document.createElement("div");
        rows.className = "rows";

        let selectedCities = [];

        citiesInformation.forEach((city) => {
            let row = document.createElement("div");
            row.className = "row";
        
            let rowLabel = document.createElement("label");
            rowLabel.setAttribute("for", `${city.cityId}`);
            rowLabel.innerHTML = `${city.cityName}`;
        
            let rowInput = document.createElement("input");
            rowInput.id = `${city.cityId}`;
            rowInput.type = "checkbox";
        
            if (merkezlerInformation[1].value.includes(city.cityId)) {
                rowInput.checked = true; 
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                selectedCities.push(row); 
                console.log(row)
            } else {
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                rows.appendChild(row);
            }
        });
        
        
        // عرض المدن المختارة أولاً
        selectedCities.forEach((selectedCity) => {
            rows.prepend(selectedCity);
        });
        
        cityForm.appendChild(rows);


        let buttons = document.createElement("div");
        buttons.classList.add("buttons");


        let citySubmit = document.createElement("input");
        citySubmit.classList.add("studentSubmit");
        citySubmit.type = "submit";
        citySubmit.value = "Kaydet";
        
        citySubmit.addEventListener("mouseover" , () => {
          citySubmit.style.backgroundColor = "green";
        })
        citySubmit.addEventListener("mouseout", () => {
          citySubmit.style.backgroundColor = "#1ea500";
        })
      
        cityForm.onsubmit = function(event) {
            event.preventDefault(); 
        

            let finallySelectedCities = [];
            citiesInformation.forEach((city) => {
                let cityCheckbox = document.getElementById(city.cityId);
                if (cityCheckbox.checked) {
                    finallySelectedCities.push(city.cityId);
                }
            });
        
            // قم بمعالجة الاختيارات المحددة هنا، مثلاً إرسالها إلى الخادم أو عرضها للمستخدم
            console.log("المدن التي اختارها المستخدم:", finallySelectedCities);

            merkezlerInformation[1].value = finallySelectedCities;
            window.localStorage.setItem("merkezlerInformation", JSON.stringify(merkezlerInformation))

            myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
            setTimeout(function() {
              promptBackground.remove();
              myPromptMainDiv.remove();
            }, 400)
            window.location.reload();
        };

        buttons.appendChild(citySubmit);
  
  

        let formCancle = document.createElement("span");
        formCancle.classList.add("formCancle");
        formCancle.innerHTML = "Vazgeç";
        formCancle.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        formCancle.addEventListener("mouseover" , () => {
          formCancle.style.backgroundColor = "#0b1d59";
        })
        formCancle.addEventListener("mouseout", () => {
          formCancle.style.backgroundColor = "#334da0";
        })
      
        buttons.appendChild(formCancle);
        cityForm.appendChild(buttons);
      


        let promptClose = document.createElement("span");
        promptClose.classList.add("promptClose");
        promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
        promptClose.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        promptClose.addEventListener("mouseover" , () => {
          promptClose.style.backgroundColor = "red";
        })
        promptClose.addEventListener("mouseout", () => {
          promptClose.style.backgroundColor = "#11053d";
        })
        myPromptMainDiv.appendChild(promptClose);



        document.body.prepend(myPromptMainDiv);
    });
})();

(async function() {
    let kulupler = document.getElementById("kulupler");
    let info = kulupler.querySelector(".info");

    citiesInformation.forEach(city => {
        if(merkezlerInformation[2].value.includes(city.cityId)) {
            let basildi = false;
            allStudents.forEach(cityyy => {
                if(cityyy.key === city.cityId) {
                    basildi = true;
                    let il = document.createElement("div");
                    il.classList = `il ${city.cityId}`;
                    il.innerHTML = `
                    <div class="head">
                        <h2>${city.cityName}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="showButton"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
                    </div>
                    <div class="tableDiv">
                        <table>
                            <thead>
                                <tr>
                                    <td>No</td>
                                    <td>Ad Soyad</td>
                                    <td>Üniversite</td>
                                    <td>Bölüm</td>
                                    <td>Tel. No</td>
                                    <td>Memleket</td>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    `;
                    info.appendChild(il);
                    tbody = il.querySelector("table tbody");
                    cityyy.value.forEach((student, index) => {
                        let row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${student.name}</td>
                            <td>${student.university}</td>
                            <td>${student.major}</td>
                            <td>${student.phone}</td>
                            <td>${student.homeland}</td>
                        `;
                        tbody.appendChild(row);
                    })

                    let head = il.querySelector(".head");

                    head.onclick = function() {
                        if(window.getComputedStyle(this.parentElement.lastElementChild).getPropertyValue('height') === "0px") {
                            this.parentElement.lastElementChild.style.height = "auto";
                            this.lastElementChild.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                        } else {
                            this.parentElement.lastElementChild.style.height = "0";
                            this.lastElementChild.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                        }
                    }
                }
            })
            if(!basildi) {
                let il = document.createElement("div");
                il.classList = `il ${city.cityId}`;
                il.innerHTML = `
                <div class="head">
                    <h2>${city.cityName}</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="showButton"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>
                </div>
                <div class="tableDiv">
                    <table>
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Ad Soyad</td>
                                <td>Üniversite</td>
                                <td>Bölüm</td>
                                <td>Tel. No</td>
                                <td>Memleket</td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                `;
                info.appendChild(il);

            
                let head = il.querySelector(".head");

                head.onclick = function() {
                    if(window.getComputedStyle(this.parentElement.lastElementChild).getPropertyValue('height') === "0px") {
                        this.parentElement.lastElementChild.style.height = "auto";
                        this.lastElementChild.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                    } else {
                        this.parentElement.lastElementChild.style.height = "0";
                        this.lastElementChild.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                    }
                }
            }
        }
    });

    let setBtn = kulupler.querySelector(".setBtn");
    
    setBtn.addEventListener("click", function() {
        let promptBackground = document.createElement("div");
        promptBackground.classList.add("promptBackground");
        document.body.prepend(promptBackground);
      
        let myPromptMainDiv = document.createElement("div");
        myPromptMainDiv.classList.add("myPromptMainDiv");
      
        let promptSpan = document.createElement("span");
        promptSpan.classList.add("promptSpan");
        promptSpan.innerHTML = "Şubenin Bulunduğu Şehirleri Seçiniz";
        myPromptMainDiv.appendChild(promptSpan);
      
        let cityForm = document.createElement("form");
        cityForm.classList.add("cityForm");
        myPromptMainDiv.appendChild(cityForm);

        let rows = document.createElement("div");
        rows.className = "rows";

        let selectedCities = [];

        citiesInformation.forEach((city) => {
            let row = document.createElement("div");
            row.className = "row";
        
            let rowLabel = document.createElement("label");
            rowLabel.setAttribute("for", `${city.cityId}`);
            rowLabel.innerHTML = `${city.cityName}`;
        
            let rowInput = document.createElement("input");
            rowInput.id = `${city.cityId}`;
            rowInput.type = "checkbox";
        
            if (merkezlerInformation[2].value.includes(city.cityId)) {
                rowInput.checked = true; 
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                selectedCities.push(row); 
                console.log(row)
            } else {
                row.appendChild(rowInput);
                row.appendChild(rowLabel);
                rows.appendChild(row);
            }
        });
        
        
        // عرض المدن المختارة أولاً
        selectedCities.forEach((selectedCity) => {
            rows.prepend(selectedCity);
        });
        
        cityForm.appendChild(rows);


        let buttons = document.createElement("div");
        buttons.classList.add("buttons");


        let citySubmit = document.createElement("input");
        citySubmit.classList.add("studentSubmit");
        citySubmit.type = "submit";
        citySubmit.value = "Kaydet";
        
        citySubmit.addEventListener("mouseover" , () => {
          citySubmit.style.backgroundColor = "green";
        })
        citySubmit.addEventListener("mouseout", () => {
          citySubmit.style.backgroundColor = "#1ea500";
        })
      
        cityForm.onsubmit = function(event) {
            event.preventDefault(); 
        

            let finallySelectedCities = [];
            citiesInformation.forEach((city) => {
                let cityCheckbox = document.getElementById(city.cityId);
                if (cityCheckbox.checked) {
                    finallySelectedCities.push(city.cityId);
                }
            });
        
            // قم بمعالجة الاختيارات المحددة هنا، مثلاً إرسالها إلى الخادم أو عرضها للمستخدم
            console.log("المدن التي اختارها المستخدم:", finallySelectedCities);

            merkezlerInformation[2].value = finallySelectedCities;
            window.localStorage.setItem("merkezlerInformation", JSON.stringify(merkezlerInformation));

            myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
            setTimeout(function() {
              promptBackground.remove();
              myPromptMainDiv.remove();
            }, 400)
            window.location.reload();
        };

        buttons.appendChild(citySubmit);
  
  

        let formCancle = document.createElement("span");
        formCancle.classList.add("formCancle");
        formCancle.innerHTML = "Vazgeç";
        formCancle.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        formCancle.addEventListener("mouseover" , () => {
          formCancle.style.backgroundColor = "#0b1d59";
        })
        formCancle.addEventListener("mouseout", () => {
          formCancle.style.backgroundColor = "#334da0";
        })
      
        buttons.appendChild(formCancle);
        cityForm.appendChild(buttons);
      


        let promptClose = document.createElement("span");
        promptClose.classList.add("promptClose");
        promptClose.innerHTML = `<svg height="23" viewBox="0 0 20 20" width="23" xmlns="http://www.w3.org/2000/svg"><path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#e2ddef"></path></svg>`;
        promptClose.addEventListener("click", () => {
          myPromptMainDiv.style.animation = "goAway 0.4s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
        })
        promptClose.addEventListener("mouseover" , () => {
          promptClose.style.backgroundColor = "red";
        })
        promptClose.addEventListener("mouseout", () => {
          promptClose.style.backgroundColor = "#11053d";
        })
        myPromptMainDiv.appendChild(promptClose);



        document.body.prepend(myPromptMainDiv);
    });
})();
