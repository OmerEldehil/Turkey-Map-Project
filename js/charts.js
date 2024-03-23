

if (window.matchMedia("(min-width: 768px)").matches) {
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
  if(key !== "allUniversities") {
      var value = JSON.parse(localStorage.getItem(key));
      allStudents.push({ key: key, value: value });
  }
}

console.log(allStudents);







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
        console.log(city)
        city.value.forEach((student) => {
            console.log(student)
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

    new Chart( 
        document.getElementById('acquisitions'),
        {
        type: 'bar',
        data: {
            labels: ["Hazırlık", "1", "2", "3", "4", "5", "6", "Mezun"],
            datasets: [
            {
                label: 'Sınıfta Bulunan Öğrenci Sayısı',
                data: [classFirst.length, classOne.length, classTwo.length, classThree.length, classFour.length, classFive.length, classSix.length, classGraduate.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }
            ]
        }
        }
    );
})();



