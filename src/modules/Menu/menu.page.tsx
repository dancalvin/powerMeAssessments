import {FC} from "react";
import {Link} from "react-router-dom";

interface IProps {

}

const MenuPage: FC<IProps> = (props) => {

  return (
    <div className="fixed h-full w-full">
      <article className="h-full w-full">
        <div className="grid h-full grid-cols-1 grid-rows-[150px_1fr_100px]">
          <div className="flex h-[150px] w-full items-center justify-center bg-[#405f53]">
            <div>
              <p className="font-montserrat text-[30px] text-white">
                My Assessments
              </p>
            </div>
          </div>

          <div className="min-h-[450px]">
            <div className="mx-auto  w-full max-w-[1080px] border-b-[1px] pb-[60px] pt-[2%]">
              <div className="text-center">
                <Link
                  to="/apps/calculator"
                  style={{textAlign: "center"}}
                  className="text-center font-montserrat text-[24px] font-[400]"
                >
                  Vitality Score Assessment &gt;
                </Link>
              </div>
              <div className="mt-5 text-center">
                {/*<p className="text-center font-montserrat text-[24px] font-[400] text-gray">
                  Heart Fit Assessment &gt;
                </p>*/}
                <Link
                  to="/apps/heart-fit"
                  style={{textAlign: "center"}}
                  className="text-center font-montserrat text-[24px] font-[400]"
                >
                  Heart Fit Assessment &gt;
                </Link>
              </div>
            </div>
          </div>

          <div className="h-[100px] w-full bg-[#405f53]"></div>
        </div>
      </article>
    </div>
  );
}

export default MenuPage
