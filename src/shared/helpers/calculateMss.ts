import {SexEnum} from "../enums/sex.enum";
import {EthnicityEnum} from "../enums/ethnicity.enum";

export interface ICalculateMssResponse {
  mets_z_bmi?: number;
  mets_z_wc?: number;
}

export interface ICalculateMssParams {
  age: number;
  sex: SexEnum;
  ethnicity: EthnicityEnum;
  bmi?: number;
  hdl: number;
  sbp: number;
  triglyceride: number;
  glucose: number;
  bmiZScore?: number;
  waist?: number;
}


export const calculateMss = (values: ICalculateMssParams): ICalculateMssResponse => {
  const {bmi, bmiZScore, hdl, age, waist, sbp, sex, glucose, ethnicity, triglyceride} = values;
  if (age >= 20) {
    /* Adults */
    if (sex === SexEnum.FEMALE) {
      switch (ethnicity) {
        case EthnicityEnum["NON-HISPANIC-BLACK"]:
          return {
            mets_z_bmi: bmi ? -6.7982 + 0.0484 * bmi - 0.0108 * hdl + 0.0073 * sbp + 0.5278 * Math.log(triglyceride) + 0.0281 * glucose : undefined,
            mets_z_wc: waist ? -7.1913 + 0.0304 * waist - 0.0095 * hdl + 0.0054 * sbp + 0.4455 * Math.log(triglyceride) + 0.0225 * glucose : undefined
          };

        case EthnicityEnum.HISPANIC:
          return {
            mets_z_bmi: bmi ? -7.1844 + 0.0333 * bmi - 0.0166 * hdl + 0.0085 * sbp + 0.8625 * Math.log(triglyceride) + 0.0221 * glucose : undefined,
            mets_z_wc: waist ? -7.7641 + 0.0162 * waist - 0.0157 * hdl + 0.0084 * sbp + 0.8872 * Math.log(triglyceride) + 0.0206 * glucose : undefined
          };

        case EthnicityEnum["NON-HISPANIC-WHITE"]:
          return {
            mets_z_bmi: bmi ? -6.5231 + 0.0523 * bmi - 0.0138 * hdl + 0.0081 * sbp + 0.6125 * Math.log(triglyceride) + 0.0208 * glucose : undefined,
            mets_z_wc: waist ? -7.2591 + 0.0254 * waist - 0.0120 * hdl + 0.0075 * sbp + 0.5800 * Math.log(triglyceride) + 0.0203 * glucose : undefined
          };
        default:
          return {
            mets_z_bmi: bmi ? -7.1844 + 0.0333 * bmi - 0.0166 * hdl + 0.0085 * sbp + 0.8625 * Math.log(triglyceride) + 0.0221 * glucose : undefined,
            mets_z_wc: waist ? -7.7641 + 0.0162 * waist - 0.0157 * hdl + 0.0084 * sbp + 0.8872 * Math.log(triglyceride) + 0.0206 * glucose : undefined
          };
      }
    }
    /* Male */


    switch (ethnicity) {
      case EthnicityEnum["NON-HISPANIC-BLACK"]:
        // Adult Male Black Non-Hispanic
        return {
          mets_z_bmi: bmi ? -4.8134 + 0.0460 * bmi - 0.0233 * hdl + 0.0020 * sbp + 0.5983 * Math.log(triglyceride) + 0.0166 * glucose : undefined,
          mets_z_wc: waist ? -6.3767 + 0.0232 * waist - 0.0175 * hdl + 0.0040 * sbp + 0.5400 * Math.log(triglyceride) + 0.0203 * glucose : undefined
        };

      case EthnicityEnum.HISPANIC:
        // Adult Male Hispanic
        return {
          mets_z_bmi: bmi ? -4.8198 + 0.0355 * bmi - 0.0303 * hdl + 0.0051 * sbp + 0.7835 * Math.log(triglyceride) + 0.0104 * glucose : undefined,
          mets_z_wc: waist ? -5.5541 + 0.0135 * waist - 0.0278 * hdl + 0.0054 * sbp + 0.8340 * Math.log(triglyceride) + 0.0105 * glucose : undefined
        };

      case EthnicityEnum["NON-HISPANIC-WHITE"]:
        // Adult Male White Non-Hispanic
        return {
          mets_z_bmi: bmi ? -4.8316 + 0.0315 * bmi - 0.0272 * hdl + 0.0044 * sbp + 0.8018 * Math.log(triglyceride) + 0.0101 * glucose : undefined,
          mets_z_wc: waist ? -5.4559 + 0.0125 * waist - 0.0251 * hdl + 0.0047 * sbp + 0.8244 * Math.log(triglyceride) + 0.0106 * glucose : undefined
        };
      default:
        return {
          mets_z_bmi: bmi ? -4.8198 + 0.0355 * bmi - 0.0303 * hdl + 0.0051 * sbp + 0.7835 * Math.log(triglyceride) + 0.0104 * glucose : undefined,
          mets_z_wc: waist ? -5.5541 + 0.0135 * waist - 0.0278 * hdl + 0.0054 * sbp + 0.8340 * Math.log(triglyceride) + 0.0105 * glucose : undefined
        };
    }
  }
  /* Adolescents */


  if (sex === SexEnum.FEMALE) {
    switch (ethnicity) {
      case EthnicityEnum["NON-HISPANIC-BLACK"]:
        return {
          mets_z_bmi: bmiZScore ? -3.7145 + 0.5136 * bmiZScore - 0.0190 * hdl + 0.0131 * sbp + 0.4442 * Math.log(triglyceride) + 0.0108 * glucose : undefined
        };

      case EthnicityEnum.HISPANIC:
        return {
          mets_z_bmi: bmiZScore ? -4.7637 + 0.3520 * bmiZScore - 0.0263 * hdl + 0.0152 * sbp + 0.6910 * Math.log(triglyceride) + 0.0133 * glucose : undefined
        };

      case EthnicityEnum["NON-HISPANIC-WHITE"]:
        return {
          mets_z_bmi: bmiZScore ? -4.3757 + 0.4849 * bmiZScore - 0.0176 * hdl + 0.0257 * sbp + 0.3172 * Math.log(triglyceride) + 0.0083 * glucose : undefined
        };
      default:
        return {
          mets_z_bmi: bmiZScore ? -4.7637 + 0.3520 * bmiZScore - 0.0263 * hdl + 0.0152 * sbp + 0.6910 * Math.log(triglyceride) + 0.0133 * glucose : undefined
        }
    }
  }
  /* Male */

  if (!bmiZScore) {
    return {mets_z_bmi: undefined};
  }
  switch (ethnicity) {
    case EthnicityEnum["NON-HISPANIC-BLACK"]:
      return {
        mets_z_bmi: -4.7544 + 0.2401 * bmiZScore - 0.0284 * hdl + 0.0134 * sbp + 0.6773 * Math.log(triglyceride) + 0.0179 * glucose
      };

    case EthnicityEnum.HISPANIC:
      return {
        mets_z_bmi: -3.2971 + 0.2930 * bmiZScore - 0.0315 * hdl + 0.0109 * sbp + 0.6137 * Math.log(triglyceride) + 0.0095 * glucose
      };

    case EthnicityEnum["NON-HISPANIC-WHITE"]:
      return {
        mets_z_bmi: -4.931 + 0.2804 * bmiZScore - 0.0257 * hdl + 0.0189 * sbp + 0.6240 * Math.log(triglyceride) + 0.0140 * glucose
      };
    default:
      return {
        mets_z_bmi: -3.2971 + 0.2930 * bmiZScore - 0.0315 * hdl + 0.0109 * sbp + 0.6137 * Math.log(triglyceride) + 0.0095 * glucose
      };
  }
}
