import {FC} from "react";

interface IProps {
  title: string;
  selected?: boolean;
  id: 'PROGRESS' | 'GOALS';
  tabSelected: (id: 'PROGRESS' | 'GOALS') => void;
}

const HistoryTab: FC<IProps> = (props) => {

  const {title, selected, id, tabSelected} = props;

  return (
    <div
      className={`flex w-1/2 cursor-pointer flex-row flex-nowrap justify-center py-4 sm:border-b-[1px] ${
        selected && "border-b-[6px] border-b-primary sm:bg-primary"
      }`}
      onClick={() => tabSelected(id)}
    >
      <p
        className={`text-center font-montserrat text-xs leading-5 sm:text-xl ${
          selected ? "font-bold sm:text-secondary" : "text-black"
        }`}
      >{title}</p>
    </div>
  )
}

export default HistoryTab;
