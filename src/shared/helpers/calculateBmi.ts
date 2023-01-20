import {SexEnum} from "../enums/sex.enum";
import {bmiagerev} from "./bmiagerev.const";

export interface ICalculateBmiAdultParams {
  weight: number;
  height: number;
}

export interface ICalculateBmiZ {
  weight: number;
  height: number;
  sex: SexEnum;
  age: number;
}

const BMIAdult = (params: ICalculateBmiAdultParams) => {
  const {height, weight} = params;
  return weight / (height * height)
}

// BMIZscore calculates the body-mass-index z-score for a person older than 2
// years old and younger than 20 years old given their weight in kilograms,
// height in meters, age in months, and sex.
const BMIZscore = (params: ICalculateBmiZ) => {
  const {height, weight, sex, age} = params;
  if (age < 24 || age >= 240) {
    throw new Error('age must be between 24 and 240')
  }

  const bmi = BMIAdult({weight, height})

  const bmiPerAgeArray = parseBmiForAge();
  const bmiForAge = getBmiForAge(sex, age, bmiPerAgeArray)
  const {L, M, S} = bmiForAge;

  // See https://www.cdc.gov/nccdphp/dnpao/growthcharts/resources/sas.htm
  // Z = [ ((value / M)**L) – 1] / (S * L)
  return (Math.pow(bmi / M, L) - 1) / (S * L)
}

// bmiForAge is an object which wraps a multi-level map from
// Sex => HalfMonths => (L, M, S) values. These are parsed from bimagerev.
//
// The .data JSON looks like something like this:
//   { 1: {48: {"L": -2.01118107, "M": 16.57502768, "S" 0.080592465], ... }
//
// If you want the LMS values for a 24 month olds boy, you would write:
//   let {L,M,S} = bmiForAge.Get(Sex.Male, 24)

const parseBmiForAge = () => {
  return bmiagerev.split('\n').reduce((bmiForAge: any, line, lineno) => {
    if (line === '') {
      // skip blank lines
      return bmiForAge
    }

    let [sex, agemos, l, m, s] = line.split(',')

    if (sex === 'Sex') {
      // skip header
      return bmiForAge
    }

    const sexParsed: SexEnum = sex === '1' ? SexEnum.MALE : SexEnum.FEMALE

    bmiForAge[sexParsed][parseFloat(agemos)] = {
      L: parseFloat(l),
      M: parseFloat(m),
      S: parseFloat(s)
    }

    return bmiForAge
  })
}

const getBmiForAge = (sex: SexEnum, age: number, bmiPerAgeArray: any) => {
  if (age === 24) {
    return bmiPerAgeArray.data[sex][24]
  }

  const adjusted = age + 0.5
  return bmiPerAgeArray.data[sex][adjusted]
}

export {
  BMIAdult,
  BMIZscore
}
