/*! SVG Türkiye Haritası | MIT Lisans | dnomak.com */
svgturkiyeharitasi();
function svgturkiyeharitasi() {
  const element = document.querySelector('#svg-turkiye-haritasi');
  const pathElements = document.querySelectorAll("path");
  const info = document.querySelector('.il-isimleri');

  element.addEventListener(
    'mouseover',
    function (event) {
      if (event.target.tagName === 'path') {
        info.innerHTML = [
          '<div>',
          event.target.parentNode.getAttribute('data-iladi'),
          '</div>'
        ].join('');
      }
    }
  );

  element.addEventListener(
    'mousemove',
    function (event) {
      info.style.top = event.pageY + 25 + 'px';
      info.style.left = event.pageX + 'px';
    }
  );

  element.addEventListener(
    'mouseout',
    function () {
      info.innerHTML = '';
    }
  );

  // pathElements.forEach

  element.addEventListener(
    "click",
    function (event) {
      console.log(event)
      console.log(event.target)
      if (event.target.tagName === 'path') {
        let box = document.getElementById("box");

        let currentCities = document.querySelectorAll(".box .il");
        currentCities.forEach((city) => {
          if(event.target.parentNode.getAttribute('id') === city.id) {
            city.remove();
          }
        })




        let il = document.createElement("div");
        il.classList.add("il");
        il.id = `${event.target.parentNode.getAttribute('id')}`;

        let h1 = document.createElement("h1");
        h1.append(`${event.target.parentNode.getAttribute('data-iladi')}`);
        il.appendChild(h1);

        let personList = document.createElement("div");
        personList.classList.add("person-list");

        il.appendChild(personList);

        box.appendChild(il);

        updateList(il.id);
        
        let addBtn = document.createElement("button");
        addBtn.classList.add("add");
        addBtn.innerHTML = "Öğrenci Ekle";
        addBtn.addEventListener("mouseover" , () => {
          addBtn.style.backgroundColor = "#1ea500";
        })
        
        addBtn.addEventListener("mouseout", () => {
          addBtn.style.backgroundColor = "#4ab432";
        })
        addBtn.onclick = function() {
          let promptBackground = document.createElement("div");
          promptBackground.style.cssText = "position: fixed; width: 100%; height: 100vh; z-index: 8; opacity: 0.9; background: rgba(29, 31, 32, 0.904) radial-gradient(rgba(255, 255, 255, 0.712) 10%, transparent 1%); background-size: 11px 11px;";
          document.body.prepend(promptBackground);
        
          let myPromptMainDiv = document.createElement("div");
          myPromptMainDiv.style.cssText = "padding: 45px 30px 30px; position: fixed; width: 450px; top: 60px; left: 50%; transform: translateX(-50%); background-color: #e2ddef; border-radius: 5px; display: flex; flex-direction: column; justify-content: space-around; align-items: center; z-index: 1000; border: 2px solid #121212";
        
          let promptSpan = document.createElement("span");
          promptSpan.innerHTML = "Eklemek İstediğiniz Öğrencinin Adını Giriniz:";
          myPromptMainDiv.appendChild(promptSpan);
        
          let studentNameForm = document.createElement("form");
          studentNameForm.style.cssText = "width: 80%; position: relative; display: flex; flex-wrap: wrap; margin: 20px 0 0; gap: 20px;";
          let studentName = document.createElement("input");
          studentName.style.cssText = "padding: 10px; border-radius: 6px; width: 100%; margin: 0 0 10px;";
          studentName.type = "text";
          studentName.placeholder = "Öğrencinin Adı";
          let studentNameSubmit = document.createElement("input");
          studentNameSubmit.type = "submit";
          studentNameSubmit.value = "Ekle";
          studentNameSubmit.style.cssText = "background-color: #1ea500; color: #e2ddef; padding: 8px 12px; border-radius: 6px; cursor: pointer; border: none; font-size: 16px;";
        
          studentNameSubmit.addEventListener("mouseover" , () => {
            studentNameSubmit.style.backgroundColor = "green";
          })
          studentNameSubmit.addEventListener("mouseout", () => {
            studentNameSubmit.style.backgroundColor = "#1ea500";
          })
          
          studentNameForm.onsubmit = function(event) {
            if(studentName.value !== '') {
              event.preventDefault();
              
              let clickedCityId = document.getElementById(`${addBtn.parentElement.getAttribute('id')}`).id;
              addPersonToLocalStorage(clickedCityId, studentName.value);
              
              promptBackground.remove();
              myPromptMainDiv.remove();
            } else {
              event.preventDefault();
              let erorSpan = document.createElement("span");
              erorSpan.innerHTML = "İsim Alanını Boş Bırakmayınız!";
              erorSpan.style.cssText = `position: absolute; top: 45px; left: 40px; color: red; font-size: 16px;`;
              studentNameForm.appendChild(erorSpan);
            }
          }
        
          studentNameForm.appendChild(studentName);
          studentNameForm.appendChild(studentNameSubmit);
          myPromptMainDiv.appendChild(studentNameForm);
        
        
          let formCancle = document.createElement("span");
          formCancle.innerHTML = "Vazgeç";
          formCancle.style.cssText = "position: absolute; bottom: 0; right: 0; background-color: #334da0; color: #e2ddef; padding: 8px 12px; border-radius: 6px; cursor: pointer;";
          formCancle.addEventListener("click", () => {
            promptBackground.remove();
            myPromptMainDiv.remove();
          })
          formCancle.addEventListener("mouseover" , () => {
            formCancle.style.backgroundColor = "#0b1d59";
          })
          formCancle.addEventListener("mouseout", () => {
            formCancle.style.backgroundColor = "#334da0";
          })
        
          studentNameForm.appendChild(formCancle);
        
        
        
          let promptClose = document.createElement("span");
          promptClose.innerHTML = " x ";
          promptClose.style.cssText = "position: absolute; top: 10px; right: 10px; background-color: #777; color: #e2ddef; padding: 5px 10px; border-radius: 50%; cursor: pointer;";
          promptClose.addEventListener("click", () => {
            promptBackground.remove();
            myPromptMainDiv.remove();
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
        
        il.appendChild(addBtn);

        let ilCloseBtn = document.createElement("button");
        ilCloseBtn.classList.add("ilClose");
        ilCloseBtn.innerHTML = " x ";
        ilCloseBtn.style.cssText = "background-color: #151515; color: #e2ddef; padding:10px; position: absolute; top: 20px; right: 20px; border-radius: 50%; width: 35px; height: 35px; display: flex; justify-content: center; align-items: center; border: 1px solid #222; font-size: 20px;";
        ilCloseBtn.addEventListener("mouseover" , () => {
          ilCloseBtn.style.backgroundColor = "red";
        })
        
        ilCloseBtn.addEventListener("mouseout", () => {
          ilCloseBtn.style.backgroundColor = "#151515";
        })
        ilCloseBtn.onclick = function() {
          il.remove();
        }
        il.appendChild(ilCloseBtn);
        
      }
    }
  )
}


function addPersonToLocalStorage(cityId, personName) {
  console.log(cityId);
  
  let array = JSON.parse(window.localStorage.getItem(cityId)) || [];
  console.log(array);
  array.push(capitalizeFirstLetters(personName));
  console.log(array);
  window.localStorage.setItem(cityId, JSON.stringify(array));
  updateList(cityId); 
}

function updateList(cityId) {
  console.log("updated")
  let cityElement = document.querySelector(`.box #${cityId}`);
  console.log(cityElement)

  let personList = cityElement.querySelector(".person-list");

  if(cityElement !== null) {
    personList.innerHTML = ''; 
  } 

  let array = JSON.parse(window.localStorage.getItem(cityId)) || [];

  if (array.length > 0) {
    array.forEach(person => {
      let personElement = document.createElement("div");
      personElement.classList.add("person");
      personElement.innerHTML = `<span>${person}</span>`;

      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("bin-button");
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
      `
      deleteBtn.onclick = function() {
        console.log(this);
        console.log(this.previousElementSibling);
        console.log(this.parentElement.parentElement.parentElement.getAttribute('id'));

        let confirmBackground = document.createElement("div");
        confirmBackground.style.cssText = "position: fixed; width: 100%; height: 100vh; z-index: 8; opacity: 0.9; background: rgba(29, 31, 32, 0.904) radial-gradient(rgba(255, 255, 255, 0.712) 10%, transparent 1%); background-size: 11px 11px;";
        document.body.prepend(confirmBackground);

        let myConfirmMainDiv = document.createElement("div");
        myConfirmMainDiv.style.cssText = "padding: 45px 30px 30px; position: fixed; width: 450px; top: 60px; left: 50%; transform: translateX(-50%); background-color: #e2ddef; border-radius: 5px; display: flex; flex-direction: column; justify-content: space-around; align-items: center; z-index: 1000; border: 2px solid #121212";
        let confirmSpan = document.createElement("span");


        confirmSpan.innerHTML = `${this.previousElementSibling.innerHTML}'i Silmek Istediğinizden Eminmisiniz?`;
        myConfirmMainDiv.appendChild(confirmSpan);
        let resultDiv = document.createElement("div");
        resultDiv.style.cssText = "width: 100%; display: flex; justify-content: space-around; margin-top: 15px ; "
        let resultYes = document.createElement("span");
        resultYes.innerHTML = "Evet";
        resultYes.style.cssText = "background-color: #ff4a4a; color: #e2ddef; padding: 8px 12px; border-radius: 6px; cursor: pointer;";
        resultYes.addEventListener("click", () => {
          let array = JSON.parse(window.localStorage.getItem(`${this.parentElement.parentElement.parentElement.getAttribute('id')}`));
          let theName = this.previousElementSibling.innerHTML;
          console.log(theName);
          array = array.filter((ele) => ele !== theName);
          window.localStorage.setItem(`${this.parentElement.parentElement.parentElement.getAttribute('id')}`, JSON.stringify(array));
          console.log(array);
          confirmBackground.remove();
          myConfirmMainDiv.remove();
          this.parentElement.remove();
          console.log("sehir bosaldi");
          console.log(personList.children.length)

          if(personList.children.length === 0) {
            console.log("sehire span eklenmeli");
            let noStudentSpan = document.createElement("span");
            noStudentSpan.innerHTML = "Bu Şehirde Bulunan Öğrenci Yoktur";
            personList.appendChild(noStudentSpan);
          }
        })
        resultYes.addEventListener("mouseover" , () => {
          resultYes.style.backgroundColor = "#a80000";
        })
        resultYes.addEventListener("mouseout", () => {
          resultYes.style.backgroundColor = "#ff4a4a";
        })
        resultDiv.appendChild(resultYes);
        let resultNo = document.createElement("span");
        resultNo.innerHTML = "Hayır";
        resultNo.style.cssText = "background-color: #334da0; color: #e2ddef; padding: 8px 12px; border-radius: 6px; cursor: pointer;";
        resultNo.addEventListener("click", () => {
          confirmBackground.remove();
          myConfirmMainDiv.remove();
        })
        resultNo.addEventListener("mouseover" , () => {
          resultNo.style.backgroundColor = "#0b1d59";
        })
        resultNo.addEventListener("mouseout", () => {
          resultNo.style.backgroundColor = "#334da0";
        })
        resultDiv.appendChild(resultNo);
        let confirmClose = document.createElement("span");
        confirmClose.innerHTML = " x ";
        confirmClose.style.cssText = "position: absolute; top: 10px; right: 10px; background-color: #777; color: #e2ddef; padding: 5px 10px; border-radius: 50%; cursor: pointer;";
        confirmClose.addEventListener("click", () => {
          confirmBackground.remove();
          myConfirmMainDiv.remove();
        })
        confirmClose.addEventListener("mouseover" , () => {
          confirmClose.style.backgroundColor = "red";
        })
        confirmClose.addEventListener("mouseout", () => {
          confirmClose.style.backgroundColor = "#777";
        })
        myConfirmMainDiv.appendChild(confirmClose);
        myConfirmMainDiv.appendChild(resultDiv);
        document.body.prepend(myConfirmMainDiv);

      };

      personElement.appendChild(deleteBtn);

      personList.appendChild(personElement);
      
    });
  } else {  
    console.log("kimse yok")
    let noStudentSpan = document.createElement("span");
    noStudentSpan.innerHTML = "Bu Şehirde Bulunan Öğrenci Yoktur";
    personList.appendChild(noStudentSpan);
  }
}



  
function capitalizeFirstLetters(sentence) {
  const words = sentence.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  const result = capitalizedWords.join(' ');

  return result;
}
