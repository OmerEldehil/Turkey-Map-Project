

let aElement = document.querySelectorAll("ul a");
console.log(aElement)
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



let informations = document.getElementById("informations");
let studentsCount = 0;
let mezunStudentsCount = 0;
allStudents.forEach(city => {
    console.log(city)
    city.value.forEach(student => {
        ++studentsCount;
        if(student.hisClass === "Mezun") {
            mezunStudentsCount++;
        }
    })
})
informations.innerHTML = `Toplam ${allStudents.length} İlde ${studentsCount} Öğrenci Vardır<br>-${studentsCount - mezunStudentsCount} Okuyan Öğrenci<br>-${mezunStudentsCount} Mezun Öğrenci<br>Not: Aşağıdaki İstatistiklerde Mezun Öğrenciler Dahil Değildir.`;


(async function() {
    const classFirst = [];
    const classOne = [];
    const classTwo = [];
    const classThree = [];
    const classFour = [];
    const classFive = [];
    const classSix = [];
    const classGraduate = [];

    allStudents.forEach((city) => {
        city.value.forEach((student) => {
            if(student.hisClass === "Hazırlık") {
                classFirst.push(student);
            } else if(student.hisClass === "1") {
                classOne.push(student);
            } else if(student.hisClass === "2") {
                classTwo.push(student);
            } else if(student.hisClass === "3") {
                classThree.push(student);
            } else if(student.hisClass === "4") {
                classFour.push(student);
            } else if(student.hisClass === "5") {
                classFive.push(student);
            } else if(student.hisClass === "6") {
                classSix.push(student);
            } else if(student.hisClass === "Mezun") {
                classGraduate.push(student);
            }
        })
    })

    const chart = new Chart( 
        document.getElementById('classCanvas'),
        {
        type: 'bar',
        data: {
            labels: ["Hazırlık", "1", "2", "3", "4", "5", "6", "Mezun"],
            datasets: [
            {
                label: 'Sınıfta Bulunan Öğrenci Sayısı',
                data: [classFirst.length, classOne.length, classTwo.length, classThree.length, classFour.length, classFive.length, classSix.length, classGraduate.length],
                backgroundColor: [
                    '#970800aa'
                ],
                borderColor: [
                    '#970800'
                ],
                borderWidth: 1,
            }
            ]
        }
        }
    );

    document.getElementById('classCanvas').onclick = function(evt) {
        const activePoints = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = chart.data.labels[firstPoint.index];
            const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            console.log(`Basılan Sınıf: ${label}, Bulunan Öğrenci Sayısı: ${value}`);
            
            const classChartDiv = document.getElementById("classChartDiv");
            const showButton = classChartDiv.querySelector(".tableIcon svg");
            showButton.style.visibility = "visible";

            const tableIcon = showButton.parentElement;
            tableIcon.style.borderRadius = "10px 10px 0 0"

            const span = showButton.previousElementSibling;
            if(label === "Hazırlık") {
                span.innerHTML = `Hazırlık Sınıfı Öğrenci Listesi`;
            } else if(label === "Mezun") {
                span.innerHTML = `Mezun Öğrenci Listesi`;
            } else {
                span.innerHTML = `${label}. Sınıf Öğrenci Listesi`;
            }

            const classTableInfo = classChartDiv.querySelector(".tableInfo");

            const tbody = classTableInfo.firstElementChild.lastElementChild;
            tbody.innerHTML = '';
            let studentCount = 1;
            allStudents.forEach(city => {
                city.value.forEach((student) => {
                    if(student.hisClass === label) {
                        const tr = document.createElement("tr");
    
                        const tdNo = document.createElement("td");
                        tdNo.innerHTML = `${studentCount}`;
                        ++studentCount;
                        tr.appendChild(tdNo);
    
                        const tdName = document.createElement("td");
                        tdName.innerHTML = `${student.name}`;
                        tr.appendChild(tdName);
    
                        const tdUniversity = document.createElement("td");
                        tdUniversity.innerHTML = `${student.university}`;
                        tr.appendChild(tdUniversity);
    
                        const tdMajor = document.createElement("td");
                        tdMajor.innerHTML = `${student.major}`;
                        tr.appendChild(tdMajor);

                        const tdcity = document.createElement("td");

                        

                        citiesInformation.forEach(ele => {
                            if(ele.cityId === city.key) {
                                if(merkezlerInformation[0].value.includes(city.key)) {
                                    tdcity.innerHTML = `${ele.cityName}(Vakıf var)`;
                                    tr.appendChild(tdcity);
                                } else if(merkezlerInformation[1].value.includes(city.key)) {
                                    tdcity.innerHTML = `${ele.cityName}(Temsilcilik var)`;
                                    tr.appendChild(tdcity);
                                } else if(merkezlerInformation[2].value.includes(city.key)) {
                                    tdcity.innerHTML = `${ele.cityName}(Kulup var)`;
                                    tr.appendChild(tdcity);
                                } else {
                                    tdcity.innerHTML = `${ele.cityName}`;
                                    tr.appendChild(tdcity);
                                }
                            }
                        });
    
    
                        const tdTel = document.createElement("td");
                        tdTel.innerHTML = `${student.phone}`;
                        tr.appendChild(tdTel);
    
                        const tdHomeland = document.createElement("td");
                        tdHomeland.innerHTML = `${student.homeland}`;
                        tr.appendChild(tdHomeland);
    
                        tbody.appendChild(tr);
                    }
                })
            })

            classTableInfo.style.height = "auto";
            showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;



            tableIcon.onclick = function() {
                if(window.getComputedStyle(classTableInfo).getPropertyValue('height') === "0px") {
                    classTableInfo.style.height = "auto";
                    showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                } else {
                    classTableInfo.style.height = "0";
                    showButton.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                }
            }
        }
    };
})();




