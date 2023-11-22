import { Uploader } from '@/components/Image/Uploader'
import { UploaderPopUp } from '@/components/Image/UploaderPopUp';
import { useState } from 'react';

export default function AdminPage(props) {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => setOpen(true)}>Open Uploader</button>
      <UploaderPopUp open={open} onClose={() => setOpen(false)} onUpload={(files) => {
        console.log(files);
      }} />

    </div>
  )
}
