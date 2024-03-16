/*! SVG Türkiye Haritası | MIT Lisans | dnomak.com */

class Student {
  constructor(name, university, major, hisClass, phone, homeland, note = "") {
    this.name = name;
    this.university = university;
    this.major = major;
    this.hisClass = hisClass;
    this.phone = phone;
    this.homeland = homeland;
    this.note = note;
  }
}

window.addEventListener("load", function() {
  numbersOnCities();
  updateStudentCount();
  numbersOnCities();
})


window.addEventListener('resize', numbersOnCities);


let searchInput = document.querySelector(".search-div input");
let searchBtn = document.querySelector(".search-div .searchBtn");

searchBtn.onclick = function() {
  let numbersOnCities = document.getElementsByClassName("studentsCount") || [];

  Array.from(numbersOnCities).forEach((number) => {
    console.log(number);
    array = JSON.parse(window.localStorage.getItem(number.id));
    array.forEach((student) => {
      if(student.name === capitalizeFirstLetters(searchInput.value)) {
        number.click();
      }
    })

  });
}



const info = document.querySelector('.il-isimleri');

const turkiyeHaritasi = document.querySelector('#svg-turkiye-haritasi');

turkiyeHaritasi.addEventListener(
  'mouseover',
  function (event) {
    if (event.target.tagName === 'path' && event.target.parentNode.id !== 'guney-kibris') {
      info.innerHTML = [
        '<div>',
        event.target.parentNode.getAttribute('data-iladi'),
        '</div>'
      ].join('');
    }
  }
);

turkiyeHaritasi.addEventListener(
  'mousemove',
  function (event) {
    info.style.top = event.pageY + 25 + 'px';
    info.style.left = event.pageX + 'px';
  }
);

turkiyeHaritasi.addEventListener(
  'mouseout',
  function () {
    info.innerHTML = '';
  }
);


// pathElements.forEach
document.body.addEventListener(
  "click",
  function (event) {
    if (event.target.parentElement.tagName === 'g' || event.target.className === 'studentsCount') {
      if(event.target.parentElement.tagName === 'g') {
        var clickedCity = event.target.parentElement;
        console.log("event = path")
      } else if(event.target.className === 'studentsCount') {
        var clickedCity = document.querySelector(`#svg-turkiye-haritasi #${event.target.id}`);
        console.log(clickedCity);
        console.log("event is studentsCount")
      }
      
      let box = document.getElementById("box");

      let currentCities = document.querySelectorAll(".box .il");
      currentCities.forEach((city) => {
        if(clickedCity.getAttribute('id') === city.id) {
          city.remove();
        }
      })


      let il = document.createElement("div");
      il.classList.add("il");
      il.id = `${clickedCity.getAttribute('id')}`;

      let h1 = document.createElement("h1");
      h1.append(`${clickedCity.getAttribute('data-iladi')}`);
      il.appendChild(h1);

      let personList = document.createElement("div");
      personList.classList.add("person-list");

      il.appendChild(personList);

      box.appendChild(il);

      updateList(il.id);
      
      let addBtn = document.createElement("button");
      addBtn.classList.add("addBtn");
      addBtn.innerHTML = "Öğrenci Ekle";

      addBtn.addEventListener("mouseover" , () => {
        addBtn.style.backgroundColor = "#1ea500";
      })
      
      addBtn.addEventListener("mouseout", () => {
        addBtn.style.backgroundColor = "#5db440";
      })

      
      addBtn.addEventListener("click", function() {
        addStudentPrompt(il.id);
      });
      
      
      il.appendChild(addBtn);

      let ilCloseBtn = document.createElement("button");
      ilCloseBtn.classList.add("ilClose");
      ilCloseBtn.innerHTML = " x ";
      ilCloseBtn.addEventListener("mouseover" , () => {
        ilCloseBtn.style.backgroundColor = "red";
      })
      
      ilCloseBtn.addEventListener("mouseout", () => {
        ilCloseBtn.style.backgroundColor = "#151515";
      })
      ilCloseBtn.onclick = function() {
        il.remove();
        numbersOnCities();
      }
      il.appendChild(ilCloseBtn);

      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });

      updateStudentCount();
    }
  }
)



