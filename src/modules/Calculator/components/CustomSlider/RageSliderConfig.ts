export interface IRangeSliderConfig {
  id: string,
  min: number,
  max: number,
  clName: string,
  secondaryClName?: string;
  text: string,
  unit: string;
}


export const RangeSliderConfig: IRangeSliderConfig[] = [
  {
    id: "pressure",
    min: 100,
    max: 150,
    clName: "rangeSlider",
    secondaryClName: 'pressure',
    text: "optimal range for systolic blood pressure",
    unit: 'mmHg'
  },
  {
    id: "hdl",
    min: 30,
    max: 100,
    clName: "rangeSlider",
    secondaryClName: 'hdl',
    text: "optimal range for HDL",
    unit: 'mg/dL'
  },
  {
    id: "trigl",
    min: 50,
    max: 400,
    clName: "rangeSlider",
    secondaryClName: 'trigl',
    text: "optimal range for triglycerides",
    unit: 'mg/dL'
  },
  {
    id: "glucose",
    min: 50,
    max: 160,
    clName: "rangeSlider",
    secondaryClName: 'glucose',
    text: "optimal range for fasting glucose",
    unit: 'mg/dL'
  },
  {
    id: "weight",
    min: 100,
    max: 300,
    clName: "rangeSlider",
    secondaryClName: 'weight',
    text: "",
    unit: 'Lbs'
  },
  {
    id: "diastolicBP",
    min: 60,
    max: 100,
    clName: "rangeSlider",
    secondaryClName: 'diastolicBP',
    text: "optimal range for diastolic blood pressure",
    unit: 'mmHg'
  },
  {
    id: "a1c",
    min: 3.4,
    max: 7.2,
    clName: "rangeSlider",
    secondaryClName: "a1c",
    text: "optimal range for average a1c",
    unit: "%"
  },
  {
    id: "waist",
    min: 15,
    max: 60,
    clName: "rangeSlider",
    secondaryClName: "weight",
    text: "",
    unit: "in"
  },
];
