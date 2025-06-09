import styles from "../styles/pagination.module.css";
import React, {ReactElement} from "react";

interface IPros{
    productsCount: number;
    page: number;
    maxPages: number;
    onChange: (currentPage: number, direction: number) => void
}

export default function Pagination(props:IPros): ReactElement{
    return (
        <div className={styles.container}>
            <div>
                <a href="#" onClick={(e) => {e.preventDefault(); props.onChange(props.page, -1)}}>&lt; Previous</a>
            </div>
            <div>
                {props.page} of {props.maxPages} 
            </div>
            <div>
                <a href="#" onClick={(e) => {e.preventDefault(); props.onChange(props.page, +1)}}>Next &gt;</a>
            </div>
        </div>
    );
}