document.addEventListener('click', function(event) {
  var btnsAbsoList = document.querySelectorAll('.btnsAbso');
  
  btnsAbsoList.forEach(function(btnsAbso) {
    if (btnsAbso.contains(event.target)) {
      let subButtonsVisible = btnsAbso.firstElementChild.nextElementSibling.style.display === "flex" && btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display === "flex" && btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display === "flex";
      
      console.log(subButtonsVisible);
      console.log(btnsAbso.firstElementChild.nextElementSibling);
      console.log(btnsAbso.firstElementChild.nextElementSibling.nextElementSibling);
      console.log(btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling);  


      if (subButtonsVisible) {
        btnsAbso.style.cssText = "transform: translateY(0); height: 100%;"; 
        btnsAbso.firstElementChild.nextElementSibling.style.display = "none";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
      } else {
        btnsAbso.style.cssText = "transform: translateY(38%); height: 436%;";
        btnsAbso.firstElementChild.nextElementSibling.style.display = "flex";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display = "flex";
        btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "flex";
      }

    } else if (!btnsAbso.contains(event.target)) {
      btnsAbso.style.cssText = "transform: translateY(0); height: 100%;"; 
      btnsAbso.firstElementChild.nextElementSibling.style.display = "none";
      btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.style.display = "none";
      btnsAbso.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.style.display = "none";
    }
  });
});


function updateStudentCount() {
  let numbersOnCities1 = document.getElementsByClassName("studentsCount") || [];

  let allStudentsCount = 0;
  let citiesCount = 0;
  
  Array.from(numbersOnCities1).forEach((number) => {
    allStudentsCount += Number(number.innerHTML);
    citiesCount += 1;
    console.log(allStudentsCount);
  })
  
  let ogrenciSayisi = document.querySelector(".ogrenci-sayisi");
  ogrenciSayisi.innerHTML = `Toplam ${citiesCount} İlde<br>${allStudentsCount} Öğrenci Vardır`;
  // if (window.matchMedia("(min-width: 500px)").matches) {
  //   ogrenciSayisi.innerHTML = `Toplam ${citiesCount} İlde<br>${allStudentsCount} Öğrenci Vardır`;
  // } else {
  //   ogrenciSayisi.innerHTML = `Toplam ${citiesCount} İlde ${allStudentsCount} Öğrenci Vardır`;
  // }
  
  if(allStudentsCount === 0) {
    ogrenciSayisi.style.visibility = "hidden";
  } else {
    ogrenciSayisi.style.visibility = "visible";
  }
}