(async function() {
    const vakif = [];
    const temsilcilik = [];
    const HicBiri = [];

    allStudents.forEach((city) => {

        merkezlerInformation


        citiesInformation.forEach(ele => {
            if(ele.cityId === city.key) {
                city.value.forEach((student) =>{
                    if(student.hisClass !== "Mezun") {
                        if(merkezlerInformation[0].value.includes(city.key)) {
                            vakif.push({il: ele.cityName, ogrenci: student});
                        } else if(merkezlerInformation[1].value.includes(city.key)) {
                            temsilcilik.push({il: city.key, ogrenci: student});
                        } else {
                            // HicBiri.push(student);
                            HicBiri.push({il: city.key, ogrenci: student});
                        }
                    }
                })
            }
        })
    })

    console.log(vakif)
    console.log(HicBiri)

    const chart = new Chart( 
        document.getElementById('merkezlerCanvas'),
        {
        type: 'bar',
        data: {
            labels: ["Vakıf", "Temsilcilik", "Hiç Biri"],
            datasets: [
            {
                label: 'Öğrenci Sayısı',
                data: [vakif.length, temsilcilik.length, HicBiri.length],
                backgroundColor: [
                    '#7c560faa'
                ],
                borderColor: [
                    '#7c560f'
                ],
                borderWidth: 1,
            }
            ]
        }
        }
    );

    document.getElementById('merkezlerCanvas').onclick = function(evt) {
        const activePoints = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = chart.data.labels[firstPoint.index];
            const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            console.log(`Basılan tip: ${label}, Bulunan Öğrenci Sayısı: ${value}`);
            
            const merkezlerChartDiv = document.getElementById("merkezlerChartDiv");
            const showButton = merkezlerChartDiv.querySelector(".tableIcon svg");
            showButton.style.visibility = "visible";

            const tableIcon = showButton.parentElement;
            tableIcon.style.borderRadius = "10px 10px 0 0";

            const span = showButton.previousElementSibling;
            if(label === "Vakıf") {
                span.innerHTML = `Vakıfın Bulunduğu İlde Bulunan Öğrenci Listesi`;
            } else if(label === "Temsilcilik") {
                span.innerHTML = `Temsilciliğin Bulunduğu İlde Bulunan Öğrenci Listesi`;
            } else if(label === "Hiç Biri"){
                span.innerHTML = `Merkezin Olmadığı İlde Bulunan Öğrenci Listesi`;
            }

            const merkezlerTableInfo = merkezlerChartDiv.querySelector(".tableInfo");

            const tbody = merkezlerTableInfo.firstElementChild.lastElementChild;
            tbody.innerHTML = '';
            let studentCount = 1;
            const studentsToDisplay = label === 'Vakıf' ? vakif : label === 'Temsilcilik' ? temsilcilik : HicBiri;

            studentsToDisplay.forEach(student => {
                console.log(student)
                const tr = document.createElement("tr");

                const tdNo = document.createElement("td");
                tdNo.innerHTML = `${studentCount}`;
                ++studentCount;
                tr.appendChild(tdNo);

                const tdName = document.createElement("td");
                tdName.innerHTML = `${student.ogrenci.name}`;
                tr.appendChild(tdName);

                const tdUniversity = document.createElement("td");
                tdUniversity.innerHTML = `${student.ogrenci.university}`;
                tr.appendChild(tdUniversity);

                const tdMajor = document.createElement("td");
                tdMajor.innerHTML = `${student.ogrenci.major}`;
                tr.appendChild(tdMajor);

                const tdcity = document.createElement("td");
                tdcity.innerHTML = `${student.il}`;
                tr.appendChild(tdcity);

                const tdTel = document.createElement("td");
                tdTel.innerHTML = `${student.ogrenci.phone}`;
                tr.appendChild(tdTel);

                const tdHomeland = document.createElement("td");
                tdHomeland.innerHTML = `${student.ogrenci.homeland}`;
                tr.appendChild(tdHomeland);

                tbody.appendChild(tr);
            });


            merkezlerTableInfo.style.height = "auto";
            showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;

            tableIcon.onclick = function() {
                if(window.getComputedStyle(merkezlerTableInfo).getPropertyValue('height') === "0px") {
                    merkezlerTableInfo.style.height = "auto";
                    showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                } else {
                    merkezlerTableInfo.style.height = "0";
                    showButton.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                }
            }
        }
    };
})();




