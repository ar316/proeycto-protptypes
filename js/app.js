
const selecYear = document.querySelector('#year');
const formulario = document.querySelector('#cotizar-seguro'); 
//constructores

function CarInsurance  (marca, year, type){
    this.marca = marca,
    this.year = year,
    this.type = type
}

CarInsurance.prototype.CalulateInsurance = function(){
    let total = 0;
    let base = 2000;
    
    switch(this.marca){
        case '1': 
        cantidad =base*1.15;
        break;
        case '2': 
        cantidad =base*1.05;
        break;
        case '3':  
        cantidad =base*1.35;
        break;
        default:
            break;
    }

    //leer el año
    const diferencia = new Date().getFullYear() - this.year;
    cantidad = cantidad * (diferencia*0.3);
    console.log(cantidad)
   
}

function UI (){
}
//fill the comob with years 
UI.prototype.addYears = function(){
    const years = new Date().getFullYear();
    const year = years-20;
    for(let i= years; i > year; i--){
        const yearhtml = document.createElement('option')
        yearhtml.value = i;
        yearhtml.textContent = i;
        selecYear.appendChild(yearhtml); 

    }
}

UI.prototype.MostrarMensaje = function(Mensaje, tipoMensaje){
    const div = document.createElement('div');
    if(tipoMensaje === "error"){
        div.classList.add('error', 'mensaje');
        setTimeout(() => {
            formulario.removeChild(div);
        }, 2000);
    }else{
        div.classList.add('mensaje', 'correcto');
    }
    div.textContent = Mensaje;
    formulario.appendChild(div);

}

const y = new UI();


document.addEventListener('DOMContentLoaded', ()=>{
    y.addYears();
    formulario.addEventListener('submit',validarFormuluario);
});


function validarFormuluario(e){
    e.preventDefault();
    const form = e.target;
   const marca  = form.querySelector('#marca').value;
   const year = form.querySelector('#year').value;
   // Seleccionar el radio button "Básico"
    var radioBasico = form.querySelector('input[name="tipo"][value="basico"]');
    const basico = radioBasico.checked ? true: false;
    // Seleccionar el radio button "Completo"
    var radioCompleto = form.querySelector('input[name="tipo"][value="completo"]');
    const completo = radioCompleto.checked ? true : false;

    //seleccionando el tipo con un selector de css 
    // const tipo= document.querySelector( input [name="tipo"]:checked').value;

    let tipo ="";
    if (marca === "") {
        y.MostrarMensaje("por favor seleccione todos los campos", "error")
        
        return;
    } else if (completo) {
        tipo = radioCompleto.value      
    } else if (basico) {
        tipo = radioBasico.value
    }
    y.MostrarMensaje("cotizando...", "correcto")

    const insuranceCar = new CarInsurance(marca,year,tipo);
    console.log(insuranceCar);
    insuranceCar.CalulateInsurance();
   
    
}