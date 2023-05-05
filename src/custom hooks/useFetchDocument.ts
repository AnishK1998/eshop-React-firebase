import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { toast } from "react-toastify";

const useFetchDocument = (
  collectionName: any,
  documentId: string | undefined
) => {
  const [document, setDocument] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getDocument = async () => {
    setIsLoading(true);
    if (documentId) {
      const documentRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        let newObject = {
          id: documentId,
          ...docSnap.data(),
        };
        setDocument(newObject);
        setIsLoading(false);
      } else {
        toast.error("Something went wrong");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getDocument();
  }, []);

  return { document, isLoading };
};

export default useFetchDocument;