function addStudentPrompt(cityId, nameValue = "", universityValue = "", majorValue = "", classValue = "", phoneValue = "", homelandValue = "", updateStudent = false) {
  let promptBackground = document.createElement("div");
  promptBackground.classList.add("promptBackground");
  document.body.prepend(promptBackground);

  let myPromptMainDiv = document.createElement("div");
  myPromptMainDiv.classList.add("myPromptMainDiv");

  let promptSpan = document.createElement("span");
  promptSpan.classList.add("promptSpan");
  promptSpan.innerHTML = "Eklemek İstediğiniz Öğrencinin Bilgilerini Giriniz:";
  myPromptMainDiv.appendChild(promptSpan);

  let form = document.createElement("div");
  form.classList.add("form");
  myPromptMainDiv.appendChild(form);
  
  let studentForm = document.createElement("form");
  studentForm.classList.add("studentForm");
  
  let studentName = document.createElement("input");
  studentName.classList = "studentInput studentName";
  studentName.type = "text";
  studentName.placeholder = "Öğrencinin Adı Soaydı";
  studentName.required = true;
  studentName.value = nameValue;
  
  let studentUniversity = document.createElement("input");
  studentUniversity.classList = "studentInput studentUniversity";
  studentUniversity.type = "text";
  studentUniversity.placeholder = "Öğrencinin Üniversitesi";
  studentUniversity.value = universityValue;
  
  let studentmajor = document.createElement("input");
  studentmajor.classList = "studentInput studentmajor";
  studentmajor.type = "text";
  studentmajor.placeholder = "Öğrencinin Bölümü";
  studentmajor.value = majorValue;
  
  let studentClass = document.createElement("input");
  studentClass.classList = "studentInput studentClass";
  studentClass.type = "text";
  studentClass.placeholder = "Öğrencinin Sınıfı";
  studentClass.value = classValue;
  
  let studentPhone = document.createElement("input");
  studentPhone.classList = "studentInput studentPhone";
  studentPhone.type = "text";
  studentPhone.placeholder = "Öğrencinin Telefonu";
  studentPhone.value = phoneValue;
  
  let studentHomeland = document.createElement("input");
  studentHomeland.classList = "studentInput studentHomeland";
  studentHomeland.type = "text";
  studentHomeland.placeholder = "Öğrencinin Memleketi";
  studentHomeland.value = homelandValue;
  
  let studentSubmit = document.createElement("input");
  studentSubmit.classList.add("studentSubmit");
  studentSubmit.type = "submit";
  studentSubmit.value = "Ekle";
  
  studentSubmit.addEventListener("mouseover" , () => {
    studentSubmit.style.backgroundColor = "green";
  })
  studentSubmit.addEventListener("mouseout", () => {
    studentSubmit.style.backgroundColor = "#1ea500";
  })

  
  
  studentForm.onsubmit = function(event) {
    if(studentName.value !== '') {
      event.preventDefault();
      console.log(capitalizeFirstLetters(studentName.value));

      currentStudentsArray = JSON.parse(window.localStorage.getItem(`${cityId}`)) || [];
      console.log(currentStudentsArray);
      console.log(currentStudentsArray.length);
      
      if(!updateStudent) {
        console.log("normal ekleme")
        let isStudentAviable = true;
        currentStudentsArray.forEach((student) => {
          if(student.name === capitalizeFirstLetters(studentName.value)) {
            isStudentAviable = false;
          }
        })

        if(isStudentAviable) {
          console.log("normal ekleme avialble")
          let newStudent = new Student(capitalizeFirstLetters(studentName.value), capitalizeFirstLetters(studentUniversity.value), capitalizeFirstLetters(studentmajor.value), studentClass.value, studentPhone.value, capitalizeFirstLetters(studentHomeland.value));
          console.log(newStudent)
          addPersonToLocalStorage(cityId, newStudent);
          
          myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
          setTimeout(function() {
            promptBackground.remove();
            myPromptMainDiv.remove();
          }, 400)
          numbersOnCities();
        } else {
          let erorSpan = document.createElement("span");
          erorSpan.className = "erorSpan";
          erorSpan.innerHTML = "Bu Öğrenci Zaten Bu İlde Kayıtlıdır!";
          let myBr = document.createElement("br");
          form.appendChild(myBr);
          form.appendChild(erorSpan);
        }
      } else {
        console.log("normal ekleme degil, guncelleme")
        let oldNote;
        currentStudentsArray.forEach((student) => {
          if(student.name === nameValue) {
            oldNote = student.note;
          }
        })

        // currentStudentsArray = currentStudentsArray.filter((student) => student.name !== nameValue);

        currentStudentsArray.forEach((student) => {
          if(student.name === nameValue) {
            console.log(currentStudentsArray.indexOf(student));

            let newStudent = new Student(capitalizeFirstLetters(studentName.value), capitalizeFirstLetters(studentUniversity.value), capitalizeFirstLetters(studentmajor.value), studentClass.value, studentPhone.value, capitalizeFirstLetters(studentHomeland.value), oldNote);
            currentStudentsArray[currentStudentsArray.indexOf(student)] = newStudent
            console.log(currentStudentsArray);

            window.localStorage.setItem(`${cityId}`, JSON.stringify(currentStudentsArray));
            updateList(cityId);
          }
        });


        // window.localStorage.setItem(`${cityId}`, JSON.stringify(currentStudentsArray));
        // let newStudent = new Student(capitalizeFirstLetters(studentName.value), capitalizeFirstLetters(studentUniversity.value), capitalizeFirstLetters(studentmajor.value), studentClass.value, studentPhone.value, capitalizeFirstLetters(studentHomeland.value), oldNote);
        // console.log(newStudent)
        // addPersonToLocalStorage(cityId, newStudent);
        
        myPromptMainDiv.style.animation = "disappperance 0.5s forwards";
        setTimeout(function() {
          promptBackground.remove();
          myPromptMainDiv.remove();
        }, 400)
        numbersOnCities();
      }



    }
  }
  
  studentForm.appendChild(studentName);
  studentForm.appendChild(studentUniversity);
  studentForm.appendChild(studentmajor);
  studentForm.appendChild(studentClass);
  studentForm.appendChild(studentPhone);
  studentForm.appendChild(studentHomeland);
  studentForm.appendChild(studentSubmit);
  form.appendChild(studentForm);
  


  let formSpans = document.createElement("div");
  formSpans.classList.add("formSpans");
  form.appendChild(formSpans);

  let studentNameSpan = document.createElement("span");
  studentNameSpan.innerHTML = "Ad Soyad&nbsp;&nbsp;&nbsp;:";
  formSpans.appendChild(studentNameSpan);

  let studentUniSpan = document.createElement("span");
  studentUniSpan.innerHTML = "Üniversite&nbsp;:";
  formSpans.appendChild(studentUniSpan);

  let studentMajorSpan = document.createElement("span");
  studentMajorSpan.innerHTML = "Bölüm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:";
  formSpans.appendChild(studentMajorSpan);

  let studenClasstSpan = document.createElement("span");
  studenClasstSpan.innerHTML = "Sınıf&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:";
  formSpans.appendChild(studenClasstSpan);

  let studentTelSpan = document.createElement("span");
  studentTelSpan.innerHTML = "Tel. No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:";
  formSpans.appendChild(studentTelSpan);

  let studenHomelandtSpan = document.createElement("span");
  studenHomelandtSpan.innerHTML = "Memleket&nbsp;:";
  formSpans.appendChild(studenHomelandtSpan);


  let formCancle = document.createElement("span");
  formCancle.classList.add("formCancle");
  formCancle.innerHTML = "Vazgeç";
  formCancle.addEventListener("click", () => {
    myPromptMainDiv.style.animation = "goAway 0.4s forwards";
    setTimeout(function() {
      promptBackground.remove();
      myPromptMainDiv.remove();
    }, 400)
    numbersOnCities();
  })
  formCancle.addEventListener("mouseover" , () => {
    formCancle.style.backgroundColor = "#0b1d59";
  })
  formCancle.addEventListener("mouseout", () => {
    formCancle.style.backgroundColor = "#334da0";
  })

  studentForm.appendChild(formCancle);



  let promptClose = document.createElement("span");
  promptClose.classList.add("promptClose");
  promptClose.innerHTML = " x ";
  promptClose.addEventListener("click", () => {
    myPromptMainDiv.style.animation = "goAway 0.4s forwards";
    setTimeout(function() {
      promptBackground.remove();
      myPromptMainDiv.remove();
    }, 400)
    numbersOnCities();
  })
  promptClose.addEventListener("mouseover" , () => {
    promptClose.style.backgroundColor = "red";
  })
  promptClose.addEventListener("mouseout", () => {
    promptClose.style.backgroundColor = "#777";
  })
  myPromptMainDiv.appendChild(promptClose);
  
  document.body.prepend(myPromptMainDiv);
}


