import React from "react";
import style from './Badges.module.scss';

const Table = ({ results }) => {

    let display;

    if (results) {
        display = results.map(x=>{
            let { name, air_date, episode } = x;
            return(
                <div>
                    <table className="justify-content-center col-auto table table-responsive">
                        <tbody>
                            <tr>
                                <td className="fs-5">{episode} - "{name}"</td>
                                <td className="fs-5">{air_date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        });
    } else {
        display = "No Characters Found";
    }

  return <>{display}</>;
};

export default Table;