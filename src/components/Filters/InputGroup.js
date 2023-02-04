import React from "react";
import style from '../Badges/Badges.module.scss';

const InputGroup = ({ total, name, setID }) => {
    return (
        <div class="input-group mb-3">
            <select onChange={e => setID(e.target.value)} className={`${style.img} form-select`} id={name}>

                {[...Array(total).keys()].map(x => {
                    return <option value={x + 1}>{name} {x + 1}</option>;
                })}
            </select>
        </div>
  );
};

export default InputGroup;