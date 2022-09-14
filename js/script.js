const resposta = document.querySelector("#res");
const inputPeso = document.querySelector("#peso");
const inputAltura = document.querySelector("#altura");
const selectUnidadeMassa = document.querySelector("#unidadeMassa");
const selectUnidadeAltura = document.querySelector("#unidadeAltura");

const NaNError =
  "Erro: Não foi digitado peso ou altura corretamente! Digite somente números!";

const BlankError =
  "Erro: O campo peso e/ou altura ficou em branco! Digite os valores!";

const calculateIMC = (weight, height) => {
  return (weight / Math.pow(height, 2)).toFixed(2);
};

const convertHeightToMeters = (height, unit) => {
  let result = height;
  switch (unit) {
    case "centimetro":
      result /= 100;
      break;
    case "polegada":
      result *= 2.54;
      result /= 100;
      break;
    case "pe":
      result *= 12;
      result *= 2.54;
      result /= 100;
      break;
    default:
      result = height;
  }
  result = result.toFixed(2);
  return result;
};

const convertWeightToKilograms = (weight, unit) => {
  let result = weight;
  switch (unit) {
    case "grama":
      result /= 1000;
      break;
    case "libra":
      result *= 454;
      result /= 1000;
      break;
    default:
      result = weight;
  }
  result = result.toFixed(2);
  return result;
};

const checkIMC = () => {
  let peso = Number(inputPeso.value.replace(",", "."));
  peso = convertWeightToKilograms(peso, selectUnidadeMassa.value);
  let altura = Number(inputAltura.value.replace(",", "."));
  altura = convertHeightToMeters(altura, selectUnidadeAltura.value);
  if (Number.isNaN(peso) || Number.isNaN(altura)) {
    showError(NaNError);
  } else if (peso == "" || altura == "") {
    showError(BlankError);
  } else {
    let imc = calculateIMC(peso, altura);
    let valor = `O valor do IMC é ${imc.toLocaleString("pt-br")}`;
    let grau = "";
    if (imc <= 18.5) {
      grau = `Abaixo do peso`;
    } else if (imc <= 24.9) {
      grau = `Peso normal`;
    } else if (imc <= 29.9) {
      grau = `Sobrepeso`;
    } else if (imc <= 34.9) {
      grau = `Obesidade grau I`;
    } else if (imc <= 39.9) {
      grau = `Obesidade grau II`;
    } else {
      grau = `Obesidade grau III`;
    }
    let ideal = "";
    if (!(imc >= 18.5 && imc <= 24.9)) {
      let [min, max] = calculateIdealMass(altura);
      ideal = `Seu peso ideal está entre ${min} kg e ${max} kg`;
    }

    hideError();
    resposta.innerHTML = `${valor}<br>${grau}<br>${ideal}`;
  }
};

const cleanAll = () => {
  hideError();
  resposta.innerHTML = "";
  inputPeso.innerHTML = "";
  inputAltura.innerHTML = "";
  console.clear();
};

const showError = (error) => {
  console.error(error);
  resposta.innerHTML = error;
  resposta.classList.add("erro");
};

const hideError = () => {
  resposta.classList.remove("erro");
};

const calculateIdealMass = (height) => {
  let idealTaxes = [18.5, 24.9];
  let minimumMass = Number(idealTaxes[0] * Math.pow(height, 2)).toFixed(2);
  let maximumMass = Number(idealTaxes[1] * Math.pow(height, 2)).toFixed(2);
  return [minimumMass, maximumMass];
};

document.querySelector("#btnReset").addEventListener("click", () => cleanAll());
document
  .querySelector("#btnCalcular")
  .addEventListener("click", () => checkIMC());
