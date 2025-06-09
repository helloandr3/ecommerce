import Link from "next/link";
import styles from "../styles/itemList.module.css";
import React, {ReactElement, useEffect, useState} from "react";
import Search from "./search";
import { getProducts} from "../api/api";
import IInstallments from "../Interfaces/IInstallments"
import IProduct from "../Interfaces/IProduct";
import IProductSearchResponse from "../Interfaces/IProductSearchResponse";
import {currencyFormat } from "../utils/utils";
import Pagination from "./pagination";



function Installment(props: IInstallments): ReactElement{

     return (
        <p>{props.number}x {currencyFormat(props.total)} { props.fee ? 'with interest' : 'interest-free' } </p>
    );
}


function Item(props: IProduct): ReactElement{
    
    const defaultProductImage: string = "https://placehold.co/150";
  
    return (
         
            <div className={styles.rowItem}>            
                  <div className={styles.imageContainer}>
                    <img src={defaultProductImage} alt="" />
                  </div>
                  <div className={styles.itemText}>
                    <Link href={`/product/${props.id}`} > 
                        <h3>{props.title}</h3>
                    </Link>
                      <h4>{currencyFormat(props.amount)}</h4>
                      <Installment {...props.installments}></Installment>
                      
                  </div>
              </div>
        );     
}


export default function ProductsList(): ReactElement{
    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [productSearchResult, setProductSearchResult] = useState<IProductSearchResponse | null>(null);

    // Pagination data
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize: number = 4;
  
    function clientSideQueryProduct(query: string, currentPage: number, pageSize: number): void{
        
        getProducts({query: query, currentPage: currentPage, pageSize: pageSize}).then((json: IProductSearchResponse) => {

            // async function
            setIsLoaded(true);
            setProductSearchResult(json);

        },
        (error: Error) =>{
            // console.log('to no erro')
            
            setIsLoaded(true);
            setError(error);
        })
    }

    function handleOnSearch(query: string): void{
        clientSideQueryProduct(query, currentPage, pageSize);    
    }

    useEffect(() => {
        clientSideQueryProduct("", currentPage, pageSize);
    }, [currentPage, pageSize]);

    if (error){
        return <div>Error: ${error!.message}</div>;
    } 
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const list: ReactElement[] = productSearchResult!.results.map((x: IProduct) => (
        <Item {...x} key={x.id} />
    ));
    
    
    const handlePageChange = (page: number, direction: number): void => {
        // Pagination function
        // ensure pagination between 1 and totalPages
        setCurrentPage(Math.max(1, Math.min(page + direction,  productSearchResult!.totalPages)));
    };
    
    
    
    return (
        <div className={styles.container}>
            <Search onSearch={handleOnSearch} />
            {list}
            <Pagination              
                productsCount={productSearchResult ? productSearchResult!.totalItems : 0}
                page={productSearchResult ? productSearchResult!.currentPage : 0}
                maxPages={productSearchResult ? productSearchResult!.totalPages : 0}
                onChange={handlePageChange}
            ></Pagination>
        </div>
    ); 
}