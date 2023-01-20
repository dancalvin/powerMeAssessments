import {FC, useEffect, useState} from "react";
import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";
import MetCalAge from "./metCalAge.component";
import {metabolicAgeCalc} from "../../../../shared/helpers/metabolicAgeCalc";
import MetabolicScoreGraphResponsive from "./metabolicScoreGraphResponsive";

interface IProps {
  values: IVitalityScoreData;
  onMetabolicAge: (metabolicAge: number) => void;
}

const MetabolicScore: FC<IProps> = (props) => {

  const {values, onMetabolicAge} = props;
  const [metabolicAge, setMetabolicAge] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (values) {
      const metAge = metabolicAgeCalc(values)
      onMetabolicAge(metAge);
      setMetabolicAge(metAge)
    }
  }, [values, onMetabolicAge]);


  return (
    <div
      className="relative flex flex-row flex-nowrap  sm:mt-16 sm:border-[1px] sm:border-l-[15px] sm:border-l-primary ">
      <div
        className={`flex w-full grow flex-col-reverse flex-nowrap justify-between py-10 px-6 sm:pl-6 md:flex-row md:pl-20`}
      >
        <div className="flex flex-row justify-between md:flex-col md:gap-10">
          <div className=" md:border-0">
            <h3 className="font-montserrat text-base leading-[39px] text-primary md:text-3xl">
              Your Metabolic Age{" "}
            </h3>

            <p
              className="md:text-normal font-montserrat text-[40px] font-bold leading-[110%] text-primary md:text-[80px] md:font-normal md:leading-[98px] ">
              {metabolicAge}
            </p>
          </div>

          <div>
            <h3 className="font-montserrat text-base leading-[39px] text-fourth md:text-3xl">
              Your Calendar Age{" "}
            </h3>
            <p
              className="md:text-normal font-montserrat text-[40px] font-bold leading-[110%] text-fourth md:text-[80px] md:font-normal md:leading-[98px]">
              {values.age}
            </p>
          </div>
        </div>
        <div className="doterraColumn flex items-center">
          <div className="relative mx-auto hidden h-[200px] min-w-[200px] max-w-[300px] grow max-[580px]:block">
            <MetabolicScoreGraphResponsive metabolicAge={metabolicAge} age={values.age}/>
            <div className="absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center">
              <p className="text-xl font-bold">
                <span className="text-primary">{metabolicAge}</span>/
                <span className="text-third">{values.age}</span>
              </p>
            </div>
          </div>

          <div className="mx-auto block max-[580px]:hidden">
            <MetCalAge values={values} metabolicAge={metabolicAge}/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default MetabolicScore