function addNotePrompt(cityId, student) {
  let promptBackground = document.createElement("div");
  promptBackground.classList.add("promptBackground");
  document.body.prepend(promptBackground);

  let addNotePromptMainDiv = document.createElement("div");
  addNotePromptMainDiv.classList.add("addNotePromptMainDiv");

  let promptSpan = document.createElement("span");
  promptSpan.classList.add("promptSpan");
  promptSpan.innerHTML = "Eklemek İstediğiniz Notu Yazınız:<br>(Notu Silmek İçin Boş Bırakınız)";
  addNotePromptMainDiv.appendChild(promptSpan);

  let noteForm = document.createElement("form");
  noteForm.classList.add("noteForm");
  
  let noteText = document.createElement("textarea");
  noteText.classList = "noteText";
  noteText.placeholder = "Notu Yazınız";
  noteText.value = student.note;
  noteForm.appendChild(noteText);

  
  let noteSubmit = document.createElement("input");
  noteSubmit.classList.add("noteSubmit");
  noteSubmit.type = "submit";
  noteSubmit.value = "Ekle";
  
  noteSubmit.addEventListener("mouseover" , () => {
    noteSubmit.style.backgroundColor = "green";
  })
  noteSubmit.addEventListener("mouseout", () => {
    noteSubmit.style.backgroundColor = "#1ea500";
  })

  noteSubmit.onclick = function(event) {
    event.preventDefault();
    console.log(typeof student);
    student.note = noteText.value;

    currentStudentsArray = JSON.parse(window.localStorage.getItem(`${cityId}`)) || [];
    
    // currentStudentsArray = currentStudentsArray.filter((person) => person.name !== student.name);
    console.log(currentStudentsArray);

    currentStudentsArray.forEach((person) => {
      if(person.name === student.name) {
        console.log(student)
        console.log(student.name)
        console.log(person)
        console.log(person.name)

        let newStudent = new Student(student.name, student.university, student.major, student.hisClass, student.phone, student.homeland, student.note);

        currentStudentsArray[currentStudentsArray.indexOf(person)] = newStudent;
        console.log(currentStudentsArray);
      }
    });

    // window.localStorage.setItem(`${cityId}`, JSON.stringify(currentStudentsArray));

    // let newStudent = new Student(student.name, student.university, student.major, student.hisClass, student.phone, student.homeland, student.note);
    // addPersonToLocalStorage(cityId, newStudent);

    console.log(currentStudentsArray);

    window.localStorage.setItem(cityId, JSON.stringify(currentStudentsArray));

    updateList(cityId);
    
    addNotePromptMainDiv.style.animation = "disappperance 0.5s forwards";
    setTimeout(function() {
      promptBackground.remove();
      addNotePromptMainDiv.remove();
    }, 400)
  }

  noteForm.appendChild(noteSubmit);


  let formCancle = document.createElement("span");
  formCancle.classList.add("formCancle");
  formCancle.innerHTML = "Vazgeç";
  formCancle.addEventListener("click", () => {
    addNotePromptMainDiv.style.animation = "goAway 0.4s forwards";
    setTimeout(function() {
      promptBackground.remove();
      addNotePromptMainDiv.remove();
    }, 400)
    numbersOnCities();
  })
  formCancle.addEventListener("mouseover" , () => {
    formCancle.style.backgroundColor = "#0b1d59";
  })
  formCancle.addEventListener("mouseout", () => {
    formCancle.style.backgroundColor = "#334da0";
  })

  noteForm.appendChild(formCancle);



  let promptClose = document.createElement("span");
  promptClose.classList.add("promptClose");
  promptClose.innerHTML = " x ";
  promptClose.addEventListener("click", () => {
    addNotePromptMainDiv.style.animation = "goAway 0.4s forwards";
    setTimeout(function() {
      promptBackground.remove();
      addNotePromptMainDiv.remove();
    }, 400)
    numbersOnCities();
  })
  promptClose.addEventListener("mouseover" , () => {
    promptClose.style.backgroundColor = "red";
  })
  promptClose.addEventListener("mouseout", () => {
    promptClose.style.backgroundColor = "#777";
  })
  addNotePromptMainDiv.appendChild(promptClose);


  addNotePromptMainDiv.appendChild(noteForm);

  document.body.appendChild(addNotePromptMainDiv);
}