(async function() {
    const bursAlanlar = [];
    const bursAlmayanlar = [];

    allStudents.forEach((city) => {
        city.value.forEach((student) => {
            if(student.hisClass !== "Mezun") {
                if(student.burs === "Evet") {
                    bursAlanlar.push(student);
                } else {
                    bursAlmayanlar.push(student);
                }
            }
        });
    });

    const bursChart = new Chart( 
        document.getElementById('bursCanvas'),
        {
            type: 'doughnut',
            data: {
                labels: [`Burs Alanlar (${bursAlanlar.length})`, `Burs Almayanlar (${bursAlmayanlar.length})`],
                datasets: [{
                    label: 'Öğrenci Sayısı',
                    data: [bursAlanlar.length, bursAlmayanlar.length],
                    backgroundColor: [
                        '#ffa600', 
                        '#58508d'  
                    ],
                    borderWidth: 1
                }]
            },
        }
    );

    document.getElementById('bursCanvas').onclick = function(evt) {

        const activePoints = bursChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = bursChart.data.labels[firstPoint.index];
            const value = bursChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];


            console.log(`Tip: ${label}, Sayı: ${value}`);

            const bursChartDiv = document.getElementById("bursChartDiv");
            const showButton = bursChartDiv.querySelector(".tableIcon svg");
            showButton.style.visibility = "visible";

            const tableIcon = showButton.parentElement;
            tableIcon.style.borderRadius = "10px 10px 0 0"

            const span = showButton.previousElementSibling;
            if(label.includes("Burs Alanlar")) {
                span.innerHTML = "Burs Alan Öğrenci Listesi";
            } else {
                span.innerHTML = "Burs Almayan Öğrenci Listesi";
            }

            const bursTableInfo = bursChartDiv.querySelector(".tableInfo");

            const tbody = bursTableInfo.firstElementChild.lastElementChild;
            tbody.innerHTML = '';
            let studentCount = 1;

            allStudents.forEach(city => {
                city.value.forEach((student) => {
                    let bursAliyormu = student.burs === "Evet" ? "Burs Alanlar" : "Burs Almayanlar";
                    if(label.includes(bursAliyormu)) {
                        const tr = document.createElement("tr");

                        const tdNo = document.createElement("td");
                        tdNo.innerHTML = `${studentCount}`;
                        ++studentCount;
                        tr.appendChild(tdNo);
        
                        const tdName = document.createElement("td");
                        tdName.innerHTML = `${student.name}`;
                        tr.appendChild(tdName);
        
                        const tdUniversity = document.createElement("td");
                        tdUniversity.innerHTML = `${student.university}`;
                        tr.appendChild(tdUniversity);
        
                        const tdMajor = document.createElement("td");
                        tdMajor.innerHTML = `${student.major}`;
                        tr.appendChild(tdMajor);
        
                        const tdcity = document.createElement("td");


                        citiesInformation.forEach(ele => {
                            if(ele.cityId === city.key) {
                                if(merkezlerInformation[0].value.includes(city.key)) {
                                    tdcity.innerHTML = `${ele.cityName}(Vakıf var)`;
                                    tr.appendChild(tdcity);
                                } else if(merkezlerInformation[1].value.includes(city.key)) {
                                    tdcity.innerHTML = `${ele.cityName}(Temsilcilik var)`;
                                    tr.appendChild(tdcity);
                                } else if(merkezlerInformation[2].value.includes(city.key)) {
                                    tdcity.innerHTML = `${ele.cityName}(Kulup var)`;
                                    tr.appendChild(tdcity);
                                } else {
                                    tdcity.innerHTML = `${ele.cityName}`;
                                    tr.appendChild(tdcity);
                                }
                            }
                        });
                        
                        const tdTel = document.createElement("td");
                        tdTel.innerHTML = `${student.phone}`;
                        tr.appendChild(tdTel);
        
                        const tdHomeland = document.createElement("td");
                        tdHomeland.innerHTML = `${student.homeland}`;
                        tr.appendChild(tdHomeland);
        
                        tbody.appendChild(tr);
                    }
                })
            })

            bursTableInfo.style.height = "auto";
            showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
            tableIcon.onclick = function() {
                if(window.getComputedStyle(bursTableInfo).getPropertyValue('height') === "0px") {
                    bursTableInfo.style.height = "auto";
                    showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                } else {
                    bursTableInfo.style.height = "0";
                    showButton.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                }
            }
        }
    };

})();





