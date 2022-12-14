import { useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./alertModal.module.css";

function AlertModal(props) {
    let params = useParams();
    return (
    <div className={classes.container}>
        <div className={`${classes.alert} `}>
                <p className={classes.text}>Omg {params.name}! This is extra food🙀!</p>
                <button className={classes.ok} onClick={props.closeAlert}>OK</button>
        </div >
    </div>
    );
}

export default AlertModal;
