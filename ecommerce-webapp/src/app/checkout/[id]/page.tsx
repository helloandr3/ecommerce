'use client'
import { ReactElement, useEffect, useState } from "react";
import styles from "../../styles/checkout.module.css";
import { currencyFormat } from "../../utils/utils";
import { useParams, useRouter } from "next/navigation";
import { getOrder } from "@/app/api/api";

interface IProduct {
  id: number;
  quantity: number;
  thumbnailUrl: string;
  title: string;
  unitPrice: string;
}

interface IOrder {
  amount: string;
  created_at: string;
  id: number;
  products: IProduct[];
  updated_at: string;
  status: string;
}


export default function Checkout(): ReactElement{
    const params = useParams();
    const orderId = params.id;

    const router = useRouter();
    const [order, setOrder] = useState<IOrder>();

    const [error, setError] = useState<Error | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(()=>{
        if(!orderId) return;
            getOrder(orderId.toString()).then((json:IOrder) => {
                setOrder(json);
                setIsLoaded(true);
                setError(null)
            }, (error: Error)=>{
                setError(error);
                setIsLoaded(false);
            });
        
    }, []);

    if (error){
        return <div>Error: ${error!.message}</div>;
    } 
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.hero}><h2>ORDER DONE 🎉</h2></div>
            <div className={styles.rowItem}>
                <p> Your order was finished successfully. </p>
                <table>
                    <thead>
                        <tr><td>Id</td><td>Status</td><td>Total</td></tr>
                    </thead>
                    <tbody>
                       <tr><td>{order!.id}</td><td>{order!.status}</td><td>{currencyFormat(+order!.amount!)}</td></tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                        <tr><td>Products</td><td>Qty</td><td>Unity price</td><td>Total</td></tr>
                    </thead>
                    <tbody>
                        {order?.products.map((x) => (
                        <tr key={x.id}><td>{x.title}</td><td>{x.quantity}</td><td>{currencyFormat(+x.unitPrice)}</td><td>{currencyFormat(+x.unitPrice * x.quantity)}</td></tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr><td></td><td></td><td></td><td>{currencyFormat(+order!.amount!)}</td></tr>
                    </tfoot>
                </table>
                <p>
                    Whether it would a truly ecommerce, probably you would receive something.
                    However, this is only an exercise. So, we won't delivery anything to you.
                </p>
                <p>
                    Anyway, thank you for choosing us!
                </p>
                <button className={styles.btn_back_to_products_list} onClick={(e)=> {e.preventDefault(); router.push('/')}}>See more products</button>
            </div>
        </div>
    );
}