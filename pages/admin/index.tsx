
import { useState } from 'react';

export default function AdminPage(props) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => setOpen(true)}>Open Uploader</button>
     

    </div>
  )
}
