import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWine } from '../../../api/wineData';
import WineForm from '../../../components/forms/AddWineForm';

export default function EditWine() {
  const [editWine, setEditWine] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the wine data
  useEffect(() => {
    getSingleWine(firebaseKey).then(setEditWine);
  }, [firebaseKey, router]);

  // TODO: pass object to form
  return (<WineForm wineObj={editWine} />);
}
