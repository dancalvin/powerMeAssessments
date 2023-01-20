import {FC, useState} from "react";
import styles from './inputWithSelect.module.scss';

interface IInputWithSelect {
  inputValue?: number;
  selectValue?: string;
}


interface IProps {
  options: { key: string, value: string }[];
  value: IInputWithSelect;
  onValueChanged: (value: IInputWithSelect) => void;
}

const InputWithSelect: FC<IProps> = (props) => {
  const {options, onValueChanged, value} = props;

  return (
    <div className={styles['container']}>
      <input type="text" className={styles['input']} onChange={ev => {
        if (ev.target.value) {
          onValueChanged({inputValue: parseInt(ev.target.value)})
        }
      }}/>
      <select className={styles['select']}
              value={value.selectValue}
              onChange={ev => onValueChanged({selectValue: ev.target.value})}>
        {
          options.map(o => (
            <option value={o.key} key={o.key}>{o.value}</option>
          ))
        }
      </select>
    </div>
  )
}


export default InputWithSelect;
