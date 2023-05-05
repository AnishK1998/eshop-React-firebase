import {useState, useEffect} from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '../firebase/config';
import { toast } from 'react-toastify';


const useFectCollection = (collectionName: string) => {
    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const getCollection = () => {
        setIsLoading(true);
        try {
          const docRef = collection(db, collectionName);
          const orderedProduct = query(docRef, orderBy("createdAt", "desc"));
          onSnapshot(orderedProduct, (snapshot) => {
            const allData: any  = snapshot.docs.map((item) => ({
              id: item.id,
              ...item.data(),
            }));
            setData(allData);
            setIsLoading(false);
          });
         
        } catch (error) {
          toast.error("Error while fetching products");
          setIsLoading(false);
        }
      };

      useEffect(()=>{
        getCollection();
      },[]);

      return {data, isLoading}

}

export default useFectCollection