function addPersonToLocalStorage(cityId, obj) {
  console.log(cityId);
  
  let array = JSON.parse(window.localStorage.getItem(cityId)) || [];
  console.log(array);

  array.push(obj);
  console.log(array);

  window.localStorage.setItem(cityId, JSON.stringify(array));
  updateList(cityId); 
}

function updateList(cityId) {
  console.log("Update List");
  let cityElement = document.querySelector(`.box #${cityId}`);
  console.log(cityElement)

  let personList = cityElement.querySelector(".person-list");

  if(cityElement !== null && personList !== null) {
    personList.innerHTML = ''; 
  } 

  let array = JSON.parse(window.localStorage.getItem(cityId)) || [];

  if (array.length > 0) {
    array.forEach(person => {
      if(typeof person !== typeof {}) {
        array = array.filter((student) => typeof student === typeof {});
        window.localStorage.setItem(cityId, JSON.stringify(array));
      }
    })

    

    array.forEach(person => {
      let personElement = document.createElement("div");
      personElement.classList.add("person");

      personElement.innerHTML = `<span class="personName">${person.name}</span>`;

      let btns = document.createElement("div");
      btns.className = "btns";
      
      
      let btnsAbso = document.createElement("div");
      btnsAbso.className = "btnsAbso";
      
      let threePoint = document.createElement("div");
      threePoint.className = "threePoint";
      threePoint.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>`;
      btnsAbso.appendChild(threePoint);
      
      
      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("bin-button");

      if (window.matchMedia("(max-width: 768px)").matches) {
        deleteBtn.innerHTML = "Sil";
      }

      if (window.matchMedia("(min-width: 768px)").matches) {
        deleteBtn.innerHTML = `
          <svg
            class="bin-top"
            viewBox="0 0 39 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
            <line
              x1="12"
              y1="1.5"
              x2="26.0357"
              y2="1.5"
              stroke="white"
              stroke-width="3"
            ></line>
          </svg>
          <svg
            class="bin-bottom"
            viewBox="0 0 33 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_8_19" fill="white">
              <path
                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
              ></path>
            </mask>
            <path
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
              fill="white"
              mask="url(#path-1-inside-1_8_19)"
            ></path>
            <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
            <path d="M21 6V29" stroke="white" stroke-width="4"></path>
          </svg>
        `;

        deleteBtn.onmouseover = function() {
          this.innerHTML = "Sil";
        }
  
        deleteBtn.onmouseout = function() {
          this.innerHTML =`<svg
            class="bin-top"
            viewBox="0 0 39 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
            <line
              x1="12"
              y1="1.5"
              x2="26.0357"
              y2="1.5"
              stroke="white"
              stroke-width="3"
            ></line>
          </svg>
          <svg
            class="bin-bottom"
            viewBox="0 0 33 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_8_19" fill="white">
              <path
                d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
              ></path>
            </mask>
            <path
              d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
              fill="white"
              mask="url(#path-1-inside-1_8_19)"
            ></path>
            <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
            <path d="M21 6V29" stroke="white" stroke-width="4"></path>
          </svg>
        `;
        }  
      }

      deleteBtn.onclick = async function() {
        console.log(cityId)
        console.log(person)
        let confirmed = await myCustomConfirm(`${this.parentElement.parentElement.parentElement.firstElementChild.innerHTML}'i Silmek Istediğinizden Eminmisiniz?`);
        if (confirmed) {
          let array = JSON.parse(window.localStorage.getItem(`${cityId}`));
          console.log(array);
          let theName = this.parentElement.parentElement.parentElement.firstElementChild.innerHTML;
          console.log(theName);
          array = array.filter((ele) => ele.name !== theName);
          console.log(array);
          window.localStorage.setItem(`${cityId}`, JSON.stringify(array));
          console.log(array);

          console.log(this.parentElement.parentElement.parentElement);
          this.parentElement.parentElement.parentElement.remove();
          numbersOnCities();

          if(personList.children.length === 0) {
            console.log("sehire span eklenmeli");
            let noStudentSpan = document.createElement("span");
            noStudentSpan.innerHTML = "Bu Şehirde Bulunan Öğrenci Yoktur";
            personList.appendChild(noStudentSpan);
          }
        } else {
          console.log("olmadi")
        } 
      };

      
      btnsAbso.appendChild(deleteBtn);


      let editBtn = document.createElement("button");
      editBtn.className = "editBtn";

      if (window.matchMedia("(max-width: 768px)").matches) {
        editBtn.innerHTML = "Bilgileri\nDüzenle";
      }

      if (window.matchMedia("(min-width: 768px)").matches) {
        editBtn.innerHTML = `
        <svg height="1em" viewBox="0 0 512 512">
          <path
            d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
          ></path>
        </svg>
        `;

        editBtn.onmouseover = function() {
          this.innerHTML = "Bilgileri\nDüzenle";
        }
  
        editBtn.onmouseout = function() {
          this.innerHTML = `
          <svg height="1em" viewBox="0 0 512 512">
            <path
              d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
            ></path>
          </svg>
          `;
        }
      }

      editBtn.onclick = function() {
        addStudentPrompt(cityId, person.name, person.university, person.major, person.hisClass, person.phone, person.homeland, true);
      }

      

      btnsAbso.appendChild(editBtn)


      let noteBtn = document.createElement("button");
      noteBtn.className = "noteBtn";

      if (window.matchMedia("(max-width: 768px)").matches) {
        noteBtn.innerHTML = "Not<br>Ekle/<br>Sil";
      }

      if (window.matchMedia("(min-width: 768px)").matches) {
        noteBtn.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>`;

        noteBtn.onmouseover = function() {
          this.innerHTML = "Not<br>Ekle/<br>Sil";
        }
  
        noteBtn.onmouseout = function() {
          this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>`;
        }
      }

      noteBtn.onclick = function() {
        addNotePrompt(cityId, person);
      }


      btnsAbso.appendChild(noteBtn);
    

      btns.appendChild(btnsAbso);
      personElement.appendChild(btns);


      let pUniversity = document.createElement("span");
      pUniversity.innerHTML = `Üniversite&nbsp;&nbsp;: ${person.university}`;
      personElement.appendChild(pUniversity);

      let pMajor = document.createElement("span");
      pMajor.innerHTML = `Bölüm&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${person.major}`;
      personElement.appendChild(pMajor);

      let pClass = document.createElement("span");
      pClass.innerHTML = `Sınıf&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${person.hisClass}`;
      personElement.appendChild(pClass);

      let pPhone = document.createElement("span");
      pPhone.innerHTML = `Tel. No&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${person.phone}`;
      personElement.appendChild(pPhone);

      let pHomeLand = document.createElement("span");
      pHomeLand.innerHTML = `Memleket&nbsp;&nbsp;: ${person.homeland}`;
      personElement.appendChild(pHomeLand);

      if(person.note !== '') {
        let noteDiv = document.createElement("div");
        noteDiv.className = "noteDiv";
        noteDiv.innerHTML = person.note;
        personElement.appendChild(noteDiv);
      }

      personList.appendChild(personElement);
      
    });
  } else {  
    console.log("kimse yok")
    let noStudentSpan = document.createElement("span");
    noStudentSpan.innerHTML = "Bu Şehirde Bulunan Öğrenci Yoktur";
    personList.appendChild(noStudentSpan);
    
  }

  numbersOnCities();
  updateStudentCount();
};