(async function() {
    const genclerEvet = [];
    const genclerHayir = [];

    allStudents.forEach((city) => {
        city.value.forEach((student) => {
            if(student.hisClass !== "Mezun") {
                if(student.gencDavetci === "Evet") {
                    genclerEvet.push(student);
                } else {
                    genclerHayir.push(student);
                }
            }
        });
    });

    const genclerChart = new Chart( 
        document.getElementById('genclerCanvas'),
        {
            type: 'doughnut',
            data: {
                labels: [`Katılabilen Öğrenciler (${genclerEvet.length})`, `Katılamaz Öğrenciler (${genclerHayir.length})`],
                datasets: [{
                    label: 'Öğrenci Sayısı',
                    data: [genclerEvet.length, genclerHayir.length],
                    backgroundColor: [
                        '#3399FF',
                        '#FF5733'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                // responsiveFontSize: 10 // حجم الخط المطلوب على الهواتف
            }
        }
    );

    document.getElementById('genclerCanvas').onclick = function(evt) {
        const activePoints = genclerChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, false);
        const firstPoint = activePoints[0];
        
        if (firstPoint) {
            const label = genclerChart.data.labels[firstPoint.index];
            const value = genclerChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
    
            console.log(`Tip: ${label}, Sayı: ${value}`);
    
            const genclerChartDiv = document.getElementById("genclerChartDiv");
            const showButton = genclerChartDiv.querySelector(".tableIcon svg");
            showButton.style.visibility = "visible";
    
            const tableIcon = showButton.parentElement;
            tableIcon.style.borderRadius = "10px 10px 0 0"
    
            const span = showButton.previousElementSibling;
            if(label.includes("Katılabilen")) {
                span.innerHTML = "Gen. Dav. Prog. Katılabilen Öğrenci Listesi";
            } else {
                span.innerHTML = "Gen. Dav. Prog. Katılamaz Öğrenci Listesi";
            }


            const genclerTableInfo = genclerChartDiv.querySelector(".tableInfo");

            const tbody = genclerTableInfo.firstElementChild.lastElementChild;
            tbody.innerHTML = '';
            let studentCount = 1;

            allStudents.forEach(city => {
                city.value.forEach((student, index) => {
                    let katilabilirmi = student.gencDavetci === "Evet" ? "Katılabilen" : "Katılamaz";
                    if(label.includes(katilabilirmi)) {
                        let il = "";
                        citiesInformation.forEach(ele => {
                            if(ele.cityId === city.key) {
                                if(merkezlerInformation[0].value.includes(city.key)) {
                                    il = `${ele.cityName}(Vakıf var)`;
                                } else if(merkezlerInformation[1].value.includes(city.key)) {
                                    il = `${ele.cityName}(Temsilcilik var)`;
                                } else {
                                    il = `${ele.cityName}`;
                                }
                            }
                        });
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${studentCount}</td>
                            <td>${student.name}</td>
                            <td>${student.university}</td>
                            <td>${student.major}</td>
                            <td>${il}</td>
                            <td>${student.phone}</td>
                            <td>${student.homeland}</td>
                        `;
                        ++studentCount;
                        tbody.appendChild(row);                        
                    }
                })
            })

            genclerTableInfo.style.height = "auto";
            showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
            tableIcon.onclick = function() {
                if(window.getComputedStyle(genclerTableInfo).getPropertyValue('height') === "0px") {
                    genclerTableInfo.style.height = "auto";
                    showButton.innerHTML = `<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM224 160c6.7 0 13 2.8 17.6 7.7l104 112c6.5 7 8.2 17.2 4.4 25.9s-12.5 14.4-22 14.4H120c-9.5 0-18.2-5.7-22-14.4s-2.1-18.9 4.4-25.9l104-112c4.5-4.9 10.9-7.7 17.6-7.7z"/>`;
                } else {
                    genclerTableInfo.style.height = "0";
                    showButton.innerHTML = `<path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/>`;
                }
            }
        }
    };
    

})();









function capitalizeFirstLetters(sentence) {
    return sentence.trim().split(' ').map(function(word) {
      return word.charAt(0) === "i" ? "İ" + word.slice(1).toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }

