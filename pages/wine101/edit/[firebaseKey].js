import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWine101 } from '../../../api/wine101Data';
import Wine101Form from '../../../components/forms/AddWine101Form';

export default function EditWine101() {
  const [editWine101, setEditWine101] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the wine data
  useEffect(() => {
    getSingleWine101(firebaseKey).then(setEditWine101);
  }, [firebaseKey, router]);

  // TODO: pass object to form
  return (<Wine101Form obj={editWine101} />);
}