function numbersOnCities() {

  let numbersWillDelete = document.getElementsByClassName("studentsCount") || [];

  Array.from(numbersWillDelete).forEach((sehir) => {
    sehir.remove();
  });



  let turkiye = document.querySelectorAll("#svg-turkiye-haritasi > g > g"); 
  turkiye.forEach((sehir) => {
    var rect = sehir.getBoundingClientRect();
    var x = rect.left + window.scrollX + rect.width / 2;
    var y = rect.top + window.scrollY + rect.height / 2;
    
    
    let cityFromLocal = JSON.parse(window.localStorage.getItem(`${sehir.id}`)) || [];

    if(cityFromLocal.length) { 
      let studentsCount = document.createElement("span");
      studentsCount.className = "studentsCount";
      studentsCount.id = `${sehir.id}`;
      studentsCount.innerHTML = `${cityFromLocal.length}`;


      studentsCount.addEventListener(
        'mouseover',
        function (event) {
          info.innerHTML = [
            '<div>',
            event.target.id,
            '</div>'
          ].join('');
          sehir.firstElementChild.style.fill = "#E3CCAE";
          }
      );
    
      studentsCount.addEventListener(
        'mousemove',
        function (event) {
          info.style.top = event.pageY + 25 + 'px';
          info.style.left = event.pageX + 'px';
        }
      );
    
      studentsCount.addEventListener(
        'mouseout',
        function () {
          info.innerHTML = '';
          sehir.firstElementChild.style.fill = "";
        }
      );
  
      
      studentsCount.style.top = `${y - studentsCount.offsetHeight / 2}px`;
      studentsCount.style.left = `${x - studentsCount.offsetWidth / 2}px`;

      if (window.matchMedia("(min-width: 768px)").matches) {
        studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 -5}px`;
        studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 -5}px`;

        if(sehir.id === "elazig") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 3}px`;
        studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 20}px`;
        } else if(sehir.id === "artvin") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 20}px`;
        } else if(sehir.id === "trabzon") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "bartin") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 7}px`;
        } else if(sehir.id === "duzce") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "kocaeli") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 11}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 2}px`;
        } else if(sehir.id === "istanbul") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 6}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 16}px`;
        } else if(sehir.id === "tekirdag") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "bayburt") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 8}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 8}px`;
        } else if(sehir.id === "erzincan") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 20}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 20}px`;
        } else if(sehir.id === "amasya") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 5}px`;
        } else if(sehir.id === "yalova") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 8}px`;
        } else if(sehir.id === "izmir") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 15}px`;
        } else if(sehir.id === "mugla") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 15}px`;
        } else if(sehir.id === "denizli") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 15}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 15}px`;
        } else if(sehir.id === "burdur") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 15}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "antalya") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 30}px`;
        } else if(sehir.id === "karaman") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 20}px`;
        } else if(sehir.id === "afyonkarahisar") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 20}px`;
        } else if(sehir.id === "bilecik") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "konya") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 20}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 30}px`;
        } else if(sehir.id === "kilis") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 5}px`;
        } else if(sehir.id === "adiyaman") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 20}px`;
        } else if(sehir.id === "mardin") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
        } else if(sehir.id === "batman") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "sirnak") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 13}px`;
        } else if(sehir.id === "hakkari") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 15}px`;
        } else if(sehir.id === "agri") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 17}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 17}px`;
        } else if(sehir.id === "bitlis") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 19}px`;
        } else if(sehir.id === "mus") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "bingol") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
        } else if(sehir.id === "tunceli") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 5}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 10}px`;
        } else if(sehir.id === "yozgat") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 5}px`;
        } else if(sehir.id === "ordu") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 15}px`;
        } else if(sehir.id === "kirklareli") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 5}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 7}px`;
        } else if(sehir.id === "edirne") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 3}px`;
        } else if(sehir.id === "malatya") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 10}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 16}px`;
        } else if(sehir.id === "hatay") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 7}px`;
        } else if(sehir.id === "usak") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 6}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 9}px`;
        } else if(sehir.id === "osmaniye") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 4}px`;
        } else if(sehir.id === "nigde") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 7}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 7}px`;
        } else if(sehir.id === "kayseri") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 20}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 20}px`;
        } else if(sehir.id === "ankara") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 19}px`;
        } else if(sehir.id === "ardahan") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 5}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 12}px`;
        } else if(sehir.id === "kuzey-kibris") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 12}px`;
        }
      }else if (window.matchMedia("(max-width: 768px)").matches) {
        if(sehir.id === "elazig") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 4}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 5}px`;
        } else if(sehir.id === "adiyaman") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 2}px`;
        } else if(sehir.id === "agri") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 5}px`;
        } else if(sehir.id === "kars") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 1}px`;
        } else if(sehir.id === "artvin") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
        } else if(sehir.id === "erzincan") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 5}px`;
        } else if(sehir.id === "malatya") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 3}px`;
        } else if(sehir.id === "gaziantep") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 5}px`;
        } else if(sehir.id === "hatay") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 2}px`;
        } else if(sehir.id === "samsun") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 3}px`;
        } else if(sehir.id === "ordu") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 2}px`;
        } else if(sehir.id === "kayseri") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 3}px`;
        } else if(sehir.id === "nevsehir") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 3}px`;
        } else if(sehir.id === "karaman") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 1}px`;
        } else if(sehir.id === "konya") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 6}px`;
        } else if(sehir.id === "antalya") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 8}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 5}px`;
        } else if(sehir.id === "burdur") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
        } else if(sehir.id === "denizli") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 3}px`;
        } else if(sehir.id === "mugla") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 6}px`;
        } else if(sehir.id === "isparta") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 3}px`;
        } else if(sehir.id === "izmir") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 9}px`;
        } else if(sehir.id === "canakkale") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 3}px`;
        } else if(sehir.id === "kocaeli") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 1}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 3}px`;
        } else if(sehir.id === "istanbul") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 - 3}px`;
        } else if(sehir.id === "bolu") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 1}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 4}px`;
        } else if(sehir.id === "sanliurfa") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 + 3}px`;
        } else if(sehir.id === "edirne") {
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 3}px`;
        } else if(sehir.id === "ankara") {
          studentsCount.style.top = `${y - studentsCount.offsetHeight / 2 - 3}px`;
          studentsCount.style.left = `${x - studentsCount.offsetWidth / 2 + 5}px`;
        }

      }
        
      document.body.appendChild(studentsCount);
    }
  });
}



