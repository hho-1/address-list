const isim = document.getElementById("isim")
const soyIsim = document.getElementById("soyisim")
const phoneNumber = document.getElementById("phoneNumber")
const eMail = document.getElementById("exampleInputEmail1")
const form = document.getElementById("form-rehber")
const table = document.querySelector(".table")
const saveButton = document.getElementById("submitBtn")
const peopleList = document.querySelector(".people-list")

const allPeopleArray = []

form.addEventListener('submit', save)
peopleList.addEventListener('click', doPersonOperations)


let chosenRow = undefined;


function save(e){
    e.preventDefault();
    
    const personWillBeAddedorEdited = {
        ad: isim.value,
        soyad: soyIsim.value,
        phone: phoneNumber.value,
        mail: eMail.value
    }
    
    const result = dataControl(personWillBeAddedorEdited)

    if(result.status){
        if(chosenRow){
            editPerson(personWillBeAddedorEdited)
        }
        else{
            addPerson(personWillBeAddedorEdited)
        }
        
    }
    else{
        createInfo(result.message, result.status)
    
    }

}

function addPerson(person){
    const createdTR = document.createElement('tr')
    createdTR.innerHTML = `
    <td>${person.ad}</td>
    <td>${person.soyad}</td>
    <td>${person.phone}</td>
    <td>${person.mail}</td>
    <td>
        <button class="btn-edit" type="button"><i class="fa-regular fa-pen-to-square text-success"></i></button>
        <button class="btn-delete" type="button"><i class="fa-regular fa-trash-can text-danger"></i></button>
    </td>
    
    `
    peopleList.appendChild(createdTR)

    allPeopleArray.push(person)
    createInfo('Saved successfully!', true)
    console.log(allPeopleArray);
}

function dataControl(person){
    //Objelerde in kullanimi

    for(const value in person){
        
        if(person[value]){
            
        }
        else{
            
            return {
                status: false,
                message: 'All blank areas should be filled!'
            }
            
        }
        
    }
    clearInputs()
    return{
        status: true,
        message: 'Saved successfully !'
    }
}
function createInfo(meesage, status){
    const info = document.createElement('p')
    info.textContent = meesage
    info.className = 'bilgi text-center'
    
    info.classList.add(status ? 'text-success' : 'text-danger')
    
    const blank = document.createElement('br')
    form.insertAdjacentElement('afterend', blank)
    blank.insertAdjacentElement('afterend', info)

    setTimeout(function(){
        const infoWillBeDeleted = document.querySelector('.bilgi')

        if(infoWillBeDeleted){
            infoWillBeDeleted.remove()
            blank.remove()
        }
    },2000)
}

function clearInputs(){
    isim.value = ''
    soyIsim.value = ''
    phoneNumber.value = ''
    eMail.value = ''
}

function doPersonOperations(event){

    if(event.target.classList.contains('fa-trash-can')){
        
        const TrElementWilBeDeleted = event.target.parentElement.parentElement.parentElement
        const mailWillBeDeleted = event.target.parentElement.parentElement.previousElementSibling.textContent

        deletePerson(TrElementWilBeDeleted, mailWillBeDeleted)
    }
    else if(event.target.classList.contains('fa-pen-to-square')){
        
        saveButton.textContent = "Edit"
        const chosenTR = event.target.parentElement.parentElement.parentElement
        const mailWillBeEdited = chosenTR.cells[2].textContent

        isim.value = chosenTR.cells[0].textContent
        soyIsim.value = chosenTR.cells[1].textContent
        phoneNumber.value = chosenTR.cells[2].textContent
        eMail.value = chosenTR.cells[3].textContent

        chosenRow = chosenTR;
        //editPerson()
    }
}

function deletePerson(TRElementWillBeRemoved, mailWillBeDeleted){
    
    allPeopleArray.forEach((person, index) => {
        if(person.mail === mailWillBeDeleted){
            allPeopleArray.splice(index, 1)
        }
    });

    TRElementWillBeRemoved.remove()
    console.log(allPeopleArray);

    clearInputs()

    /* 
    2nd way
    
    const stayingPeopleList = allPeopleArray.filter((person, index) => {
        return person.mail !== mailWillBeDeleted
    })

    allPeopleArray.length = 0;
    allPeopleArray.push(...stayingPeopleList) */
}

function editPerson(person){
    
    for(let i = 0; i< allPeopleArray.length; i++){
        if(allPeopleArray[i].mail === chosenRow.cells[3].textContent){
            allPeopleArray[i] = person;
            break;
        }
    }
    
    chosenRow.cells[0].textContent = person.ad
    chosenRow.cells[1].textContent = person.soyad
    chosenRow.cells[2].textContent = person.phone
    chosenRow.cells[3].textContent = person.mail

    saveButton.textContent = "Save"
    chosenRow = undefined;
}