function myCustomConfirm(message) {
  return new Promise(resolve => {
    let confirmed = false;

    let confirmBackground = document.createElement("div");
    confirmBackground.classList.add("confirmBackground");
    document.body.prepend(confirmBackground);

    let myConfirmMainDiv = document.createElement("div");
    myConfirmMainDiv.classList.add("myConfirmMainDiv");

    let confirmSpan = document.createElement("span");
    confirmSpan.innerHTML = `${message}`;
    myConfirmMainDiv.appendChild(confirmSpan);

    let resultDiv = document.createElement("div");
    resultDiv.classList.add("resultDiv");

    let resultYes = document.createElement("span");
    resultYes.classList.add("resultYes");
    resultYes.innerHTML = "Evet";

    resultYes.addEventListener("click", function() {
      confirmed = true;
      myConfirmMainDiv.style.animation = "goAway 0.4s forwards";
      setTimeout(function() {
        confirmBackground.remove();
        myConfirmMainDiv.remove();
        resolve(confirmed);
      }, 400)
    });

    resultYes.addEventListener("mouseover", () => {
      resultYes.style.backgroundColor = "#a80000";
    });

    resultYes.addEventListener("mouseout", () => {
      resultYes.style.backgroundColor = "#ff4a4a";
    });

    resultDiv.appendChild(resultYes);

    let resultNo = document.createElement("span");
    resultNo.classList.add("resultNo");
    resultNo.innerHTML = "Hayır";

    resultNo.addEventListener("click", function() {
      confirmed = false;
      myConfirmMainDiv.style.animation = "goAway 0.4s forwards";
      setTimeout(function() {
        confirmBackground.remove();
        myConfirmMainDiv.remove();
        resolve(confirmed);
      }, 400)
    });

    resultNo.addEventListener("mouseover", () => {
      resultNo.style.backgroundColor = "#0b1d59";
    });

    resultNo.addEventListener("mouseout", () => {
      resultNo.style.backgroundColor = "#334da0";
    });

    resultDiv.appendChild(resultNo);

    let confirmClose = document.createElement("span");
    confirmClose.classList.add("confirmClose");
    confirmClose.innerHTML = " x ";

    confirmClose.onclick = function() {
      myConfirmMainDiv.style.animation = "goAway 0.4s forwards";
      setTimeout(function() {
        confirmBackground.remove();
        myConfirmMainDiv.remove();
        resolve(confirmed);
      }, 400)
    };

    confirmClose.addEventListener("mouseover", () => {
      confirmClose.style.backgroundColor = "red";
    });

    confirmClose.addEventListener("mouseout", () => {
      confirmClose.style.backgroundColor = "#777";
    });

    myConfirmMainDiv.appendChild(confirmClose);
    myConfirmMainDiv.appendChild(resultDiv);
    document.body.prepend(myConfirmMainDiv);
  });
}




function capitalizeFirstLetters(sentence) {
  const words = sentence.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  const result = capitalizedWords.join(' ');

  return result.trim();
}






